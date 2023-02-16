import { createElement, CSSProperties, ReactElement } from "react";
import {
    ButtonAlignmentEnum,
    ButtonStyleEnum,
    RenderModeEnum,
    ResultCountCaptionAlignmentEnum
} from "../../typings/AdvancedPaginationProps";
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
    includeEnds: boolean;

    setPage: (newPage: number) => void;
};

const NavigationPagination = (props: NavigationPaginationProps): ReactElement => {
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

    const NavigationPaginationContainer: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: `${justifyDirection()}`,
        flexWrap: "wrap",
        gap: "0.5em"
    };

    return (
        <div style={NavigationPaginationContainer}>
            {props.resultCountCaptionAlignment === "start" && (
                <span className="mx-text">{props.resultCountCaption}</span>
            )}
            {props.includeEnds && (
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
            )}
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
            {props.includeEnds && (
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
            )}

            {props.resultCountCaptionAlignment === "end" && <span className="mx-text">{props.resultCountCaption}</span>}
        </div>
    );
};

export default NavigationPagination;
