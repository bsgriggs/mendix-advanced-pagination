/**
 * This file was generated from AdvancedPagination.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, WebIcon } from "mendix";
import { Big } from "big.js";

export type PageSizeTypeEnum = "EXPRESSION" | "TEXT_BOX" | "DROPDOWN";

export interface PageSizesType {
    value: number;
}

export type AutoCorrectToEnum = "FIRST" | "LAST";

export type DisplayFormatEnum = "navigation" | "perPage";

export type PageDisplayTypeEnum = "PAGES" | "RECORDS" | "CUSTOM";

export type PageBreakEnum = "ellipses" | "line" | "space" | "none";

export type ResultCountCaptionAlignmentEnum = "start" | "end" | "hide";

export type PageSizeAlignmentEnum = "START" | "END";

export type RenderModeEnum = "button" | "link";

export type ButtonStyleEnum = "default" | "inverse" | "primary" | "info" | "success" | "warning" | "danger";

export type ButtonAlignmentEnum = "start" | "middle" | "end";

export interface PageSizesPreviewType {
    value: number | null;
}

export interface AdvancedPaginationContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    page: EditableValue<Big>;
    resultCount: EditableValue<Big>;
    pageSizeType: PageSizeTypeEnum;
    pageSize: DynamicValue<Big>;
    pageSizeAttr: EditableValue<Big>;
    pageSizes: PageSizesType[];
    refreshAction?: ActionValue;
    autoCorrect: boolean;
    autoCorrectTo: AutoCorrectToEnum;
    displayFormat: DisplayFormatEnum;
    includeEnds: boolean;
    pageDisplayType: PageDisplayTypeEnum;
    pageDisplay: DynamicValue<string>;
    pageOffset: DynamicValue<Big>;
    pageBreak: PageBreakEnum;
    groupDigits: boolean;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    showLineBreaks: boolean;
    showPageSizeLabel: boolean;
    pageSizeAlignment: PageSizeAlignmentEnum;
    resultCountCaption?: DynamicValue<string>;
    pageLabel: DynamicValue<string>;
    pageSizeLabel: DynamicValue<string>;
    ofLabel: DynamicValue<string>;
    toLabel: DynamicValue<string>;
    firstLabel: DynamicValue<string>;
    previousLabel: DynamicValue<string>;
    nextLabel: DynamicValue<string>;
    lastLabel: DynamicValue<string>;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;
    buttonAlignment: ButtonAlignmentEnum;
    pageBreakIcon?: DynamicValue<WebIcon>;
    firstPageIcon?: DynamicValue<WebIcon>;
    previousPageIcon?: DynamicValue<WebIcon>;
    nextPageIcon?: DynamicValue<WebIcon>;
    lastPageIcon?: DynamicValue<WebIcon>;
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
    page: string;
    resultCount: string;
    pageSizeType: PageSizeTypeEnum;
    pageSize: string;
    pageSizeAttr: string;
    pageSizes: PageSizesPreviewType[];
    refreshAction: {} | null;
    autoCorrect: boolean;
    autoCorrectTo: AutoCorrectToEnum;
    displayFormat: DisplayFormatEnum;
    includeEnds: boolean;
    pageDisplayType: PageDisplayTypeEnum;
    pageDisplay: string;
    pageOffset: string;
    pageBreak: PageBreakEnum;
    groupDigits: boolean;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    showLineBreaks: boolean;
    showPageSizeLabel: boolean;
    pageSizeAlignment: PageSizeAlignmentEnum;
    resultCountCaption: string;
    pageLabel: string;
    pageSizeLabel: string;
    ofLabel: string;
    toLabel: string;
    firstLabel: string;
    previousLabel: string;
    nextLabel: string;
    lastLabel: string;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;
    buttonAlignment: ButtonAlignmentEnum;
    pageBreakIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    firstPageIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    previousPageIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    nextPageIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    lastPageIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
}
