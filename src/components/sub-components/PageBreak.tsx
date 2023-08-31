import { createElement, ReactElement } from "react";
import { PageBreakEnum } from "../../../typings/AdvancedPaginationProps";
import { Icon } from "mendix/components/web/Icon";

type PageBreakProps = {
    mode: PageBreakEnum;
};

const PageBreak = (props: PageBreakProps): ReactElement => {
    switch (props.mode) {
        case "ellipses":
            return <Icon icon={{ type: "glyph", iconClass: "glyphicon-option-horizontal" }} />;
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
