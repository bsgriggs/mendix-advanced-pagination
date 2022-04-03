/**
 * This file was generated from Pagination.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

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
    maxPages: DynamicValue<BigJs.Big>;
    page: EditableValue<BigJs.Big>;
    pageSize: DynamicValue<BigJs.Big>;
    resultCount: EditableValue<BigJs.Big>;
}

export interface PaginationPreviewProps {
    class: string;
    style: string;
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
