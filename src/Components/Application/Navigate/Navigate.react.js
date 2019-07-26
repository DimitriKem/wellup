

const styles = require('./Navigate.less');

const React = require('react');
const shouldComponentUpdate = require('react-pure-render/function');
const logger = require('js-logger');
const {Link} = require('react-router');

const RightIcon = require('./../../Icons/RightArrowIcon.react.js');

class Navigate extends React.Component {
    static displayName = 'Navigate';
    shouldComponentUpdate = shouldComponentUpdate;
    logger = null;

    constructor(props) {
        super(props);

        this.styles = styles;
        this.logger = logger.get(Navigate.displayName);
    }

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        page: React.PropTypes.object.isRequired,
        nextPage: React.PropTypes.object.isRequired,
        prevPage: React.PropTypes.object.isRequired
    };

    componentDidMount() {
        this.logger.debug('did mount');
    }
    render() {
        const {page, nextPage, prevPage} = this.props;
        return (
            <div className={this.styles.navigate}>
                <h1 className={this.styles.header}>
                    Режим дня&nbsp;
                </h1>

                <div className={this.styles.regime}>
                    <div className={this.styles.prev}>
                        <Link className={this.styles.arrowLink} title="Назад" to={`/${prevPage.get('id')}`}>
                            <RightIcon className={this.styles.leftIcon} fillClassName={this.styles.svgFillElement} />
                        </Link>
                    </div>

                    <div className={this.styles.regimeName}>
                        {page.get('isToday') ? 'Сегодня' : page.get('name')}
                    </div>

                    <div className={this.styles.next}>
                        <Link className={this.styles.arrowLink} title="Вперед" to={`/${nextPage.get('id')}`}>
                            <RightIcon className={this.styles.rightIcon} fillClassName={this.styles.svgFillElement} />
                        </Link>
                    </div>
                </div>

                
            </div>
        )
    }
}

module.exports = Navigate;

/*
<div className={styles.change}>
    <a href="/services/test/?test_id=routine_creater">
        <PenIcon className={styles.penIcon} />
        <span>Изменить</span>
    </a>
</div>
<div className={styles.wellup}>
    <a href="" onClick={this.resetToWellUp}>
        Вернуть wellup-режим
    </a>
</div>
*/