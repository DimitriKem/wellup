
const axios = require('axios');
const Immutable = require('immutable');
window.axios = axios;
const MockAdapter = require('axios-mock-adapter');

const get = '/api/ws/get.php';
const post = '/api/ws/payload.php';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

mock.onGet(get).reply(200);

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

mock.onPost(post).reply(function(config) {
    config.data = JSON.parse(config.data);
    switch (config.data.methodName) {
        /**
         * Получение данных для построения страницы
         */
        case 'service.routine:user.get': {
            return [200, {
                result: true, // true|false
                message: [],
                data: immutableWellup.toJSON()
            }];
        }

        /**
         * Включить/выключить подсказки
         */
        case 'service.routine:user.set.showHints': {
            let wellup = immutableWellup.toJS();
            wellup.showHints = config.data.methodParams.isShow;
            immutableWellup = Immutable.fromJS(wellup);
            return [200, {
                result: true, // true|false
                message: [],
                data: {}
            }];
        }

        /**
         * Сброить режим текущего дня на wellup (default)
         */
        case 'service.routine:user.set.to.default': {
            let wellup = immutableWellup.toJS();
            wellup.routineList.find(d => d.id == config.data.methodParams.routineID).blockList = wellup.wellupRoutine.blockList;
            immutableWellup = Immutable.fromJS(wellup);
            return [200, {
                result: true, // true|false
                message: [],
                data: {}
            }];
        }

        /**
         * Установить мессенджер для блока режима дня
         */
        case 'service.routine:user.set.block.messenger': {
            let wellup = immutableWellup.toJS();
            let block = wellup.routineList.find(d => d.id == config.data.methodParams.routineID).blockList.find(d => d.id == config.data.methodParams.blockID);
            block.messengerList.forEach(m => m.installed = false);
            config.data.methodParams.messengerList.forEach(id => {
                block.messengerList.find(m => m.id == id).installed = true;
            });
            immutableWellup = Immutable.fromJS(wellup);
            return [200, {
                result: true, // true|false
                message: [],
                data: {}
            }];
        }

        /**
         * Установить повтор блока
         */
        case 'service.routine:user.set.block.repeat': {
            let wellup = immutableWellup.toJS();
            let block = wellup.routineList.find(d => d.id == config.data.methodParams.routineID).blockList.find(d => d.id == config.data.methodParams.blockID);
            block.repeatList.forEach(m => m.installed = false);
            config.data.methodParams.repeatList.forEach(id => {
                block.repeatList.find(m => m.id == id).installed = true;
            });
            immutableWellup = Immutable.fromJS(wellup);
            return [200, {
                result: true, // true|false
                message: [],
                data: {}
            }];
        }

        /**
         * Удалить блок
         */
        case 'service.routine:user.set.block.delete': {
            let wellup = immutableWellup.toJS();
            const {blockList} = wellup.routineList.find(d => d.id == config.data.methodParams.routineID);
            let index = undefined;
            blockList.find((b, i) => {
                if (b.id == config.data.methodParams.blockID) {
                    index = i;
                    return true;
                }
            });
            if (index !== undefined) {
                restoreBlock.block = blockList.splice(+index, 1)[0];
                restoreBlock.position = index;
            }
            immutableWellup = Immutable.fromJS(wellup);
            return [200, {
                result: true, // true|false
                message: [],
                data: {}
            }];
        }

        /**
         * Восстановить блок
         */
        case 'service.routine:user.set.block.restore': {
            let wellup = immutableWellup.toJS();
            const {blockList} = wellup.routineList.find(d => d.id == config.data.methodParams.routineID);
            blockList.push(restoreBlock.block);
            blockList.move(blockList.length - 1, restoreBlock.position);
            immutableWellup = Immutable.fromJS(wellup);
            return [200, {
                result: true, // true|false
                message: [],
                data: {}
            }];
        }

        /**
         * Удалить настройку оповещения
         */
        case 'service.routine:user.set.messenger.delete': {
            let wellup = immutableWellup.toJS();
            wellup.messengerList.find(b => b.id == config.data.methodParams.messengerId).installed = false;
            setMessengers(wellup);
            immutableWellup = Immutable.fromJS(wellup);
            return [200, {
                result: true, // true|false
                message: [],
                data: {}
            }];
        }

        /**
         * Добавить настройку оповещения
         */
        case 'service.routine:user.set.messenger.add': {
            let wellup = immutableWellup.toJS();
            wellup.messengerList.find(b => b.id == config.data.methodParams.messengerId).installed = true;
            setMessengers(wellup);
            immutableWellup = Immutable.fromJS(wellup);
            return [200, {
                result: true, // true|false
                message: [],
                data: {}
            }];
        }

        /**
         * Обновление положения блока в списке
         */
        case 'service.routine:user.set.block.position.update': {
            let wellup = immutableWellup.toJS();
            const blockList = wellup.routineList.find(d => d.id == config.data.methodParams.routineID).blockList;
            let index = undefined;
            blockList.find((b, i) => {
                if (b.id == config.data.methodParams.blockID) {
                    index = i;
                    return true;
                }
            });
            if (index) {
                blockList.move(index, config.data.methodParams.position);
            }
            immutableWellup = Immutable.fromJS(wellup);
            return [200, {
                result: true, // true|false
                message: [],
                data: {}
            }];
        }
    }
});

const messengersGlobal = [
    {
        id: '' + 0,
        name: 'Телефон', // Телефон
        nameAdditional: 'телефону', // телефону
        code: '0',
        description: '+7 915 233 33 33', // может быть html
        installed: true
    },
    {
        id: '' + 1,
        name: 'Facebook', // Телефон
        nameAdditional: 'фейсбуку', // телефону
        code: '1',
        description: '<a style="white-space: normal">Иван Красноперкин</a>', // может быть html
        installed: true
    },
    {
        id: '' + 2,
        name: 'Twitter', // Телефон
        nameAdditional: 'твиттеру', // телефону
        code: '2',
        description: '<a style="white-space: normal">#Ivan</a>', // может быть html
        installed: false
    },
    {
        id: '' + 3,
        name: 'Viber', // Телефон
        nameAdditional: 'вайберу', // телефону
        code: '3',
        description: '<a style="white-space: normal">+7 915 233 33 33</a>', // может быть html
        installed: false
    },
    {
        code: "telegram",
        description: "<a href='https://telegram.me/WellupRRDBot?start=1111744baegdf' target='_blank'>Активировать</a>",
        hashstring: "6866744badgfe",
        id: "4",
        installed: false,
        name: "Telegram",
        nameAdditional: "Telegram",
        timeBefore: null
    }
];

const messengersLocal = [
    {
        id: '' + 0,
        name: 'Телефон', // Телефон
        nameAdditional: 'телефону', // телефону
        code: '0',
        description: '+7 915 233 33 33', // может быть html
        installed: true
    },
    {
        id: '' + 1,
        name: 'Facebook', // Телефон
        nameAdditional: 'фейсбуку', // телефону
        code: '1',
        description: '<a style="white-space: normal">Иван Красноперкин</a>', // может быть html
        installed: false
    }
];

const adviceList = [
    {
        id: '' + 0,
        name: 'Просыпаетесь раньше времени?',
        code: '0',
        description: '<p>Ваш утренний сон будет крепче, если ежедневно выпивать дневную норму воды</p><h3>Заголовок</h3><p>Текст подсказки</p>',
    },
    {
        id: '' + 1,
        name: 'Просыпаетесь раньше времени 2?',
        code: '1',
        description: '<p>Ваш утренний сон будет крепче, если ежедневно выпивать дневную норму воды</p><h3>Заголовок</h3><p>Текст подсказки</p>',
    },
    {
        id: '' + 2,
        name: 'Просыпаетесь раньше времени 3?',
        code: '2',
        description: '<p>Ваш утренний сон будет крепче, если ежедневно выпивать дневную норму воды</p><h3>Заголовок</h3><p>Текст подсказки</p>',
    },
    {
        id: '' + 3,
        name: 'Просыпаетесь раньше времени 4?',
        code: '3',
        description: '<p>Ваш утренний сон будет крепче, если ежедневно выпивать дневную норму воды</p><h3>Заголовок</h3><p>Текст подсказки</p>',
    },
    {
        id: '' + 4,
        name: 'Просыпаетесь раньше времени 4?',
        code: '3',
        description: '<p>Ваш утренний сон будет крепче, если ежедневно выпивать дневную норму воды</p><h3>Заголовок</h3><p>Текст подсказки</p><p>Ваш утренний сон будет крепче, если ежедневно выпивать дневную норму воды</p><h3>Заголовок</h3><p>Текст подсказки</p>',
    }
];

const repeatList = [
    {
        id: '' + 0,
        name: 'Понедельник',
        code: '0',
        installed: true,
    },
    {
        id: '' + 1,
        name: 'Вторник',
        code: '1',
        installed: false,
    },
    {
        id: '' + 2,
        name: 'Среда',
        code: '2',
        installed: true,
    },
    {
        id: '' + 3,
        name: 'Четверг',
        code: '3',
        installed: true,
    },
    {
        id: '' + 4,
        name: 'Пятница',
        code: '4',
        installed: true,
    },
    {
        id: '' + 5,
        name: 'Суббота',
        code: '5',
        installed: false,
    },
    {
        id: '' + 6,
        name: 'Воскресение',
        code: '6',
        installed: true,
    }
];

function getWellupRoutine() {
    let i = 0;
    return {
        blockList: [{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '07:00',
            end: '08:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#00B877',
            adviceList: [],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '08:00',
            end: '09:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '09:00',
            end: '10:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FFD200',
            adviceList: [],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '10:00',
            end: '11:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FFD200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '11:00',
            end: '12:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#00B877',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '12:00',
            end: '13:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '13:00',
            end: '14:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '14:00',
            end: '15:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '15:00',
            end: '16:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '16:00',
            end: '17:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '17:00',
            end: '18:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '18:00',
            end: '19:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '19:00',
            end: '20:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '20:00',
            end: '21:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '21:00',
            end: '22:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        },{
            id: '' + i,
            code: i++,
            name: 'Что-то поделать',
            start: '22:00',
            end: '23:00',
            isWrong: Math.round(Math.random()),
            wrongDescription: 'wrongDescription',
            category: 'int',
            categoryColor: '#FF3200',
            adviceList: [...adviceList],
            messengerList: [...messengersLocal],
            repeatList: [...repeatList]
        }],
    };
}
function getDays(name, today) {
    let i = 0;
    return [{
        id: '' + i,
        name: 'Понедельник',
        code: i++,
        date: 'string',
        isToday: false,
        hasChanged: false,
        blockList: [...getWellupRoutine().blockList]
    },{
        id: '' + i,
        name: 'Вторник',
        code: i++,
        date: 'string',
        isToday: true,
        hasChanged: false,
        blockList: [...getWellupRoutine().blockList]
    },{
        id: '' + i,
        name: 'Среда',
        code: i++,
        date: 'string',
        isToday: false,
        hasChanged: true,
        blockList: [...getWellupRoutine().blockList]
    },{
        id: '' + i,
        name: 'Четверг',
        code: i++,
        date: 'string',
        isToday: false,
        hasChanged: true,
        blockList: [...getWellupRoutine().blockList]
    },{
        id: '' + i,
        name: 'Пятница',
        code: i++,
        date: 'string',
        isToday: false,
        hasChanged: true,
        blockList: [...getWellupRoutine().blockList]
    },{
        id: '' + i,
        name: 'Суббота',
        code: i++,
        date: 'string',
        isToday: false,
        hasChanged: true,
        blockList: [...getWellupRoutine().blockList]
    },{
        id: '' + i,
        name: 'Воскресение',
        code: i++,
        date: 'string',
        isToday: false,
        hasChanged: true,
        blockList: [...getWellupRoutine().blockList]
    }];
}

// Если пользователь авторизован
var immutableWellup = Immutable.fromJS({
    user: {
        'ID': 'int',
        'ACTIVE': 'string',
        'NAME': 'string',
        'LAST_NAME': 'string',
        'EMAIL': 'string',
        'PERSONAL_GENDER': 'string',
        'PERSONAL_BIRTHDATE': 'string',
    },
    showHints: Math.round(Math.random()),
    messengerList: [...messengersGlobal],
    expertList: [
        {
            name: "Дарт Вейдер",
            description: "Проводник силы",
            "img": "./static/img/photo1.jpg",
            "category": 34,
            "color": "expertYellow"
        }
    ],
    wellupRoutine: getWellupRoutine(),
    routineList: getDays()
});

var restoreBlock = {
    block: null,
    position: null
};

function setMessengers(wellup) {
    const messengers = wellup.messengerList;
    function setForRoutine(routine) {
        routine.blockList.forEach(function setForBlock (block) {
            const newList = [...block.messengerList];
            block.messengerList.forEach(function setForMessengerList (messenger, index) {
                if (!messengers.find(m => m.id === messenger.id).installed) {
                    newList.splice(+index, 1);
                }
            });
            messengers.forEach(m => {
                if (m.installed && !block.messengerList.find(d => d.id === m.id)) {
                    newList.push({...m, installed: false});
                }
            });
            block.messengerList = newList;
        })
    }

    wellup.routineList.forEach(setForRoutine);
    setForRoutine(wellup.wellupRoutine);
}
