import classNames from "classnames";
import { createElement, ReactElement, CSSProperties, Fragment } from "react";
import PageSizeDropdown from "./sub-components/PageSizeDropdown";
import PageSizeTextbox from "./sub-components/PageSizeTextbox";
import NavigationPagination from "./sub-components/NavigationPagination";
import PerPagePagination from "./sub-components/PerPagePagination";
import { WebIcon } from "mendix";

import {
    ButtonAlignmentEnum,
    ButtonStyleEnum,
    DisplayFormatEnum,
    PageBreakEnum,
    PageDisplayTypeEnum,
    PageSizeAlignmentEnum,
    PageSizeTypeEnum,
    PageSizesType,
    RenderTypeEnum,
    ResultCountCaptionAlignmentEnum
} from "../../typings/AdvancedPaginationProps";
import PageBreak from "./sub-components/PageBreak";
import DropdownPagination from "./sub-components/DropdownPagination";

interface PaginationProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    resultCountCaption: string;
    pageSizeAlignment: PageSizeAlignmentEnum;
    pageSizeType: PageSizeTypeEnum;
    pageSizes: PageSizesType[];
    pageDisplayType: PageDisplayTypeEnum;
    displayFormat: DisplayFormatEnum;
    buttonAlignment: ButtonAlignmentEnum;
    // pageDisplay: string;
    renderType: RenderTypeEnum;
    buttonStyle: ButtonStyleEnum;
    includeEnds: boolean;
    pageOffset: number;
    pageBreak: PageBreakEnum;
    showPageSizeLabel: boolean;
    showLineBreaks: boolean;
    /* Cleaned Props */
    page: number;
    setPage: (newPage: number) => void;
    pageSize: number;
    setPageSize: (newPageSize: number) => void;
    pageTotal: number;
    resultCount: number;
    /* Label customization */
    groupDigits: boolean;
    pageLabel: string;
    ofLabel: string;
    toLabel: string;
    pageSizeLabel: string;
    firstLabel: string;
    previousLabel: string;
    nextLabel: string;
    lastLabel: string;
    customPageDisplay: string;
    /* Icon set */
    pageBreakIcon: WebIcon;
    firstIcon: WebIcon;
    previousIcon: WebIcon;
    nextIcon: WebIcon;
    lastIcon: WebIcon;
}

const Pagination = (props: PaginationProps): ReactElement => {
    return (
        <div
            className={classNames(
                props.class,
                "advanced-pagination",
                props.buttonAlignment,
                `render-${props.renderType}`
            )}
            style={props.style}
        >
            {props.resultCountCaptionAlignment === "start" && (
                <Fragment>
                    <span className="mx-text">{props.resultCountCaption}</span>
                    {props.showLineBreaks && <PageBreak mode="line" />}
                </Fragment>
            )}
            {props.pageSizeAlignment === "START" && props.pageSizeType !== "EXPRESSION" && (
                <Fragment>
                    {props.pageSizeType === "DROPDOWN" && <PageSizeDropdown {...props} />}
                    {props.pageSizeType === "TEXT_BOX" && <PageSizeTextbox {...props} />}
                    {props.showLineBreaks && <PageBreak mode="line" />}
                </Fragment>
            )}
            {props.resultCount > 0 && props.displayFormat === "navigation" && (
                <NavigationPagination {...props} customPageDisplay={props.customPageDisplay} />
            )}
            {props.resultCount > 0 && props.displayFormat === "perPage" && <PerPagePagination {...props} />}
            {props.resultCount > 0 && props.displayFormat === "dropdown" && <DropdownPagination {...props} />}
            {props.pageSizeAlignment === "END" && props.pageSizeType !== "EXPRESSION" && (
                <Fragment>
                    {props.showLineBreaks && <PageBreak mode="line" />}
                    {props.pageSizeType === "DROPDOWN" && <PageSizeDropdown {...props} />}
                    {props.pageSizeType === "TEXT_BOX" && <PageSizeTextbox {...props} />}
                </Fragment>
            )}
            {props.resultCountCaptionAlignment === "end" && (
                <Fragment>
                    {props.showLineBreaks && <PageBreak mode="line" />}
                    <span className="mx-text">{props.resultCountCaption}</span>
                </Fragment>
            )}
        </div>
    );
};

export default Pagination;
