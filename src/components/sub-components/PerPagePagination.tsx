import { createElement, ReactElement, useMemo, useCallback } from "react";
import { PageBreakEnum, ButtonStyleEnum } from "../../../typings/AdvancedPaginationProps";
import PageBreak from "./PageBreak";
import NavButton from "./NavButton";
import classNames from "classnames";
import { WebIcon } from "mendix";

type PerPagePaginationProps = {
    page: number;
    pageTotal: number;
    includeEnds: boolean;
    pageOffset: number;
    pageBreak: PageBreakEnum;
    buttonStyle: ButtonStyleEnum;
    tabIndex: number;
    setPage: (newPage: number) => void;
    groupDigits: boolean;
    /* Label customization */
    pageLabel: string;
    firstLabel: string;
    previousLabel: string;
    nextLabel: string;
    lastLabel: string;
    /* Icon set */
    pageBreakIcon: WebIcon | undefined;
    firstIcon: WebIcon;
    previousIcon: WebIcon;
    nextIcon: WebIcon;
    lastIcon: WebIcon;
};

const PerPagePagination = (props: PerPagePaginationProps): ReactElement => {
    const groupDigits = useCallback(
        /* eslint-disable */
        (newNumber: number): string =>
            props.groupDigits
                ? // @ts-ignore
                  mx.parser.formatValue(newNumber || 0, "integer", { groupDigits: true, decimalPrecision: 0 })
                : newNumber,
        /* eslint-enable */
        [props.groupDigits]
    );

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
                        onClick={() => props.setPage(i)}
                        disabled={false}
                        btnCaption={groupDigits(i)}
                        buttonStyle={props.buttonStyle}
                        tabIndex={props.tabIndex}
                    />
                );
            }
        }
        return returnButtons;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.page, props.pageTotal, minPage, maxPage, props.pageLabel]);

    return (
        <div className={classNames("per-page-pagination")}>
            {props.includeEnds && (
                <NavButton
                    key={`${props.previousLabel} ${props.pageLabel}`}
                    title={`${props.previousLabel} ${props.pageLabel}`}
                    onClick={() => {
                        if (props.page > 1) {
                            props.setPage(props.page - 1);
                        }
                    }}
                    disabled={props.page === 1}
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
                buttonStyle={props.buttonStyle}
                tabIndex={props.tabIndex}
            />
            {minPage > 2 && props.pageBreak !== "none" && (
                <PageBreak mode={props.pageBreak} customIcon={props.pageBreakIcon} />
            )}

            {pageNavigations}

            {maxPage < props.pageTotal - 1 && props.pageBreak !== "none" && (
                <PageBreak mode={props.pageBreak} customIcon={props.pageBreakIcon} />
            )}

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
                    buttonStyle={props.buttonStyle}
                    btnCaption={groupDigits(props.pageTotal)}
                    tabIndex={props.tabIndex}
                />
            )}

            {props.includeEnds && (
                <NavButton
                    key={`${props.nextLabel} ${props.pageLabel}`}
                    title={`${props.nextLabel} ${props.pageLabel}`}
                    onClick={() => {
                        if (props.page < props.pageTotal) {
                            props.setPage(props.page + 1);
                        }
                    }}
                    disabled={props.page === props.pageTotal}
                    buttonStyle={props.buttonStyle}
                    icon={props.nextIcon}
                    tabIndex={props.tabIndex}
                />
            )}
        </div>
    );
};

export default PerPagePagination;
