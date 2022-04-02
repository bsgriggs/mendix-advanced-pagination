import { Component, ReactNode, createElement } from "react";
import { PaginationPreviewProps } from "../typings/PaginationProps";

declare function require(name: string): string;

export class preview extends Component<PaginationPreviewProps> {
    render(): ReactNode {
        return <button />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Pagination.css");
}
