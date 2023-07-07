import { createElement, CSSProperties, Fragment, ReactElement } from "react";
import {
    ButtonAlignmentEnum,
    ResultCountCaptionAlignmentEnum,
    PageBreakEnum,
    RenderModeEnum,
    ButtonStyleEnum
} from "../../typings/AdvancedPaginationProps";
import PageBreak from "./PageBreak";
import NavButton from "./NavButton";

type PerPagePaginationProps = {
    name: string;
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
    tabIndex?: number;
    setPage: (newPage: number) => void;
};

const PerPagePagination = ({
    name,
    buttonAlignment,
    buttonStyle,
    includeArrows,
    page,
    pageBreak,
    pageOffset,
    pageTotal,
    renderMode,
    resultCountCaption,
    resultCountCaptionAlignment,
    setPage,
    tabIndex
}: PerPagePaginationProps): ReactElement => {
    // Function to re-focus the active button on click or keyboard navigation
    const focusActiveButton = (newPage: number): void => {
        setTimeout(() => {
            const activeButton = document.getElementById(name + "_" + newPage);
            activeButton?.focus();
        }, 100);
    };

    const justifyDirection = (): string => {
        switch (buttonAlignment) {
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

    const PerPagePaginationContainer: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: `${justifyDirection()}`,
        flexWrap: "wrap",
        gap: "0.5em"
    };

    // Default values
    let minPage: number = page - pageOffset;
    const middlePage = Math.ceil(pageTotal / 2);
    let maxPage: number = page + pageOffset;

    // current page is close to start
    if (minPage < 1) {
        minPage = 1;
    }
    // current page is close to end
    if (maxPage > pageTotal) {
        maxPage = pageTotal;
    }

    // Being on the middle page would show all buttons
    if (middlePage - pageOffset <= 2 && middlePage + pageOffset >= pageTotal - 1) {
        minPage = 1;
        maxPage = pageTotal;
    } else if (page <= pageOffset + 1) {
        // show more pages at the start
        maxPage = pageOffset * 2 + 2;
    } else if (page >= pageTotal - pageOffset) {
        // show more pages at the end
        minPage = pageTotal - pageOffset * 2 - 1;
    }

    const createPageNavigations = (): ReactElement[] => {
        const returnButtons: ReactElement[] = [];
        for (let i = minPage; i <= maxPage; i++) {
            returnButtons.push(
                <NavButton
                    name={name}
                    active={i === page}
                    title={`Page ${i}`}
                    onClick={() => {
                        setPage(i);
                        focusActiveButton(i);
                    }}
                    btnCaption={i.toString()}
                    renderMode={renderMode}
                    buttonStyle={buttonStyle}
                    tabIndex={tabIndex}
                />
            );
        }
        return returnButtons;
    };

    return (
        <div style={PerPagePaginationContainer}>
            {resultCountCaptionAlignment === "start" && <span className="mx-text">{resultCountCaption}</span>}
            {includeArrows && (
                <NavButton
                    name={name}
                    title="Previous Page"
                    onClick={() => {
                        if (page > 1) {
                            setPage(page - 1);
                        }
                    }}
                    renderMode={renderMode}
                    buttonStyle={buttonStyle}
                    GlyphiconClass="glyphicon-triangle-left"
                    tabIndex={tabIndex}
                />
            )}
            {minPage !== 1 && (
                <Fragment>
                    <NavButton
                        name={name}
                        title="First Page"
                        btnCaption="1"
                        onClick={() => {
                            if (page > 1) {
                                setPage(1);
                                focusActiveButton(1);
                            }
                        }}
                        renderMode={renderMode}
                        buttonStyle={buttonStyle}
                        tabIndex={tabIndex}
                    />
                    {minPage !== 2 && <PageBreak mode={pageBreak} buttonStyle={buttonStyle} />}
                </Fragment>
            )}
            {createPageNavigations()}
            {maxPage !== pageTotal && (
                <Fragment>
                    {maxPage !== pageTotal - 1 && <PageBreak mode={pageBreak} buttonStyle={buttonStyle} />}
                    <NavButton
                        name={name}
                        title="Last Page"
                        onClick={() => {
                            if (page < pageTotal) {
                                setPage(pageTotal);
                                focusActiveButton(pageTotal);
                            }
                        }}
                        renderMode={renderMode}
                        buttonStyle={buttonStyle}
                        btnCaption={pageTotal.toString()}
                        tabIndex={tabIndex}
                    />
                </Fragment>
            )}
            {includeArrows && (
                <NavButton
                    name={name}
                    title="Next Page"
                    onClick={() => {
                        if (page < pageTotal) {
                            setPage(page + 1);
                        }
                    }}
                    renderMode={renderMode}
                    buttonStyle={buttonStyle}
                    GlyphiconClass="glyphicon-triangle-right"
                    tabIndex={tabIndex}
                />
            )}
            {resultCountCaptionAlignment === "end" && <span className="mx-text">{resultCountCaption}</span>}
        </div>
    );
};

export default PerPagePagination;
