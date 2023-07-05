import { createElement, CSSProperties, ReactElement } from "react";
import {
    ButtonAlignmentEnum,
    ButtonStyleEnum,
    RenderModeEnum,
    ResultCountCaptionAlignmentEnum
} from "../../typings/AdvancedPaginationProps";
import NavButton from "./NavButton";

type NavigationPaginationProps = {
    name: string;
    page: number;
    pageTotal: number;
    buttonAlignment: ButtonAlignmentEnum;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    resultCountCaption: string;
    pageDisplay: string;
    renderMode: RenderModeEnum;
    buttonStyle: ButtonStyleEnum;
    includeEnds: boolean;
    tabIndex?: number;
    setPage: (newPage: number) => void;
};

const NavigationPagination = ({
    name,
    buttonAlignment,
    buttonStyle,
    includeEnds,
    page,
    pageDisplay,
    pageTotal,
    renderMode,
    resultCountCaption,
    resultCountCaptionAlignment,
    setPage,
    tabIndex
}: NavigationPaginationProps): ReactElement => {
    const justifyDirection = (): string => {
        switch (buttonAlignment) {
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
            {resultCountCaptionAlignment === "start" && <span className="mx-text">{resultCountCaption}</span>}
            {includeEnds && (
                <NavButton
                    name={name}
                    title="First Page"
                    onClick={() => {
                        if (page > 1) {
                            setPage(1);
                        }
                    }}
                    renderMode={renderMode}
                    buttonStyle={buttonStyle}
                    GlyphiconClass="glyphicon-step-backward"
                    tabIndex={tabIndex}
                />
            )}
            <NavButton
                name={name}
                title="Previous Page"
                onClick={() => {
                    if (page > 1) {
                        setPage(page - 1);
                    }
                }}
                renderMode={renderMode}
                buttonStyle={buttonStyle}
                GlyphiconClass="glyphicon-triangle-left"
                tabIndex={tabIndex}
            />
            <span className="mx-text">{pageDisplay}</span>
            <NavButton
                name={name}
                title="Next Page"
                onClick={() => {
                    if (page < pageTotal) {
                        setPage(page + 1);
                    }
                }}
                renderMode={renderMode}
                buttonStyle={buttonStyle}
                GlyphiconClass="glyphicon-triangle-right"
                tabIndex={tabIndex}
            />
            {includeEnds && (
                <NavButton
                    name={name}
                    title="Last Page"
                    onClick={() => {
                        if (page < pageTotal) {
                            setPage(pageTotal);
                        }
                    }}
                    renderMode={renderMode}
                    buttonStyle={buttonStyle}
                    GlyphiconClass="glyphicon-step-forward"
                    tabIndex={tabIndex}
                />
            )}

            {resultCountCaptionAlignment === "end" && <span className="mx-text">{resultCountCaption}</span>}
        </div>
    );
};

export default NavigationPagination;
