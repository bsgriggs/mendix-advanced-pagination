import React, { createElement } from "react";
import { ButtonAlignmentEnum, ResultCountCaptionAlignmentEnum } from "../../typings/PaginationProps";
import { style } from "typestyle";

export type PerPagePaginationProps = {
    page: number;
    pageTotal: number;
    buttonAlignment: ButtonAlignmentEnum;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    resultCountCaption: string;
    includeNavs: boolean;
    maxPages: number;

    setPage: (newPage: number) => void;
};

const PerPagePagination = (props: PerPagePaginationProps) => {
    // console.log("PerPagePaginationProps", props);

    const justifyDirection = (): string => {
        switch (props.buttonAlignment) {
            case "start":
                return "flex-start";
            case "middle":
                return "center";
            case "end":
                return "flex-end";
            default:
                return "flex-start";
        }
    };

    // console.log("justifyDirection", justifyDirection());

    const PerPagePaginationContainer = style({
        display: "flex",
        alignItems: "center",
        justifyContent: `${justifyDirection()}`,
        gap: "0.5em",
    });
    // console.log("PerPagePaginationContainer", PerPagePaginationContainer);

    let minPage: number = props.page - props.maxPages;
    if (minPage < 1) {
        minPage = 1;
    }

    let maxPage: number = props.page + props.maxPages;
    if (maxPage > props.pageTotal) {
        maxPage = props.pageTotal;
    }

    const createPageNavigations = (): Array<JSX.Element> => {
        console.log("minPage", minPage);
        console.log("maxPage", maxPage);
        console.log("props", props);

        let returnButtons: JSX.Element[] = [];
        for (let i = minPage; i <= maxPage; i++) {
            returnButtons.push(
                <button
                    className={i === props.page ? "btn mx-button active" : "btn mx-button"}
                    title={`Page ${i}`}
                    aria-label={`Page ${i}`}
                    data-disabled="false"
                    data-dashlane-label="true"
                    data-form-type="other"
                    onClick={() => props.setPage(i)}
                >
                    {i}
                </button>
            );
        }
        return returnButtons;
    };

    return (
        <div className={PerPagePaginationContainer}>
            {props.resultCountCaptionAlignment === "start" && (
                <span className="mx-text">{props.resultCountCaption}</span>
            )}
            {props.includeNavs && (
                <button
                    className="btn mx-button "
                    title="Previous Page"
                    aria-label="Previous Page"
                    data-disabled="false"
                    data-dashlane-label="true"
                    data-form-type="other"
                    onClick={() => {
                        if (props.page > 1) {
                            // console.log("previous page");
                            props.setPage(props.page - 1);
                        }
                    }}
                >
                    <span className="glyphicon glyphicon-triangle-left"></span>
                </button>
            )}
            {minPage !== 1 && (
                <React.Fragment>
                    <button
                        className="btn mx-button "
                        title="First Page"
                        aria-label="First Page"
                        data-disabled="false"
                        data-dashlane-label="true"
                        data-form-type="other"
                        onClick={() => {
                            if (props.page > 1) {
                                // console.log("first page");
                                props.setPage(1);
                            }
                        }}
                    >
                        1
                    </button>
                    <span className="mx-text">...</span>
                </React.Fragment>
            )}
            {createPageNavigations().map(element => element)}
            {maxPage !== props.pageTotal && (
                <React.Fragment>
                    <span className="mx-text">...</span>
                    <button
                        className="btn mx-button"
                        title="Last Page"
                        aria-label="Last Page"
                        data-disabled="false"
                        data-dashlane-label="true"
                        data-form-type="other"
                        onClick={() => {
                            if (props.page < props.pageTotal) {
                                // console.log("last page");
                                props.setPage(props.pageTotal);
                            }
                        }}
                    >
                        {props.pageTotal}
                    </button>
                </React.Fragment>
            )}
            {props.includeNavs && (
                <button
                    className="btn mx-button"
                    title="Next Page"
                    aria-label="Next Page"
                    data-disabled="false"
                    data-dashlane-label="true"
                    data-form-type="action,next"
                    onClick={() => {
                        if (props.page < props.pageTotal) {
                            // console.log("next page");
                            props.setPage(props.page + 1);
                        }
                    }}
                >
                    <span className="glyphicon glyphicon-triangle-right"></span>
                </button>
            )}
            {props.resultCountCaptionAlignment === "end" && <span className="mx-text">{props.resultCountCaption}</span>}
        </div>
    );
};

export default PerPagePagination;
