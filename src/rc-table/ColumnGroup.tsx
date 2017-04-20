import {Component} from 'react';
import {observer} from "mobx-react";
import {IColumnGroupPropTypes} from "rc-table/PropsType";

@observer
export default class ColumnGroup extends Component<IColumnGroupPropTypes, any> {
    static isTableColumnGroup = true;
}