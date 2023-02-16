import { createElement, ReactElement } from "react";
import { ButtonStyleEnum, PageBreakEnum } from "../../typings/AdvancedPaginationProps";

type PageBreakProps = {
    mode: PageBreakEnum;
    buttonStyle: ButtonStyleEnum;
};

const PageBreak = (props: PageBreakProps): ReactElement => {
    switch (props.mode) {
        case "ellipses":
            return <span className={`text-${props.buttonStyle} glyphicon glyphicon-option-horizontal`} />;
        case "line":
            return (
                <span
                    className="mx-text"
                    style={{ borderLeft: "1px solid black", height: "1.5em", margin: "0 0.25em" }}
                />
            );
        case "space":
            return <span className="mx-text" style={{ margin: "0 0.25em" }} />;
    }
};

export default PageBreak;
