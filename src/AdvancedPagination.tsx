import { createElement, Fragment, ReactElement, useEffect } from "react";
import { ValueStatus } from "mendix";
import { AdvancedPaginationContainerProps } from "../typings/AdvancedPaginationProps";
import NavigationPagination from "./components/NavigationPagination";
import PerPagePagination from "./components/PerPagePagination";
import Big from "big.js";

import "./ui/AdvancedPagination.css";

const Pagination = (props: AdvancedPaginationContainerProps): ReactElement => {
    const page = props.page.status === ValueStatus.Available && props.page.value ? Number(props.page.value) : 1;
    const pageSize =
        props.pageSize.status === ValueStatus.Available && props.pageSize.value ? Number(props.pageSize.value) : 10;
    const resultCount =
        props.resultCount.status === ValueStatus.Available && props.resultCount.value
            ? Number(props.resultCount.value)
            : 0;
    const pageTotal = resultCount > 0 ? Math.ceil(resultCount / pageSize) : 1;
    const resultCountCaption =
        props.resultCountCaption &&
        props.resultCountCaption.status === ValueStatus.Available &&
        props.resultCountCaption.value
            ? props.resultCountCaption.value
            : resultCount === 1
            ? "1 result"
            : resultCount + " results";
    const pageDisplay =
        props.pageDisplay && props.pageDisplay.status === ValueStatus.Available && props.pageDisplay.value
            ? props.pageDisplay.value
            : `Page ${page} of ${pageTotal}`;
    const pageOffset =
        props.pageOffset.status === ValueStatus.Available && props.pageOffset.value
            ? Number(props.pageOffset.value)
            : 1;

    if (props.autoCorrect) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (page > pageTotal || page < 1) {
                if (props.autoCorrectTo === "FIRST") {
                    setPage(1);
                } else {
                    setPage(pageTotal);
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [page, pageTotal]);
    }

    const setPage = (newPage: number): void => {
        props.page.setValue(Big(newPage));
        props.refreshAction?.execute();
    };

    const determineFormat = (): ReactElement => {
        switch (props.displayFormat) {
            case "navigation":
                return (
                    <NavigationPagination
                        page={page}
                        pageTotal={pageTotal}
                        buttonAlignment={props.buttonAlignment}
                        resultCountCaption={resultCountCaption}
                        resultCountCaptionAlignment={props.resultCountCaptionAlignment}
                        pageDisplay={pageDisplay}
                        setPage={setPage}
                        renderMode={props.renderMode}
                        buttonStyle={props.buttonStyle}
                        includeEnds={props.includeEnds}
                    />
                );
            case "perPage":
                return (
                    <PerPagePagination
                        page={page}
                        pageTotal={pageTotal}
                        buttonAlignment={props.buttonAlignment}
                        resultCountCaption={resultCountCaption}
                        resultCountCaptionAlignment={props.resultCountCaptionAlignment}
                        includeArrows={props.includeArrows}
                        pageOffset={pageOffset}
                        pageBreak={props.pageBreak}
                        setPage={setPage}
                        renderMode={props.renderMode}
                        buttonStyle={props.buttonStyle}
                    />
                );
            default:
                return <Fragment />;
        }
    };

    if (resultCount > 0) {
        return (
            <div className={props.class ? "widget-pagination " + props.class : "widget-pagination"}>
                {determineFormat()}
            </div>
        );
    } else {
        return <div className={props.class ? "widget-pagination " + props.class : "widget-pagination"}></div>;
    }
};

export default Pagination;
