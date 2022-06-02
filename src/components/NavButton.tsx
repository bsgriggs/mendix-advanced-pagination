import React, { createElement } from "react";

type NavButtonProps = {
    Title: string;
    onClick(): void;
    GlyphiconClass?: string;
    btnCaption?: string;
    active?: boolean;
};

const defaultClasses = "btn mx-button btn-primary btn-bordered";

const NavButton = (props: NavButtonProps): JSX.Element => {
    return (
        <button
            className={props.active ? defaultClasses + " active" : defaultClasses}
            title={props.Title}
            aria-label={props.Title}
            data-disabled="false"
            data-dashlane-label="true"
            data-form-type="action"
            onClick={props.onClick}
        >
            {props.GlyphiconClass !== undefined && (
                <span className={"glyphicon " + props.GlyphiconClass}></span>
            )}
            {props.btnCaption !== undefined && <React.Fragment>{props.btnCaption}</React.Fragment>}
        </button>
    );
};

export default NavButton;
