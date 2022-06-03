import { createElement } from "react";
import {
    ButtonAlignmentEnum,
    ButtonStyleEnum,
    RenderModeEnum,
    ResultCountCaptionAlignmentEnum
} from "../../typings/PaginationProps";
import { style } from "typestyle";
import NavButton from "./NavButton";

export type NavigationPaginationProps = {
    page: number;
    pageTotal: number;
    buttonAlignment: ButtonAlignmentEnum;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    resultCountCaption: string;
    pageDisplay: string;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;

    setPage: (newPage: number) => void;
};

const NavigationPagination = (props: NavigationPaginationProps) => {
    const justifyDirection = (): string => {
        switch (props.buttonAlignment) {
            case "start":
                return "flex-start";
            case "middle":
                return "center";
            case "end":
                return "flex-end";
            default:
                return "flex-start";
        }
    };

    const NavigationPaginationContainer = style({
        display: "flex",
        alignItems: "center",
        justifyContent: `${justifyDirection()}`,
        flexWrap: "wrap",
        gap: "0.5em"
    });

    return (
        <div className={NavigationPaginationContainer}>
            {props.resultCountCaptionAlignment === "start" && (
                <span className="mx-text">{props.resultCountCaption}</span>
            )}
            <NavButton
                Title="First Page"
                onClick={() => {
                    if (props.page > 1) {
                        props.setPage(1);
                    }
                }}
                renderMode={props.renderMode}
                buttonStyle={props.buttonStyle}
                GlyphiconClass="glyphicon-step-backward"
            />
            <NavButton
                Title="Previous Page"
                onClick={() => {
                    if (props.page > 1) {
                        props.setPage(props.page - 1);
                    }
                }}
                renderMode={props.renderMode}
                buttonStyle={props.buttonStyle}
                GlyphiconClass="glyphicon-triangle-left"
            />
            <span className="mx-text">{props.pageDisplay}</span>
            <NavButton
                Title="Next Page"
                onClick={() => {
                    if (props.page < props.pageTotal) {
                        props.setPage(props.page + 1);
                    }
                }}
                renderMode={props.renderMode}
                buttonStyle={props.buttonStyle}
                GlyphiconClass="glyphicon-triangle-right"
            />
            <NavButton
                Title="Last Page"
                onClick={() => {
                    if (props.page < props.pageTotal) {
                        props.setPage(props.pageTotal);
                    }
                }}
                renderMode={props.renderMode}
                buttonStyle={props.buttonStyle}
                GlyphiconClass="glyphicon-step-forward"
            />
            {props.resultCountCaptionAlignment === "end" && <span className="mx-text">{props.resultCountCaption}</span>}
        </div>
    );
};

export default NavigationPagination;
