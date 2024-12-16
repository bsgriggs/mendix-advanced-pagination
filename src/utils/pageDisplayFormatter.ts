import { PageDisplayTypeEnum } from "../../typings/AdvancedPaginationProps";
import MxFormatter from "./MxFormatter";

const pageDisplayFormatter = (
    page: number,
    pageSize: number,
    resultCount: number,
    pageTotal: number,
    pageDisplayType: PageDisplayTypeEnum,
    groupDigits: boolean,
    pageLabel: string,
    toLabel: string,
    ofLabel: string,
    customPageDisplay: string
): string => {
    const offset = (page - 1) * pageSize;
    return pageDisplayType === "PAGES"
        ? `${pageLabel} ${MxFormatter(page, groupDigits)} ${ofLabel} ${MxFormatter(pageTotal, groupDigits)}`
        : pageDisplayType === "RECORDS"
        ? resultCount === 0
            ? `0 ${toLabel} 0 ${ofLabel} 0`
            : `${MxFormatter(offset + 1, groupDigits)} ${toLabel} ${MxFormatter(
                  page === pageTotal ? resultCount : offset + pageSize,
                  groupDigits
              )} ${ofLabel} ${MxFormatter(resultCount, groupDigits)}`
        : customPageDisplay;
};

export default pageDisplayFormatter;
