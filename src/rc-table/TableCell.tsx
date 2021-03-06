import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {isValidElement} from 'inferno-compat';
import {observer} from 'inferno-mobx';
import get from 'lodash.get';
import {ITableCellPropTypes} from "./PropsType";

@observer
export default class TableCell extends Component<ITableCellPropTypes, any> {

    isInvalidRenderCellText = (text) => {
        return text && !isValidElement(text) &&
            Object.prototype.toString.call(text) === '[object Object]';
    }

    handleClick = (e) => {
        const {record, column: {onCellClick}} = this.props;
        if (onCellClick) {
            onCellClick(record, e);
        }
    }

    render() {
        const {
            record, indentSize, prefixCls, indent,
            index, expandIcon, column
        } = this.props;
        const {dataIndex, render, className = ''} = column;

        // We should return undefined if no dataIndex is specified, but in order to
        // be compatible with object-path's behavior, we return the record object instead.
        let text;
        if (typeof dataIndex === 'number') {
            text = get(record, dataIndex);
        } else if (!dataIndex || dataIndex.length === 0) {
            text = record;
        } else {
            text = get(record, dataIndex);
        }
        let tdProps;
        let colSpan;
        let rowSpan;

        if (render) {
            text = render(text, record, index);
            if (this.isInvalidRenderCellText(text)) {
                tdProps = text.props || {};
                colSpan = tdProps.colSpan;
                rowSpan = tdProps.rowSpan;
                text = text.children;
            }
        }

        // Fix https://github.com/ant-design/ant-design/issues/1202
        if (this.isInvalidRenderCellText(text)) {
            text = null;
        }

        const indentText = expandIcon ? (
            <span
                style={{paddingLeft: `${indentSize * indent}px`}}
                className={`${prefixCls}-indent indent-level-${indent}`}
            />
        ) : null;

        if (rowSpan === 0 || colSpan === 0) {
            return null;
        }
        return (
            <td
                className={className}
                {...tdProps as any}
                onClick={this.handleClick}
            >
                {indentText}
                {expandIcon}
                {text}
            </td>
        );
    }
}
