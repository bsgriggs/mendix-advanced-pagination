/**
 * This file was generated from AdvancedPagination.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type DisplayFormatEnum = "navigation" | "perPage";

export type PageBreakEnum = "ellipses" | "line" | "space";

export type ResultCountCaptionAlignmentEnum = "start" | "end" | "hide";

export type ButtonAlignmentEnum = "start" | "middle" | "end";

export type RenderModeEnum = "button" | "link";

export type ButtonStyleEnum = "default" | "inverse" | "primary" | "info" | "success" | "warning" | "danger";

export interface AdvancedPaginationContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    displayFormat: DisplayFormatEnum;
    includeEnds: boolean;
    pageDisplay?: DynamicValue<string>;
    includeArrows: boolean;
    pageOffset: DynamicValue<Big>;
    pageBreak: PageBreakEnum;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    resultCountCaption?: DynamicValue<string>;
    buttonAlignment: ButtonAlignmentEnum;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;
    refreshAction?: ActionValue;
    page: EditableValue<Big>;
    pageSize: DynamicValue<Big>;
    resultCount: EditableValue<Big>;
}

export interface AdvancedPaginationPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    displayFormat: DisplayFormatEnum;
    includeEnds: boolean;
    pageDisplay: string;
    includeArrows: boolean;
    pageOffset: string;
    pageBreak: PageBreakEnum;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    resultCountCaption: string;
    buttonAlignment: ButtonAlignmentEnum;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;
    refreshAction: {} | null;
    page: string;
    pageSize: string;
    resultCount: string;
}
