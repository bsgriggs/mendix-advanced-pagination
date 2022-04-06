import React, { createElement } from "react";
import { ButtonAlignmentEnum, ResultCountCaptionAlignmentEnum } from "../../typings/PaginationProps";
import styled from "@emotion/styled";

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

    const PerPagePaginationContainer = styled.div`
        display: flex;
        align-items: center;
        justify-content: ${justifyDirection()};
        gap: 0.5em;
    `;
    // console.log("PerPagePaginationContainer", PerPagePaginationContainer);

    let minPage: number;
    if (props.page <= props.maxPages) {
        //close to 1
        minPage = 1;
    } else if (props.page >= props.pageTotal - props.maxPages) {
        //clsoe to end
        minPage = props.pageTotal - props.maxPages * 2;
    } else {
        //set so maxPages are below the active button
        minPage = props.page - props.maxPages;
    }
    let maxPage: number;
    if (props.page <= props.maxPages) {
        //close to 1
        const e = props.maxPages * 2;
        if (props.pageTotal > e) {
            //total pages are more than the buttons to generate
            maxPage = e;
        } else {
            maxPage = props.pageTotal;
        }
    } else if (props.page >= props.pageTotal - props.maxPages) {
        //close to end
        maxPage = props.pageTotal;
    } else {
        //set so maxPages are above the active button
        maxPage = props.page + props.maxPages;
    }

    const createPageNavigations = (): Array<JSX.Element> => {
        props.page > props.pageTotal - props.maxPages ? props.pageTotal : props.page + props.maxPages;
        // console.log("minPage", minPage);
        // console.log("maxPage", maxPage);

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
        <PerPagePaginationContainer>
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
            {props.includeNavs && minPage !== 1 && (
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
            {props.includeNavs && maxPage !== props.pageTotal && (
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
        </PerPagePaginationContainer>
    );
};

export default PerPagePagination;
