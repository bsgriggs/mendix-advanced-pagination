import { createElement, Fragment } from "react";
import {
    ButtonAlignmentEnum,
    ResultCountCaptionAlignmentEnum,
    PageBreakEnum,
    RenderModeEnum,
    ButtonStyleEnum
} from "../../typings/PaginationProps";
import { style } from "typestyle";
import PageBreak from "./PageBreak";
import NavButton from "./NavButton";

export type PerPagePaginationProps = {
    page: number;
    pageTotal: number;
    buttonAlignment: ButtonAlignmentEnum;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    resultCountCaption: string;
    includeArrows: boolean;
    pageOffset: number;
    pageBreak: PageBreakEnum;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;

    setPage: (newPage: number) => void;
};

const PerPagePagination = (props: PerPagePaginationProps) => {
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

    const PerPagePaginationContainer = style({
        display: "flex",
        alignItems: "center",
        justifyContent: `${justifyDirection()}`,
        flexWrap: "wrap",
        gap: "0.5em"
    });

    // Default values
    let minPage: number = props.page - props.pageOffset;
    const middlePage = Math.ceil(props.pageTotal / 2);
    let maxPage: number = props.page + props.pageOffset;

    // current page is close to start
    if (minPage < 1) {
        minPage = 1;
    }
    // current page is close to end
    if (maxPage > props.pageTotal) {
        maxPage = props.pageTotal;
    }

    // Being on the middle page would show all buttons
    if (middlePage - props.pageOffset <= 2 && middlePage + props.pageOffset >= props.pageTotal - 1) {
        minPage = 1;
        maxPage = props.pageTotal;
    } else if (props.page <= props.pageOffset + 1) {
        // show more pages at the start
        maxPage = props.pageOffset * 2 + 2;
    } else if (props.page >= props.pageTotal - props.pageOffset) {
        // show more pages at the end
        minPage = props.pageTotal - props.pageOffset * 2 - 1;
    }

    const createPageNavigations = (): Array<JSX.Element> => {
        let returnButtons: JSX.Element[] = [];
        for (let i = minPage; i <= maxPage; i++) {
            returnButtons.push(
                <NavButton
                    active={i === props.page}
                    Title={`Page ${i}`}
                    onClick={() => props.setPage(i)}
                    btnCaption={i.toString()}
                    renderMode={props.renderMode}
                    buttonStyle={props.buttonStyle}
                />
            );
        }
        return returnButtons;
    };

    return (
        <div className={PerPagePaginationContainer}>
            {props.resultCountCaptionAlignment === "start" && (
                <span className="mx-text">{props.resultCountCaption}</span>
            )}
            {props.includeArrows && (
                <NavButton
                    Title="Previous Page"
                    onClick={() => {
                        if (props.page > 1) {
                            props.setPage(props.page - 1);
                        }
                    }}
                    renderMode={props.renderMode}
                    buttonStyle={props.buttonStyle}
                    GlyphiconClass="glyphicon-triangle-left"
                />
            )}
            {minPage !== 1 && (
                <Fragment>
                    <NavButton
                        Title="First Page"
                        btnCaption="1"
                        onClick={() => {
                            if (props.page > 1) {
                                props.setPage(1);
                            }
                        }}
                        renderMode={props.renderMode}
                        buttonStyle={props.buttonStyle}
                    />
                    {minPage !== 2 && <PageBreak mode={props.pageBreak} buttonStyle={props.buttonStyle}/>}
                </Fragment>
            )}
            {createPageNavigations()}
            {maxPage !== props.pageTotal && (
                <Fragment>
                    {maxPage !== props.pageTotal - 1 && <PageBreak mode={props.pageBreak} buttonStyle={props.buttonStyle}/>}
                    <NavButton
                        Title="Last Page"
                        onClick={() => {
                            if (props.page < props.pageTotal) {
                                props.setPage(props.pageTotal);
                            }
                        }}
                        renderMode={props.renderMode}
                        buttonStyle={props.buttonStyle}
                        btnCaption={props.pageTotal.toString()}
                    />
                </Fragment>
            )}
            {props.includeArrows && (
                <NavButton
                    Title="Next Page"
                    onClick={() => {
                        if (props.page < props.pageTotal) {
                            props.setPage(props.page + 1);
                        }
                    }}
                    renderMode={props.renderMode}
                    buttonStyle={props.buttonStyle}
                    GlyphiconClass="glyphicon-triangle-right"
                />
            )}
            {props.resultCountCaptionAlignment === "end" && <span className="mx-text">{props.resultCountCaption}</span>}
        </div>
    );
};

export default PerPagePagination;
