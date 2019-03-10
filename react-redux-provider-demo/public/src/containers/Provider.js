console.log('测试代码的实时变化')
// 根据Provider 组件原理自己实现的一个Provider组件
import { Component, PropTypes, Children } from 'react';
import storeShape from '../../../storeShape';

let didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
    if (didWarnAboutReceivingStore) {
        return
    }
    didWarnAboutReceivingStore = true

}

export default class Provider extends Component {
    getChildContext() {
        return { store: this.store }
    }

    constructor(props, context) {
        super(props, context);
        console.log(props, 'Provider props: storeState')
        console.log(context, '====context')
        this.store = props.store
        console.log('constructor: this.store: ', this.store)
    }

    render() {
        return Children.only(this.props.children)
    }
}

if (process.env.NODE_ENV !== 'production') {
    console.log('===当前环境为"非生产环境"')
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
        const { store } = this;
        const { store: nextStore } = nextProps;

        if (store !== nextStore) {
            warnAboutReceivingStore()
        }
    }
}

Provider.propTypes = {
    store: storeShape.isRequired,
    children: PropTypes.element.isRequired
};
Provider.childContextTypes = {
    store: storeShape.isRequired
};
