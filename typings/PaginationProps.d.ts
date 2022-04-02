/**
 * This file was generated from Pagination.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export interface PaginationContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    refreshAction?: ActionValue;
    page: EditableValue<BigJs.Big>;
    pageSize: DynamicValue<BigJs.Big>;
    resultCount: EditableValue<BigJs.Big>;
    resultCountCaption: DynamicValue<string>;
}

export interface PaginationPreviewProps {
    class: string;
    style: string;
    refreshAction: {} | null;
    page: string;
    pageSize: string;
    resultCount: string;
    resultCountCaption: string;
}
