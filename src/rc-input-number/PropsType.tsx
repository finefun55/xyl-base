export interface InputNumberPropTypes {
    focusOnUpDown?: boolean;
    prefixCls?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    max?: number;
    maxLength?: number;
    min?: number;
    step?: number | string;
    upHandler?: any;
    downHandler?: any;
    useTouch?: boolean;
    formatter?: any;
    parser?: any;
    onMouseEnter?: any;
    onMouseLeavevent?: any;
    onFocus?: any;
    onMouseOver?: any;
    onBlur?: any;
    onClick?: any;
    onChange?: any;
    onMouseOut?: any;
    precision: number;
    onKeyUp?: any;
    onKeyDown?: any;
    onMouseLeave?: any;
    className?: string;
    type?: string;
    placeholder?: string;
    autoFocus?: boolean;
    name?: string;
    style?;
}