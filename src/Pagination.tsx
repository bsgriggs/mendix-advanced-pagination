import { createElement } from "react";
import { ValueStatus } from "mendix";
import { PaginationContainerProps } from "../typings/PaginationProps";
import Big from "big.js";

import "./ui/Pagination.css";

const Pagination = (props: PaginationContainerProps) => {
    const page =
        props.page.status === ValueStatus.Available && props.page.value ? parseFloat(props.page.value.toFixed(0)) : 1;
    const pageSize =
        props.pageSize.status === ValueStatus.Available && props.pageSize.value
            ? parseFloat(props.pageSize.value.toFixed(0))
            : 10;
    const resultCount =
        props.resultCount.status === ValueStatus.Available && props.resultCount.value
            ? parseFloat(props.resultCount.value.toFixed(0))
            : 0;
    const pageTotal = resultCount > 0 ? Math.ceil(resultCount / pageSize) : 1;
    const resultCountCaption =
        props.resultCountCaption.status === ValueStatus.Available
            ? props.resultCountCaption.value
            : resultCount === 1
            ? "1 result"
            : resultCount + " results";

    const setPage = (newPage: number) => {
        props.page.setValue(Big(newPage));
        props.refreshAction?.execute();
    };

    console.log("page", page);
    console.log("pageSize", pageSize);
    console.log("pageTotal", pageTotal);
    console.log("resultCount", resultCount);

    if (resultCount) {
        return (
            <div className={props.class ? "widget-pagination " + props.class : "widget-pagination"}>
                <div>{resultCountCaption}</div>
                <button
                    type="button"
                    className="btn mx-button"
                    title="First Page"
                    aria-label="First Page"
                    data-disabled="false"
                    data-dashlane-label="true"
                    data-form-type="other"
                    onClick={() => {
                        if (page > 1) {
                            console.log("first page");
                            setPage(1);
                        }
                    }}
                >
                    <span className="glyphicon glyphicon-step-backward" aria-hidden="true"></span>
                </button>
                <button
                    type="button"
                    className="btn mx-button"
                    title="Previous Page"
                    aria-label="Previous Page"
                    data-disabled="false"
                    data-dashlane-label="true"
                    data-form-type="other"
                    onClick={() => {
                        if (page > 1) {
                            console.log("previous page");
                            setPage(page - 1);
                        }
                    }}
                >
                    <span className="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
                </button>
                <div>
                    Page {page} of {pageTotal}
                </div>
                <button
                    type="button"
                    className="btn mx-button"
                    title="Next Page"
                    aria-label="Next Page"
                    data-disabled="false"
                    data-dashlane-label="true"
                    data-form-type="action,next"
                    onClick={() => {
                        if (page < pageTotal) {
                            console.log("next page");
                            setPage(page + 1);
                        }
                    }}
                >
                    <span className="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
                </button>
                <button
                    type="button"
                    className="btn mx-button"
                    title="Last Page"
                    aria-label="Last Page"
                    data-disabled="false"
                    data-dashlane-label="true"
                    data-form-type="other"
                    onClick={() => {
                        if (page < pageTotal) {
                            console.log("last page");
                            setPage(pageTotal);
                        }
                    }}
                >
                    <span className="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
                </button>
            </div>
        );
    } else {
        return <div className={props.class ? "widget-pagination " + props.class : "widget-pagination"}></div>;
    }
};

export default Pagination;
