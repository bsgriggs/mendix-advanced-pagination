import { createElement, Fragment, MouseEvent, ReactElement } from "react";
import { ButtonStyleEnum, RenderModeEnum } from "../../typings/AdvancedPaginationProps";

type NavButtonProps = {
    name: string;
    title: string;
    onClick(): void;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;
    GlyphiconClass?: string;
    btnCaption?: string;
    active?: boolean;
    tabIndex?: number;
};

const NavButton = ({
    name,
    title,
    buttonStyle,
    onClick,
    renderMode,
    tabIndex,
    GlyphiconClass,
    active,
    btnCaption
}: NavButtonProps): ReactElement => {
    function onClickHandler(event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>): void {
        if (event.clientX !== 0 && event.clientY !== 0) {
            // triggered by click (instead of enter key press)
            const button = event.target as HTMLButtonElement;
            button.blur();
        }
        onClick();
    }

    return renderMode === "button" ? (
        <button
            id={name + "_" + title.replaceAll(" ", "_")}
            className={`btn mx-button btn-${buttonStyle}${active ? " active" : " btn-bordered"}`}
            title={title}
            aria-label={title}
            data-disabled="false"
            data-dashlane-label="true"
            data-form-type="action"
            onClick={onClickHandler}
            tabIndex={tabIndex}
        >
            {GlyphiconClass !== undefined && <span className={"glyphicon " + GlyphiconClass}></span>}
            {btnCaption !== undefined && <Fragment>{btnCaption}</Fragment>}
        </button>
    ) : (
        <a
            id={name + "_" + title.replaceAll(" ", "_")}
            className={`mx-link btn-lg text-${buttonStyle}${active ? " active" : ""}`}
            title={title}
            aria-label={title}
            data-disabled="false"
            data-dashlane-label="true"
            data-form-type="action"
            onClick={onClickHandler}
            onKeyDown={event => {
                if (event.key === "Enter") {
                    onClick();
                }
            }}
            tabIndex={tabIndex}
        >
            {GlyphiconClass !== undefined && <span className={"glyphicon " + GlyphiconClass}></span>}
            {btnCaption !== undefined && <Fragment>{btnCaption}</Fragment>}
        </a>
    );
};

export default NavButton;
