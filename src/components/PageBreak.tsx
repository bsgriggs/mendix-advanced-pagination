import { createElement, Fragment } from "react";
import {PageBreakEnum} from "../../typings/PaginationProps";

type PageBreakProps = {
    mode: PageBreakEnum;
}

const PageBreak = (props: PageBreakProps): JSX.Element =>{
    switch (props.mode) {
        case "ellipses":
            return <span className="mx-text" style={{color:"black"}}>...</span>;
        case "line":
            return <span className="mx-text" style={{borderLeft:"1px solid black", height:"1.5em", margin:"0 0.25em"}}/>;
        case "space":
            return <span className="mx-text" style={{margin:"0 0.25em"}}/>;
        case "none":
            return <Fragment/>;
    }
}

export default PageBreak;