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
    PageSizeAlignmentEnum,
    PageSizeTypeEnum,
    PageSizesType,
    RenderModeEnum,
    ResultCountCaptionAlignmentEnum
} from "../../typings/AdvancedPaginationProps";
import PageBreak from "./sub-components/PageBreak";

interface PaginationProps {
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    resultCountCaption: string;
    pageSizeAlignment: PageSizeAlignmentEnum;
    pageSizeType: PageSizeTypeEnum;
    pageSizes: PageSizesType[];
    displayFormat: DisplayFormatEnum;
    buttonAlignment: ButtonAlignmentEnum;
    pageDisplay: string;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;
    includeEnds: boolean;
    includeArrows: boolean;
    pageOffset: number;
    pageBreak: PageBreakEnum;
    groupDigits: boolean;
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
    pageLabel: string;
    pageSizeLabel: string;
    firstLabel: string;
    previousLabel: string;
    nextLabel: string;
    lastLabel: string;

    /* Icon set */
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
                // "spacing-outer-bottom-medium",
                props.buttonAlignment,
                `render-${props.renderMode}`
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
                <Fragment>
                    <NavigationPagination {...props} />
                </Fragment>
            )}
            {props.resultCount > 0 && props.displayFormat === "perPage" && (
                <Fragment>
                    <PerPagePagination {...props} />
                </Fragment>
            )}
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
