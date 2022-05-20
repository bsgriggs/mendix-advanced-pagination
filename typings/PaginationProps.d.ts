/**
 * This file was generated from Pagination.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type DisplayFormatEnum = "navigation" | "perPage";

export type ResultCountCaptionAlignmentEnum = "start" | "end" | "hide";

export type ButtonAlignmentEnum = "start" | "middle" | "end";

export interface PaginationContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    displayFormat: DisplayFormatEnum;
    refreshAction?: ActionValue;
    resultCountCaption: DynamicValue<string>;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    buttonAlignment: ButtonAlignmentEnum;
    pageDisplay: DynamicValue<string>;
    includeNavs: boolean;
    maxPages: DynamicValue<Big>;
    page: EditableValue<Big>;
    pageSize: DynamicValue<Big>;
    resultCount: EditableValue<Big>;
}

export interface PaginationPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    displayFormat: DisplayFormatEnum;
    refreshAction: {} | null;
    resultCountCaption: string;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    buttonAlignment: ButtonAlignmentEnum;
    pageDisplay: string;
    includeNavs: boolean;
    maxPages: string;
    page: string;
    pageSize: string;
    resultCount: string;
}
