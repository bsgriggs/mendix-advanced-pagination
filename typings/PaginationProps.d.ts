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

export type RenderModeEnum = "button" | "link";

export type ButtonStyleEnum = "default" | "inverse" | "primary" | "info" | "success" | "warning" | "danger";

export type PageBreakEnum = "ellipses" | "line" | "space" | "none";

export interface PaginationContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    displayFormat: DisplayFormatEnum;
    resultCountCaption: DynamicValue<string>;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    buttonAlignment: ButtonAlignmentEnum;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;
    refreshAction?: ActionValue;
    pageDisplay: DynamicValue<string>;
    includeArrows: boolean;
    pageOffset: DynamicValue<Big>;
    pageBreak: PageBreakEnum;
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
    resultCountCaption: string;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    buttonAlignment: ButtonAlignmentEnum;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;
    refreshAction: {} | null;
    pageDisplay: string;
    includeArrows: boolean;
    pageOffset: string;
    pageBreak: PageBreakEnum;
    page: string;
    pageSize: string;
    resultCount: string;
}
