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
                "spacing-outer-bottom-medium",
                props.buttonAlignment
            )}
            style={props.style}
        >
            {props.resultCountCaptionAlignment === "start" && (
                <span className="mx-text">{props.resultCountCaption}</span>
            )}
            {props.pageSizeAlignment === "START" && (
                <Fragment>
                    {props.pageSizeType === "DROPDOWN" && <PageSizeDropdown {...props} />}
                    {props.pageSizeType === "TEXT_BOX" && <PageSizeTextbox {...props} />}
                </Fragment>
            )}
            {props.resultCount > 0 && props.displayFormat === "navigation" && <NavigationPagination {...props} />}
            {props.resultCount > 0 && props.displayFormat === "perPage" && <PerPagePagination {...props} />}
            {props.pageSizeAlignment === "END" && (
                <Fragment>
                    {props.pageSizeType === "DROPDOWN" && <PageSizeDropdown {...props} />}
                    {props.pageSizeType === "TEXT_BOX" && <PageSizeTextbox {...props} />}
                </Fragment>
            )}
            {props.resultCountCaptionAlignment === "end" && <span className="mx-text">{props.resultCountCaption}</span>}
        </div>
    );
};

export default Pagination;
