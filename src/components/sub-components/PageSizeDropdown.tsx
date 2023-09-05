import { createElement, ReactElement, useMemo, Fragment } from "react";
import { PageSizesType } from "../../../typings/AdvancedPaginationProps";

type PageSizeDropdownProps = {
    tabIndex: number;
    pageSizes: PageSizesType[];
    pageSize: number;
    setPageSize: (newPageSize: number) => void;
    pageSizeLabel: string;
    showPageSizeLabel: boolean;
};

const PageSizeDropdown = (props: PageSizeDropdownProps): ReactElement => {
    const validPageSize = useMemo(
        () => props.pageSizes.find(pageSize => pageSize.value === props.pageSize),
        [props.pageSize]
    );
    return (
        <Fragment>
            {props.showPageSizeLabel && <span className="mx-text">{props.pageSizeLabel}</span>}

            <div>
                <select
                    className="form-control"
                    tabIndex={props.tabIndex}
                    value={props.pageSize}
                    onChange={event => props.setPageSize(Number(event.target.value))}
                    aria-label={props.pageSizeLabel}
                    title={props.pageSizeLabel}
                >
                    {!validPageSize && (
                        <option key={props.pageSize} value={props.pageSize}>
                            {props.pageSize}
                        </option>
                    )}
                    {props.pageSizes.map(pageSize => (
                        <option key={pageSize.value} value={pageSize.value}>
                            {pageSize.value}
                        </option>
                    ))}
                </select>
            </div>
        </Fragment>
    );
};

export default PageSizeDropdown;
