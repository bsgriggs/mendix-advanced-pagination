import { createElement, ReactElement, Fragment } from "react";

type PageSizeTextboxProps = {
    tabIndex: number;
    pageSize: number;
    setPageSize: (newPageSize: number) => void;
    pageSizeLabel: string;
    showPageSizeLabel: boolean;
};

const PageSizeTextbox = (props: PageSizeTextboxProps): ReactElement => {
    return (
        <Fragment>
            {props.showPageSizeLabel && <span className="mx-text">{props.pageSizeLabel}</span>}

            <div>
                <input
                    className="form-control"
                    title={props.pageSizeLabel}
                    aria-label={props.pageSizeLabel}
                    type="number"
                    tabIndex={props.tabIndex}
                    value={props.pageSize}
                    onChange={event => props.setPageSize(Number(event.target.value))}
                />
            </div>
        </Fragment>
    );
};

export default PageSizeTextbox;
