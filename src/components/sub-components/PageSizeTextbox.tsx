import { createElement, ReactElement } from "react";

type PageSizeTextboxProps = {
    tabIndex: number;
    pageSize: number;
    setPageSize: (newPageSize: number) => void;
    pageSizeLabel: string;
};

const PageSizeTextbox = (props: PageSizeTextboxProps): ReactElement => {
    return (
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
    );
};

export default PageSizeTextbox;
