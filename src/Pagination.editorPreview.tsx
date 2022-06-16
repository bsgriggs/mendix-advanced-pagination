import { ReactNode, createElement } from "react";
import { PaginationPreviewProps } from "../typings/PaginationProps";
import NavigationPagination from "./components/NavigationPagination";
import PerPageNavigation from "./components/PerPagePagination";

declare function require(name: string): string;

export const preview = (props: PaginationPreviewProps): ReactNode => {
    if (props.displayFormat === "navigation") {
        return (
            <NavigationPagination
                page={2}
                pageTotal={4}
                buttonAlignment={props.buttonAlignment}
                resultCountCaptionAlignment={props.resultCountCaptionAlignment}
                resultCountCaption={props.resultCountCaption}
                pageDisplay={props.pageDisplay}
                setPage={() => {
                    /* DO NOTHING */
                }}
                renderMode={props.renderMode}
                buttonStyle={props.buttonStyle}
                includeEnds={props.includeEnds}
            />
        );
    } else {
        return (
            <PerPageNavigation
                page={2}
                pageTotal={7}
                buttonAlignment={props.buttonAlignment}
                resultCountCaptionAlignment={props.resultCountCaptionAlignment}
                resultCountCaption={props.resultCountCaption}
                includeArrows={props.includeArrows}
                pageOffset={1}
                setPage={() => {
                    /* DO NOTHING */
                }}
                pageBreak={props.pageBreak}
                renderMode={props.renderMode}
                buttonStyle={props.buttonStyle}
            />
        );
    }
};

export function getPreviewCss(): string {
    return require("./ui/Pagination.css");
}
