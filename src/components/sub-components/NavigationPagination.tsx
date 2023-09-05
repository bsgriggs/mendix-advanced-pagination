import { createElement, ReactElement } from "react";
import { ButtonStyleEnum } from "../../../typings/AdvancedPaginationProps";
import NavButton from "./NavButton";
import classNames from "classnames";
import { WebIcon } from "mendix";

type NavigationPaginationProps = {
    page: number;
    pageTotal: number;
    pageDisplay: string;
    buttonStyle: ButtonStyleEnum;
    includeEnds: boolean;
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

const NavigationPagination = (props: NavigationPaginationProps): ReactElement => {
    return (
        <div className={classNames("navigation-pagination")}>
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
            <span className="mx-text">{props.pageDisplay}</span>
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

export default NavigationPagination;
