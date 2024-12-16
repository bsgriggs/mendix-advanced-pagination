import { WebIcon } from "mendix";
import { createElement, ReactElement, useMemo } from "react";
import NavButton from "./NavButton";
import { ButtonStyleEnum, PageDisplayTypeEnum } from "../../../typings/AdvancedPaginationProps";
import pageDisplayFormatter from "../../utils/pageDisplayFormatter";

interface DropdownPaginationProps {
    name: string;
    page: number;
    pageSize: number;
    resultCount: number;
    pageTotal: number;
    pageDisplayType: PageDisplayTypeEnum;
    buttonStyle: ButtonStyleEnum;
    includeEnds: boolean;
    tabIndex: number;
    setPage: (newPage: number) => void;
    /* Label customization */
    groupDigits: boolean;
    pageLabel: string;
    ofLabel: string;
    toLabel: string;
    firstLabel: string;
    previousLabel: string;
    nextLabel: string;
    lastLabel: string;
    /* Icon set */
    firstIcon: WebIcon;
    previousIcon: WebIcon;
    nextIcon: WebIcon;
    lastIcon: WebIcon;
}

const DropdownPagination = (props: DropdownPaginationProps): ReactElement => {
    const options = useMemo(() => {
        const newOptions = [];
        for (let i = 1; i <= props.pageTotal; i++) {
            newOptions.push(
                <option key={i} value={i}>
                    {pageDisplayFormatter(
                        i,
                        props.pageSize,
                        props.resultCount,
                        props.pageTotal,
                        props.pageDisplayType,
                        props.groupDigits,
                        props.pageLabel,
                        props.toLabel,
                        props.ofLabel,
                        ""
                    )}
                </option>
            );
        }
        return newOptions;
    }, [
        props.pageTotal,
        props.pageSize,
        props.resultCount,
        props.pageDisplayType,
        props.groupDigits,
        props.pageLabel,
        props.toLabel,
        props.ofLabel
    ]);

    return (
        <div className="dropdown-pagination">
            {props.includeEnds && (
                <NavButton
                    title={`${props.firstLabel} ${props.pageLabel}`}
                    onClick={() => {
                        if (props.page > 1) {
                            props.setPage(1);
                        }
                    }}
                    disabled={props.page === 1}
                    buttonStyle={props.buttonStyle}
                    icon={props.firstIcon}
                    tabIndex={props.tabIndex}
                />
            )}
            <NavButton
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
            <select
                id={props.name}
                className="form-control"
                tabIndex={props.tabIndex}
                value={props.page}
                onChange={event => {
                    props.setPage(Number(event.target.value));
                }}
            >
                {...options}
            </select>
            <NavButton
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
            {props.includeEnds && (
                <NavButton
                    title={`${props.lastLabel} ${props.pageLabel}`}
                    onClick={() => {
                        if (props.page < props.pageTotal) {
                            props.setPage(props.pageTotal);
                        }
                    }}
                    disabled={props.page === props.pageTotal}
                    buttonStyle={props.buttonStyle}
                    icon={props.lastIcon}
                    tabIndex={props.tabIndex}
                />
            )}
        </div>
    );
};

export default DropdownPagination;
