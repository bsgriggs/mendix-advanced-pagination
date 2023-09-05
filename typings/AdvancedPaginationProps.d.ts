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

export type DisplayFormatEnum = "navigation" | "perPage";

export type PageDisplayTypeEnum = "PAGES" | "RECORDS" | "CUSTOM";

export type PageBreakEnum = "ellipses" | "line" | "space" | "none";

export type PageSizeAlignmentEnum = "START" | "END";

export type ResultCountCaptionAlignmentEnum = "start" | "end" | "hide";

export type AutoCorrectToEnum = "FIRST" | "LAST";

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
    displayFormat: DisplayFormatEnum;
    includeEnds: boolean;
    pageDisplayType: PageDisplayTypeEnum;
    pageDisplay: DynamicValue<string>;
    includeArrows: boolean;
    pageOffset: DynamicValue<Big>;
    pageBreak: PageBreakEnum;
    groupDigits: boolean;
    showPageSizeLabel: boolean;
    pageSizeAlignment: PageSizeAlignmentEnum;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    resultCountCaption?: DynamicValue<string>;
    showLineBreaks: boolean;
    autoCorrect: boolean;
    autoCorrectTo: AutoCorrectToEnum;
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
    displayFormat: DisplayFormatEnum;
    includeEnds: boolean;
    pageDisplayType: PageDisplayTypeEnum;
    pageDisplay: string;
    includeArrows: boolean;
    pageOffset: string;
    pageBreak: PageBreakEnum;
    groupDigits: boolean;
    showPageSizeLabel: boolean;
    pageSizeAlignment: PageSizeAlignmentEnum;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    resultCountCaption: string;
    showLineBreaks: boolean;
    autoCorrect: boolean;
    autoCorrectTo: AutoCorrectToEnum;
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
    firstPageIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    previousPageIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    nextPageIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    lastPageIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
}
