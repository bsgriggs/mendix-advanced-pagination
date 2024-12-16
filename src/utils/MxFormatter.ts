const MxFormatter = (newNumber: number, groupDigits: boolean): string =>
    /* eslint-disable */
    groupDigits
        ? // @ts-ignore
          mx.parser.formatValue(newNumber || 0, "integer", { groupDigits: true, decimalPrecision: 0 })
        : newNumber;
/* eslint-enable */

export default MxFormatter;
