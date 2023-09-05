import { ReactNode, createElement, useMemo, useCallback } from "react";
import { AdvancedPaginationPreviewProps, PageSizesType } from "../typings/AdvancedPaginationProps";
import Pagination from "./components/Pagination";
import { WebIcon } from "mendix";

declare function require(name: string): string;

export const preview = (props: AdvancedPaginationPreviewProps): ReactNode => {
    const tryParseNumber = useCallback((tryNumber: string, defaultNumber: number) => {
        try {
            return Number(tryNumber);
        } catch (err) {
            return defaultNumber;
        }
    }, []);

    const defaultPageSize: number = useMemo(
        () => tryParseNumber(props.pageSizeType === "EXPRESSION" ? props.pageSize : props.pageSizeAttr, 10),
        [props.pageSize, props.pageSizeAttr]
    );

    const resultCount: number = useMemo(() => 100, []);
    const pageTotal: number = useMemo(
        () =>
            resultCount > 0 && defaultPageSize && defaultPageSize > 0 ? Math.ceil(resultCount / defaultPageSize) : 1,
        [resultCount]
    );
    const resultCountCaption = useMemo(
        () =>
            props.resultCountCaption !== undefined
                ? props.resultCountCaption
                : resultCount === 1
                ? "1 result"
                : resultCount + " results",
        [props.resultCountCaption, resultCount]
    );
    const offset = useMemo(() => 0, []);
    const pageDisplay: string = useMemo(
        () =>
            props.pageDisplayType === "PAGES"
                ? `Page ${1} of ${pageTotal}`
                : props.pageDisplayType === "RECORDS"
                ? resultCount === 0
                    ? "0 to 0 of 0"
                    : `${offset + 1} to ${1 === pageTotal ? resultCount : offset + defaultPageSize} of ${resultCount}`
                : props.pageDisplay,
        [pageTotal]
    );

    const pageOffset = useMemo(() => tryParseNumber(props.pageOffset, 1), [props.pageOffset]);

    return (
        <Pagination
            {...props}
            style={props.styleObject}
            tabIndex={0}
            resultCountCaption={resultCountCaption}
            pageSizes={props.pageSizes as PageSizesType[]}
            pageDisplay={pageDisplay}
            pageOffset={pageOffset}
            page={1}
            pageSize={tryParseNumber(props.pageSizeType === "EXPRESSION" ? props.pageSize : props.pageSizeAttr, 10)}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setPage={() => {}}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setPageSize={() => {}}
            pageTotal={pageTotal}
            resultCount={resultCount}
            /* Icon set */
            firstIcon={
                props.firstPageIcon !== null
                    ? (props.firstPageIcon as WebIcon)
                    : { type: "glyph", iconClass: "glyphicon-step-backward" }
            }
            previousIcon={
                props.previousPageIcon !== null
                    ? (props.previousPageIcon as WebIcon)
                    : { type: "glyph", iconClass: "glyphicon-triangle-left" }
            }
            nextIcon={
                props.nextPageIcon !== null
                    ? (props.nextPageIcon as WebIcon)
                    : { type: "glyph", iconClass: "glyphicon-triangle-right" }
            }
            lastIcon={
                props.lastPageIcon !== null
                    ? (props.lastPageIcon as WebIcon)
                    : { type: "glyph", iconClass: "glyphicon-step-forward" }
            }
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/AdvancedPagination.scss");
}
