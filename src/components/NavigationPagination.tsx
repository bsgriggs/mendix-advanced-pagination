import { createElement } from "react";
import { ButtonAlignmentEnum, ResultCountCaptionAlignmentEnum } from "../../typings/PaginationProps";
import styled from "@emotion/styled";

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
    console.log("NavigationPaginationProps", props);

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

    console.log("justifyDirection", justifyDirection());

    const NavigationPaginationContainer = styled.div`
        display: flex;
        align-items: center;
        justify-content: ${justifyDirection()};
        gap: 0.5em;
    `;

    console.log("NavigationPaginationContainer", NavigationPaginationContainer);
    return (
        <NavigationPaginationContainer>
            {props.resultCountCaptionAlignment === "start" && (
                <span className="mx-text">{props.resultCountCaption}</span>
            )}
            <button
                className="btn mx-button glyphicon glyphicon-step-backward"
                title="First Page"
                aria-label="First Page"
                data-disabled="false"
                data-dashlane-label="true"
                data-form-type="other"
                onClick={() => {
                    if (props.page > 1) {
                        console.log("first page");
                        props.setPage(1);
                    }
                }}
            ></button>
            <button
                className="btn mx-button glyphicon glyphicon-triangle-left"
                title="Previous Page"
                aria-label="Previous Page"
                data-disabled="false"
                data-dashlane-label="true"
                data-form-type="other"
                onClick={() => {
                    if (props.page > 1) {
                        console.log("previous page");
                        props.setPage(props.page - 1);
                    }
                }}
            ></button>
            <span className="mx-text">{props.pageDisplay}</span>
            <button
                className="btn mx-button glyphicon glyphicon-triangle-right"
                title="Next Page"
                aria-label="Next Page"
                data-disabled="false"
                data-dashlane-label="true"
                data-form-type="action,next"
                onClick={() => {
                    if (props.page < props.pageTotal) {
                        console.log("next page");
                        props.setPage(props.page + 1);
                    }
                }}
            ></button>
            <button
                className="btn mx-button glyphicon glyphicon-step-forward"
                title="Last Page"
                aria-label="Last Page"
                data-disabled="false"
                data-dashlane-label="true"
                data-form-type="other"
                onClick={() => {
                    if (props.page < props.pageTotal) {
                        console.log("last page");
                        props.setPage(props.pageTotal);
                    }
                }}
            ></button>
            {props.resultCountCaptionAlignment === "end" && <span className="mx-text">{props.resultCountCaption}</span>}
        </NavigationPaginationContainer>
    );
};

export default NavigationPagination;
