import { createElement, Fragment, MouseEvent, ReactElement } from "react";
import { ButtonStyleEnum } from "../../../typings/AdvancedPaginationProps";
import classNames from "classnames";
import { Icon } from "mendix/components/web/Icon";
import { WebIcon } from "mendix";

type NavButtonProps = {
    title: string;
    onClick(): void;
    buttonStyle: ButtonStyleEnum;
    icon?: WebIcon;
    btnCaption?: string;
    active?: boolean;
    disabled: boolean;
    tabIndex: number;
};

const NavButton = (props: NavButtonProps): ReactElement => {
    function onClickHandler(event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>): void {
        if (event.clientX !== 0 && event.clientY !== 0) {
            // triggered by click (instead of enter key press)
            const button = event.target as HTMLButtonElement;
            button.blur();
        }
        props.onClick();
    }

    return (
        <button
            className={classNames(
                `btn mx-button btn-${props.buttonStyle} btn-bordered`,
                { active: props.active },
                { disabled: props.disabled }
            )}
            title={props.title}
            aria-label={props.title}
            data-disabled="false"
            // disabled={props.disabled}
            onClick={onClickHandler}
            tabIndex={props.tabIndex}
        >
            {props.icon !== undefined && <Icon icon={props.icon} />}
            {props.btnCaption !== undefined && <Fragment>{props.btnCaption}</Fragment>}
        </button>
    );
};

export default NavButton;
