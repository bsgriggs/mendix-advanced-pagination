import { createElement, ReactElement, useMemo } from "react";
import { PageSizesType } from "../../../typings/AdvancedPaginationProps";

type PageSizeDropdownProps = {
    tabIndex: number;
    pageSizes: PageSizesType[];
    pageSize: number;
    setPageSize: (newPageSize: number) => void;
    pageSizeLabel: string;
};

const PageSizeDropdown = (props: PageSizeDropdownProps): ReactElement => {
    const validPageSize = useMemo(
        () => props.pageSizes.find(pageSize => pageSize.value === props.pageSize),
        [props.pageSize]
    );
    return (
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
    );
};

export default PageSizeDropdown;
