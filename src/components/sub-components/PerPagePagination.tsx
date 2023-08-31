import { createElement, ReactElement, useMemo } from "react";
import { PageBreakEnum, RenderModeEnum, ButtonStyleEnum } from "../../../typings/AdvancedPaginationProps";
import PageBreak from "./PageBreak";
import NavButton from "./NavButton";
import classNames from "classnames";
import { WebIcon } from "mendix";

type PerPagePaginationProps = {
    page: number;
    pageTotal: number;
    includeArrows: boolean;
    pageOffset: number;
    pageBreak: PageBreakEnum;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;
    tabIndex: number;
    setPage: (newPage: number) => void;
    /* Label customization */
    pageLabel: string;
    firstLabel: string;
    previousLabel: string;
    nextLabel: string;
    lastLabel: string;
    /* Icon set */
    firstIcon: WebIcon;
    previousIcon: WebIcon;
    nextIcon: WebIcon;
    lastIcon: WebIcon;
};

const PerPagePagination = (props: PerPagePaginationProps): ReactElement => {
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

    const pageNavigations = useMemo((): ReactElement[] => {
        const returnButtons: ReactElement[] = [];
        for (let i = minPage; i <= maxPage; i++) {
            if (i !== 1 && i !== props.pageTotal) {
                returnButtons.push(
                    <NavButton
                        key={i}
                        active={i === props.page}
                        title={`${props.pageLabel} ${i}`}
                        onClick={() => {
                            props.setPage(i);
                        }}
                        disabled={false}
                        btnCaption={i.toString()}
                        renderMode={props.renderMode}
                        buttonStyle={props.buttonStyle}
                        tabIndex={props.tabIndex}
                    />
                );
            }
        }
        return returnButtons;
    }, [props.page, props.pageTotal, minPage, maxPage, props.pageLabel]);

    return (
        <div className={classNames("per-page-pagination", { "pagination-bar": props.renderMode === "link" })}>
            {props.includeArrows && (
                <NavButton
                    key={`${props.previousLabel} ${props.pageLabel}`}
                    title={`${props.previousLabel} ${props.pageLabel}`}
                    onClick={() => {
                        if (props.page > 1) {
                            props.setPage(props.page - 1);
                        }
                    }}
                    disabled={props.page === 1}
                    renderMode={props.renderMode}
                    buttonStyle={props.buttonStyle}
                    icon={props.previousIcon}
                    tabIndex={props.tabIndex}
                />
            )}

            <NavButton
                key={`${props.firstLabel} ${props.pageLabel}`}
                title={`${props.firstLabel} ${props.pageLabel}`}
                btnCaption="1"
                onClick={() => {
                    if (props.page > 1) {
                        props.setPage(1);
                    }
                }}
                active={props.page === 1}
                disabled={false}
                renderMode={props.renderMode}
                buttonStyle={props.buttonStyle}
                tabIndex={props.tabIndex}
            />
            {minPage > 2 && <PageBreak mode={props.pageBreak} />}

            {pageNavigations}

            {maxPage < props.pageTotal - 1 && <PageBreak mode={props.pageBreak} />}

            {props.pageTotal !== 1 && (
                <NavButton
                    key={`${props.lastLabel} ${props.pageLabel}`}
                    title={`${props.lastLabel} ${props.pageLabel}`}
                    onClick={() => {
                        if (props.page < props.pageTotal) {
                            props.setPage(props.pageTotal);
                        }
                    }}
                    active={props.page === props.pageTotal}
                    disabled={false}
                    renderMode={props.renderMode}
                    buttonStyle={props.buttonStyle}
                    btnCaption={props.pageTotal.toString()}
                    tabIndex={props.tabIndex}
                />
            )}

            {props.includeArrows && (
                <NavButton
                    key={`${props.nextLabel} ${props.pageLabel}`}
                    title={`${props.nextLabel} ${props.pageLabel}`}
                    onClick={() => {
                        if (props.page < props.pageTotal) {
                            props.setPage(props.page + 1);
                        }
                    }}
                    disabled={props.page === props.pageTotal}
                    renderMode={props.renderMode}
                    buttonStyle={props.buttonStyle}
                    icon={props.nextIcon}
                    tabIndex={props.tabIndex}
                />
            )}
        </div>
    );
};

export default PerPagePagination;
