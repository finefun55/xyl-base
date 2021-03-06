import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {findDOMNode} from "inferno-compat";
import {observer} from 'inferno-mobx';
import Align from '../rc-align';
import Animate from '../rc-animate';
import PopupInner from './PopupInner';
import LazyRenderBox from './LazyRenderBox';
import {IPopup} from "./PropsType";


@observer
export default class Popup extends Component<IPopup, any> {
    rootNode;

    componentDidMount() {
        this.rootNode = this.getPopupDomNode();
    }

    currentAlignClassName;

    popup;
    popupBind = (popup) => {
        this.popup = popup;
    }

    onAlign = (popupDomNode, align) => {
        const props = this.props;
        const alignClassName = props.getClassNameFromAlign(props.align);
        const currentAlignClassName = props.getClassNameFromAlign(align);
        if (alignClassName !== currentAlignClassName) {
            this.currentAlignClassName = currentAlignClassName;
            popupDomNode.className = this.getClassName(currentAlignClassName);
        }
        props.onAlign(popupDomNode, align);
    }

    getPopupDomNode = () => {
        return findDOMNode(this.popup);
    }

    getTarget = () => {
        return this.props.getRootDomNode();
    }

    getMaskTransitionName = () => {
        const props = this.props;
        let transitionName = props.maskTransitionName;
        const animation = props.maskAnimation;
        if (!transitionName && animation) {
            transitionName = `${props.prefixCls}-${animation}`;
        }
        return transitionName;
    }

    getTransitionName = () => {
        const props = this.props;
        let transitionName = props.transitionName;
        if (!transitionName && props.animation) {
            transitionName = `${props.prefixCls}-${props.animation}`;
        }
        return transitionName;
    }

    getClassName = (currentAlignClassName) => {
        return `${this.props.prefixCls} ${this.props.className} ${currentAlignClassName}`;
    }

    getPopupElement = () => {
        const props = this.props;
        const {align, style, visible, prefixCls, destroyPopupOnHide} = props;
        const className = this.getClassName(this.currentAlignClassName ||
            props.getClassNameFromAlign(align));
        const hiddenClassName = `${prefixCls}-hidden`;
        if (!visible) {
            this.currentAlignClassName = null;
        }
        const newStyle = {
            ...style,
            ...this.getZIndexStyle(),
        };
        const popupInnerProps = {
            className,
            prefixCls,
            ref: this.popupBind,
            onMouseEnter: props.onMouseEnter,
            onMouseLeave: props.onMouseLeave,
            style: newStyle,
        };
        if (destroyPopupOnHide) {
            return (<Animate
                component=""
                exclusive
                transitionAppear
                transitionName={this.getTransitionName()}
            >
                {visible ? (<Align
                    target={this.getTarget}
                    key="popup"
                    ref={this.saveAlign}
                    monitorWindowResize
                    align={align}
                    onAlign={this.onAlign}
                >
                    <PopupInner
                        visible
                        {...popupInnerProps}
                    >
                        {props.children}
                    </PopupInner>
                </Align>) : null}
            </Animate>);
        }
        return (<Animate
            component=""
            exclusive
            transitionAppear
            transitionName={this.getTransitionName()}
            showProp="xVisible"
        >
            <Align
                target={this.getTarget}
                key="popup"
                ref={this.saveAlign}
                monitorWindowResize
                xVisible={visible}
                childrenProps={{visible: 'xVisible'}}
                disabled={!visible}
                align={align}
                onAlign={this.onAlign}
            >
                <PopupInner
                    hiddenClassName={hiddenClassName}
                    {...popupInnerProps}
                >
                    {props.children}
                </PopupInner>
            </Align>
        </Animate>);
    }

    getZIndexStyle = (): any => {
        const style: any = {};
        const props = this.props;
        if (props.zIndex !== undefined) {
            style.zIndex = props.zIndex;
        }
        return style;
    }

    getMaskElement = () => {
        const props = this.props;
        let maskElement;
        if (props.mask) {
            const maskTransition = this.getMaskTransitionName();
            maskElement = (
                <LazyRenderBox
                    style={this.getZIndexStyle()}
                    key="mask"
                    className={`${props.prefixCls}-mask`}
                    hiddenClassName={`${props.prefixCls}-mask-hidden`}
                    visible={props.visible}
                />
            );
            if (maskTransition) {
                maskElement = (
                    <Animate
                        key="mask"
                        showProp="visible"
                        transitionAppear
                        component=""
                        transitionName={maskTransition}
                    >
                        {maskElement}
                    </Animate>
                );
            }
        }
        return maskElement;
    }

    alignInstance;

    saveAlign = (align) => {
        this.alignInstance = align;
    }

    render() {
        return (<div>
            {this.getMaskElement()}
            {this.getPopupElement()}
        </div>);
    }
}
