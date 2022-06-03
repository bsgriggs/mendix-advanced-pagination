import { createElement, Fragment, MouseEvent } from "react";
import { ButtonStyleEnum, RenderModeEnum } from "../../typings/PaginationProps";

type NavButtonProps = {
    Title: string;
    onClick(): void;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;
    GlyphiconClass?: string;
    btnCaption?: string;
    active?: boolean;
};

const NavButton = (props: NavButtonProps): JSX.Element => {
    const defaultButtonClasses = `btn mx-button btn-${props.buttonStyle} btn-bordered`;

    function onClickHandler(event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) {
        props.onClick();
        // un-select the button after the event is triggered, but keep focus event styling for tab-ing through
        const button = event.target as HTMLButtonElement;
        button.blur();
    }

    switch (props.renderMode) {
        case "button":
            return (
                <button
                    className={props.active ? defaultButtonClasses + " active" : defaultButtonClasses}
                    title={props.Title}
                    aria-label={props.Title}
                    data-disabled="false"
                    data-dashlane-label="true"
                    data-form-type="action"
                    onClick={(event: MouseEvent<HTMLButtonElement>) => onClickHandler(event)}
                >
                    {props.GlyphiconClass !== undefined && (
                        <span className={"glyphicon " + props.GlyphiconClass}></span>
                    )}
                    {props.btnCaption !== undefined && <Fragment>{props.btnCaption}</Fragment>}
                </button>
            );
        case "link":
            return (
                <a
                    className={`mx-link btn-lg text-${props.buttonStyle}`}
                    title={props.Title}
                    aria-label={props.Title}
                    data-disabled="false"
                    data-dashlane-label="true"
                    data-form-type="action"
                    onClick={(event: MouseEvent<HTMLAnchorElement>) => onClickHandler(event)}
                >
                    {props.GlyphiconClass !== undefined && (
                        <span className={"glyphicon " + props.GlyphiconClass}></span>
                    )}
                    {props.btnCaption !== undefined && <Fragment>{props.btnCaption}</Fragment>}
                </a>
            );
    }
};

export default NavButton;
