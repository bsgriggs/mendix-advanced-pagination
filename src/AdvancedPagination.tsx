import { createElement, ReactElement, useEffect, useMemo, useCallback } from "react";
import { AdvancedPaginationContainerProps } from "../typings/AdvancedPaginationProps";
import Big from "big.js";
import Pagination from "./components/Pagination";
import "./ui/AdvancedPagination.scss";
import MxFormatter from "./utils/MxFormatter";

const AdvancedPagination = (props: AdvancedPaginationContainerProps): ReactElement => {
    const pageSize: number = useMemo(
        () => (props.pageSizeType === "EXPRESSION" ? Number(props.pageSize.value) : Number(props.pageSizeAttr.value)),
        [props.pageSize, props.pageSizeAttr, props.pageSizeType]
    );

    const page: number = useMemo(() => Number(props.page.value), [props.page]);
    const resultCount: number = useMemo(() => Number(props.resultCount.value), [props.resultCount.value]);
    const pageTotal: number = useMemo(
        () => (resultCount > 0 && pageSize > 0 ? Math.ceil(resultCount / pageSize) : 1),
        [resultCount, pageSize]
    );
    const resultCountCaption = useMemo(
        () =>
            props.resultCountCaption?.value
                ? props.resultCountCaption.value
                : resultCount === 1
                ? "1 result"
                : MxFormatter(resultCount, props.groupDigits) + " results",
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.resultCountCaption, resultCount]
    );

    const pageOffset = useMemo(
        () => (props.pageOffset?.value ? Number(props.pageOffset.value) : 1),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.pageOffset]
    );

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

    const setPage = useCallback(
        (newPage: number): void => {
            props.page.setValue(Big(newPage));
            props.refreshAction?.execute();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.page, props.refreshAction]
    );
    const setPageSize = useCallback(
        (newPageSize: number): void => {
            props.pageSizeAttr.setValue(new Big(newPageSize));
            props.refreshAction?.execute();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.page, props.refreshAction]
    );

    return (
        <Pagination
            {...props}
            tabIndex={props.tabIndex || 0}
            resultCountCaption={resultCountCaption}
            // pageDisplay={pageDisplay}
            pageOffset={pageOffset}
            page={page}
            setPage={setPage}
            pageTotal={pageTotal}
            resultCount={resultCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
            /* Label customization */
            pageLabel={props.pageLabel.value as string}
            ofLabel={props.ofLabel.value as string}
            toLabel={props.toLabel.value as string}
            pageSizeLabel={props.pageSizeLabel.value as string}
            firstLabel={props.firstLabel.value as string}
            previousLabel={props.previousLabel.value as string}
            nextLabel={props.nextLabel.value as string}
            lastLabel={props.lastLabel.value as string}
            customPageDisplay={props.pageDisplay.value as string}
            /* Icon set */
            pageBreakIcon={props.pageBreakIcon?.value || { type: "glyph", iconClass: "glyphicon-option-horizontal" }}
            firstIcon={props.firstPageIcon?.value || { type: "glyph", iconClass: "glyphicon-step-backward" }}
            previousIcon={props.previousPageIcon?.value || { type: "glyph", iconClass: "glyphicon-triangle-left" }}
            nextIcon={props.nextPageIcon?.value || { type: "glyph", iconClass: "glyphicon-triangle-right" }}
            lastIcon={props.lastPageIcon?.value || { type: "glyph", iconClass: "glyphicon-step-forward" }}
        />
    );
};

export default AdvancedPagination;
