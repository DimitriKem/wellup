
const styles = require('./List.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const Sortable = require('sortablejs');

const ApplicationActions = require('./../../../Actions/ApplicationActions').actions;
const isTouch = require('./../../../Utils/isTouch');

const Item = require('./../Item/Item.react');

class List extends React.Component {
    static displayName = 'List';
    static TIMEOUT_TOUCH = 100; // Таймаут, когда можно начать перемещать задачи (работает только на мобильных устройствах)
    shouldComponentUpdate = shouldComponentUpdate;
    sortable = null;
    scrollFix = false; // true - исправление бага совместного использования Sortable со Swipe
    sortableStyles = styles;
    interval = null;

    static propTypes = {
        activeItem: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        current: React.PropTypes.bool,
        page: React.PropTypes.any,
        list: React.PropTypes.any.isRequired,
        showHints: React.PropTypes.bool.isRequired,
        dispatch: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            links: [],
            hour: (new Date()).getHours()
        }
    }

    componentDidMount () {
        this.initSortable();
    }

    /**
     * @method isPassed
     * @param {object} item - объект задачи
     * Проверка, устарела ли задача
     * */
    isPassed = (item) => {
        const {hour} = this.state;
        const endHour = item.get('end').split(':')[0];
        return ((+endHour - 1) < +hour);
    };

    initSortable () {
        // Инициализация Sortable
        this.sortable = Sortable.create(this._container, {
            sort: true,
            animation: 150,
            delay: isTouch() ? List.TIMEOUT_TOUCH : 0,
            ghostClass: this.sortableStyles.ghost ? this.sortableStyles.ghost : 'sortable-ghost',
            chosenClass: this.sortableStyles.ghost ? this.sortableStyles.chosen : 'sortable-chosen',
            dragClass: this.sortableStyles.drag ? this.sortableStyles.drag : 'sortable-drag',
            scrollSpeed: 20,
            scrollFix: this.scrollFix,
            onUpdate: this.updateList
        });
    }

    destroySortable () {
        // Освобождение памяти
        if (this.sortable) {
            this.sortable.destroy();
        }
        this.sortable = null;
    }

    /**
     * @method updateList
     * @param {Number} evt.oldIndex
     * @param {Number} evt.newIndex
     * */
    updateList = (evt) => {
        const {page, dispatch, list} = this.props;
        dispatch(ApplicationActions.changePosition(page.get('id'), list.toJS()[evt.oldIndex].id, evt.newIndex));
    };

    componentWillUnmount() {
        this.destroySortable();
        clearInterval(this.interval);
    }

    componentWillMount () {
        this.renderItemsList();
        // Обновляется время
        this.interval = setInterval(this.updateTime, 500);
    }
    
    componentWillReceiveProps(nextProps) {
        this.renderItemsList(nextProps);
    }

    updateTime = () => {
        const hour = (new Date()).getHours();
        if (hour !== this.state.hour) {
            this.setState({hour});
            this.renderItemsList(this.props, true);
        }
    };

    /**
     * @method isUpdateList
     * Нужно ли обновлять State
     * */
    isUpdateList(props) {
        const {activeItem, list, page, showHints} = props;

        return (
            this.props !== props
            && activeItem === this.props.activeItem
            && list === this.props.list
            && page === this.props.page
            && showHints === this.props.showHints
        );
    }

    /**
     * @method renderItemsList
     * Преобразование массива задач в массив компонентов
     * */
    renderItemsList (props = this.props, forceUpdate = false) {
        const {dispatch, activeItem, list, page, showHints} = props;
        if (!forceUpdate && this.isUpdateList(props)) {
            return;
        }
        this.setState({
            list: list.map(item =>{
                return <Item key={item.get('id')}
                      dispatch={dispatch}
                      isPassed={this.isPassed(item)}
                      active={activeItem === item.get('id')}
                      item={item}
                      pageId={page.get('id')}
                      showHints={showHints} />
            })
        })
    }

    render() {
        const {list} = this.state;
        return (
            <div ref={r => this._container = r} className={styles.list}>
                {list}
            </div>
        )
    }
}

module.exports = List;