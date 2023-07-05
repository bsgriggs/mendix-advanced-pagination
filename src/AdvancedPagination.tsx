import { createElement, ReactElement, useEffect } from "react";
import { ValueStatus } from "mendix";
import { AdvancedPaginationContainerProps } from "../typings/AdvancedPaginationProps";
import NavigationPagination from "./components/NavigationPagination";
import PerPagePagination from "./components/PerPagePagination";
import Big from "big.js";

import "./ui/AdvancedPagination.css";

const Pagination = ({
    autoCorrect,
    autoCorrectTo,
    buttonAlignment,
    buttonStyle,
    class: className,
    displayFormat,
    includeArrows,
    includeEnds,
    name,
    page,
    pageBreak,
    pageOffset,
    pageSize,
    renderMode,
    resultCount,
    resultCountCaptionAlignment,
    pageDisplay,
    refreshAction,
    resultCountCaption,
    style,
    tabIndex
}: AdvancedPaginationContainerProps): ReactElement => {
    const pageNumberValue = page.status === ValueStatus.Available ? Number(page.value) : 1;
    const pageSizeValue = pageSize.status === ValueStatus.Available ? Number(pageSize.value) : 10;
    const resultCountValue = resultCount.status === ValueStatus.Available ? Number(resultCount.value) : 0;
    const pageTotal = resultCountValue > 0 ? Math.ceil(resultCountValue / pageSizeValue) : 1;
    const resultCountCaptionValue =
        resultCountCaption && resultCountCaption.status === ValueStatus.Available && resultCountCaption.value
            ? resultCountCaption.value
            : resultCountValue === 1
            ? "1 result"
            : resultCountValue + " results";
    const pageDisplayValue =
        pageDisplay && pageDisplay.status === ValueStatus.Available && pageDisplay.value
            ? pageDisplay.value
            : `Page ${pageNumberValue} of ${pageTotal}`;
    const pageOffsetValue =
        pageOffset.status === ValueStatus.Available && pageOffset.value ? Number(pageOffset.value) : 1;

    if (autoCorrect) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (pageNumberValue > pageTotal || pageNumberValue < 1) {
                if (autoCorrectTo === "FIRST") {
                    setPage(1);
                } else {
                    setPage(pageTotal);
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [pageNumberValue, pageTotal]);
    }

    const setPage = (newPage: number): void => {
        page.setValue(Big(newPage));
        refreshAction?.execute();
    };

    return (
        <div id={name} className={className ? "widget-pagination " + className : "widget-pagination"} style={style}>
            {resultCountValue > 0 && displayFormat === "navigation" && (
                <NavigationPagination
                    name={name}
                    page={pageNumberValue}
                    pageTotal={pageTotal}
                    buttonAlignment={buttonAlignment}
                    resultCountCaption={resultCountCaptionValue}
                    resultCountCaptionAlignment={resultCountCaptionAlignment}
                    pageDisplay={pageDisplayValue}
                    setPage={setPage}
                    renderMode={renderMode}
                    buttonStyle={buttonStyle}
                    includeEnds={includeEnds}
                    tabIndex={tabIndex}
                />
            )}
            {resultCountValue > 0 && displayFormat === "perPage" && (
                <PerPagePagination
                    name={name}
                    page={pageNumberValue}
                    pageTotal={pageTotal}
                    buttonAlignment={buttonAlignment}
                    resultCountCaption={resultCountCaptionValue}
                    resultCountCaptionAlignment={resultCountCaptionAlignment}
                    includeArrows={includeArrows}
                    pageOffset={pageOffsetValue}
                    pageBreak={pageBreak}
                    setPage={setPage}
                    renderMode={renderMode}
                    buttonStyle={buttonStyle}
                    tabIndex={tabIndex}
                />
            )}
        </div>
    );
};

export default Pagination;
