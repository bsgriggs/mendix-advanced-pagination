import { createElement, ReactElement } from "react";
import { PageBreakEnum } from "../../../typings/AdvancedPaginationProps";
import { Icon } from "mendix/components/web/Icon";
import classNames from "classnames";
import { WebIcon } from "mendix";

type PageBreakProps = {
    customIcon?: WebIcon;
    mode: PageBreakEnum;
};

const PageBreak = (props: PageBreakProps): ReactElement =>
    props.mode === "ellipses" ? (
        <Icon icon={props.customIcon} />
    ) : (
        <span className={classNames("mx-text", `page-break-${props.mode}`)} />
    );
//     switch (props.mode) {
//         case "ellipses":
//             return ;
//         case "line":
//             return (
//                 <span
//                     className="mx-text"
//                     style={{ borderLeft: "1px solid black", height: "1.5em", margin: "0 0.25em" }}
//                 />
//             );
//         case "space":
//             return <span className="mx-text" style={{ margin: "0 0.25em" }} />;
//     }
// };

export default PageBreak;
