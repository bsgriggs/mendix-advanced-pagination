/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createElement } from "react";
import { AdvancedPaginationPreviewProps } from "../typings/AdvancedPaginationProps";
import Pagination from "./components/Pagination";
import { WebIcon } from "mendix";

export const preview = (props: AdvancedPaginationPreviewProps): ReactNode => {
    const resultCountCaption = props.resultCountCaption.trim().length > 0 ? props.resultCountCaption : "100 results";
    const tryParseNumber = (tryNumber: string, defaultNumber: number): number => {
        try {
            return Number(tryNumber);
        } catch (err) {
            return defaultNumber;
        }
    };

    const pageDisplay: string =
        props.displayFormat === "navigation"
            ? props.pageDisplayType === "PAGES"
                ? `${props.pageLabel} 1 ${props.ofLabel} 10}`
                : props.pageDisplayType === "RECORDS"
                ? `1 ${props.toLabel} 10 ${props.ofLabel} 100`
                : (props.pageDisplay as string)
            : "";

    return (
        <Pagination
            {...props}
            style={props.styleObject}
            tabIndex={0}
            resultCountCaption={resultCountCaption}
            pageSizes={[{ value: 10 }]}
            pageDisplay={pageDisplay}
            pageOffset={tryParseNumber(props.pageOffset, 1)}
            page={1}
            pageSize={10}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setPage={() => {}}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setPageSize={() => {}}
            pageTotal={10}
            resultCount={100}
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
            groupDigits={false}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/AdvancedPagination.scss");
}
