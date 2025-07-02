const MxFormatter = (newNumber: number, groupDigits: boolean, decimalPrecision = 0): string =>
    /* eslint-disable */
    groupDigits
        ? // @ts-ignore
          mx.parser.formatValue(newNumber || 0, "integer", { groupDigits: true, decimalPrecision })
        : (newNumber || 0).toString();
/* eslint-enable */

export default MxFormatter;
