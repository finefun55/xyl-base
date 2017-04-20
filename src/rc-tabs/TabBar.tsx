import React from 'react';
import {observer} from "mobx-react";
import classnames from 'classnames';
import {ITabBarMixinPropTypes} from "./PropsType";

const tabBarExtraContentStyle = {
    float: 'right',
};

@observer
export default class TabBar extends React.Component<ITabBarMixinPropTypes, any> {
    static defaultProps = {
        styles: {}
    };

    onTabClick(key) {
        this.props.onTabClick(key);
    }

    getTabs() {
        const props = this.props;
        const children = props.panels;
        const activeKey = props.activeKey;
        const rst = [];
        const prefixCls = props.prefixCls;

        React.Children.forEach(children, (child: any) => {
            if (!child) {
                return;
            }
            const key = child.key;
            let cls = activeKey === key ? `${prefixCls}-tab-active` : '';
            cls += ` ${prefixCls}-tab`;
            let events = {};
            if (child.props.disabled) {
                cls += ` ${prefixCls}-tab-disabled`;
            } else {
                events = {
                    onClick: this.onTabClick.bind(this, key),
                };
            }
            const ref = {ref: undefined};
            if (activeKey === key) {
                ref.ref = 'activeTab';
            }
            rst.push(<div
                role="tab"
                aria-disabled={child.props.disabled ? 'true' : 'false'}
                aria-selected={activeKey === key ? 'true' : 'false'}
                {...events}
                className={cls}
                key={key}
                {...ref}
            >
                {child.props.tab}
            </div>);
        });

        return rst;
    }

    getRootNode(contents) {
        const {prefixCls, onKeyDown, className, extraContent, style} = this.props;
        const cls = classnames({
            [`${prefixCls}-bar`]: 1,
            [`${className}`]: !!className,
        });
        return (
            <div
                role="tablist"
                className={cls}
                tabIndex={0}
                ref="root"
                onKeyDown={onKeyDown}
                style={style}
            >
                {extraContent ?
                    (<div
                        style={tabBarExtraContentStyle}
                        key="extra"
                    >
                        {extraContent}
                    </div>) : null}
                {contents}
            </div>);
    }

    render() {
        const tabs = this.getTabs();
        return this.getRootNode(tabs);
    }
}