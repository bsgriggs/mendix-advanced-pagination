import { createElement } from "react";
import { ButtonAlignmentEnum, ResultCountCaptionAlignmentEnum } from "../../typings/PaginationProps";
import { style } from "typestyle";

export type NavigationPaginationProps = {
    page: number;
    pageTotal: number;
    buttonAlignment: ButtonAlignmentEnum;
    resultCountCaptionAlignment: ResultCountCaptionAlignmentEnum;
    resultCountCaption: string;
    pageDisplay: string;

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
        gap: "0.5em"
    });

    return (
        <div className={NavigationPaginationContainer}>
            {props.resultCountCaptionAlignment === "start" && (
                <span className="mx-text">{props.resultCountCaption}</span>
            )}
            <button
                className="btn mx-button"
                title="First Page"
                aria-label="First Page"
                data-disabled="false"
                data-dashlane-label="true"
                data-form-type="other"
                onClick={() => {
                    if (props.page > 1) {
                        props.setPage(1);
                    }
                }}
            >
                <span className="glyphicon glyphicon-step-backward"></span>
            </button>
            <button
                className="btn mx-button"
                title="Previous Page"
                aria-label="Previous Page"
                data-disabled="false"
                data-dashlane-label="true"
                data-form-type="other"
                onClick={() => {
                    if (props.page > 1) {
                        props.setPage(props.page - 1);
                    }
                }}
            >
                <span className="glyphicon glyphicon-triangle-left"></span>
            </button>
            <span className="mx-text">{props.pageDisplay}</span>
            <button
                className="btn mx-button"
                title="Next Page"
                aria-label="Next Page"
                data-disabled="false"
                data-dashlane-label="true"
                data-form-type="action,next"
                onClick={() => {
                    if (props.page < props.pageTotal) {
                        props.setPage(props.page + 1);
                    }
                }}
            >
                <span className="glyphicon glyphicon-triangle-right"></span>
            </button>
            <button
                className="btn mx-button"
                title="Last Page"
                aria-label="Last Page"
                data-disabled="false"
                data-dashlane-label="true"
                data-form-type="other"
                onClick={() => {
                    if (props.page < props.pageTotal) {
                        props.setPage(props.pageTotal);
                    }
                }}
            >
                <span className="glyphicon glyphicon-step-forward"></span>
            </button>
            {props.resultCountCaptionAlignment === "end" && <span className="mx-text">{props.resultCountCaption}</span>}
        </div>
    );
};

export default NavigationPagination;
