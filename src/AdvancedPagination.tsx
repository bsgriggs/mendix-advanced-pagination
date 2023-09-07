import { createElement, ReactElement, useEffect, useMemo, useCallback } from "react";
import { AdvancedPaginationContainerProps } from "../typings/AdvancedPaginationProps";
import Big from "big.js";
import Pagination from "./components/Pagination";
import "./ui/AdvancedPagination.scss";

const AdvancedPagination = (props: AdvancedPaginationContainerProps): ReactElement => {
    const groupDigits = useCallback(
        /* eslint-disable */
        (newNumber: number): string =>
            props.groupDigits
                ? // @ts-ignore
                  mx.parser.formatValue(newNumber || 0, "integer", { groupDigits: true, decimalPrecision: 0 })
                : newNumber,
        /* eslint-enable */
        [props.groupDigits]
    );
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
                : groupDigits(resultCount) + " results",
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.resultCountCaption, resultCount]
    );
    const pageDisplay: string = useMemo(() => {
        if (pageSize) {
            const offset = (page - 1) * pageSize;
            return props.pageDisplayType === "PAGES"
                ? `${props.pageLabel.value} ${groupDigits(page)} ${props.ofLabel.value} ${groupDigits(pageTotal)}`
                : props.pageDisplayType === "RECORDS"
                ? resultCount === 0
                    ? `0 ${props.toLabel.value} 0 ${props.ofLabel.value} 0`
                    : `${groupDigits(offset + 1)} ${props.toLabel.value} ${groupDigits(
                          page === pageTotal ? resultCount : offset + pageSize
                      )} ${props.ofLabel.value} ${groupDigits(resultCount)}`
                : (props.pageDisplay.value as string);
        } else {
            return "";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageTotal, pageSize, resultCount]);

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
            pageDisplay={pageDisplay}
            pageOffset={pageOffset}
            page={page}
            setPage={setPage}
            pageTotal={pageTotal}
            resultCount={resultCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
            /* Label customization */
            pageLabel={props.pageLabel.value as string}
            pageSizeLabel={props.pageSizeLabel.value as string}
            firstLabel={props.firstLabel.value as string}
            previousLabel={props.previousLabel.value as string}
            nextLabel={props.nextLabel.value as string}
            lastLabel={props.lastLabel.value as string}
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
