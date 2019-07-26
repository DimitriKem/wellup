
const {types} = require('./../Actions/ApplicationActions');
const Immutable = require('immutable');

const initialState = {
    data: null,
    prevPage: null,
    nextPage: null,
    currentPage: null,
    messengersList: null,
    showHints: null,
    expertList: null,
};

function application(state = initialState, action = {}) {
    switch (action.type) {
        case types.SET_CURRENT:
        {
            const index = action.id;
            const newState = {...state};
            newState.showHints = state.data.get('data').get('showHints');
            newState.currentPage = state.data.get('data').get('routineList').find(val => val.get('id') == index);
            const id = state.data.get('data').get('routineList').indexOf(newState.currentPage);
            const len = state.data.get('data').get('routineList').size;
            newState.nextPage = state.data.get('data').get('routineList').get(((id + 1) < len) ? (id + 1) : 0);
            newState.prevPage = state.data.get('data').get('routineList').get(((id - 1) >= 0) ? (id - 1) : (len - 1));
            newState.expertList = state.data.get('data').get('expertList');
            return newState;
        }

        case types.UPDATE_DATA:
        {
            let newState = {};
            if (state.data) {
                newState.data = state.data.update(() => Immutable.fromJS(action.data));
            } else {
                newState.data = Immutable.fromJS(action.data);
            }
            if (state.currentPage) {
                newState.currentPage = newState.data.get('data').get('routineList').find(val => (val.get('id') === state.currentPage.get('id')));
            }
            if (state.nextPage) {
                newState.nextPage = newState.data.get('data').get('routineList').find(val => (val.get('id') === state.nextPage.get('id')));
            }
            if (state.prevPage) {
                newState.prevPage = newState.data.get('data').get('routineList').find(val => (val.get('id') === state.prevPage.get('id')));
            }
            newState.messengersList = newState.data.get('data').get('messengerList');
            newState.showHints = newState.data.get('data').get('showHints');
            newState.expertList = newState.data.get('data').get('expertList');
            return newState;
        }

        case types.APPLY_STATE:
        {
            let newState = state;
            if (state.currentPage) {
                newState.currentPage = action.currentPage;
            }
            newState.messengersList = action.messengersList;
            newState.showHints = action.showHints;
            newState.expertList = action.expertList;
            newState.currentPage.set('hasChanged', true);
            return newState;
        }

        default: {
            return state;
        }
    }
}

module.exports = {
    default: application,
    name: 'application'
};