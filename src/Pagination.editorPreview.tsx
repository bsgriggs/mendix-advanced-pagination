import { Component, ReactNode, createElement } from "react";
import { PaginationPreviewProps } from "../typings/PaginationProps";
import NavigationPagination from "./components/NavigationPagination";
import PerPageNavigation from "./components/PerPagePagination";

declare function require(name: string): string;

export class preview extends Component<PaginationPreviewProps> {

    render(): ReactNode {
        if (this.props.displayFormat === "navigation") {
        return <NavigationPagination page={2} pageTotal={4} buttonAlignment={"start"} resultCountCaptionAlignment={"start"} resultCountCaption={"33 results"} pageDisplay={"Page 2 of 4"} setPage={() => { } } renderMode={"button"} buttonStyle={"default"}  />;
        } else {
            return <PerPageNavigation page={2} pageTotal={7} buttonAlignment={"middle"} resultCountCaptionAlignment={"start"} resultCountCaption={"33 results"} includeArrows={true} pageOffset={1} setPage={() => { } } pageBreak={"ellipses"} renderMode={"button"} buttonStyle={"default"} />
        }

    }
}

export function getPreviewCss(): string {
    return require("./ui/Pagination.css");
}