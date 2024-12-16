import { AdvancedPaginationPreviewProps } from "../typings/AdvancedPaginationProps";
import { hidePropertiesIn } from "@mendix/pluggable-widgets-tools";
export type Platform = "web" | "desktop";

export type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type BaseProps = {
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
};

type ImageProps = BaseProps & {
    type: "Image";
    document?: string; // svg image
    data?: string; // base64 image
    property?: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null; // widget image property object from Values API
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
};

type ContainerProps = BaseProps & {
    type: "Container" | "RowLayout";
    children: PreviewProps[]; // any other preview element
    borders?: boolean; // sets borders around the layout to visually group its children
    borderRadius?: number; // integer. Can be used to create rounded borders
    backgroundColor?: string; // HTML color, formatted #RRGGBB
    borderWidth?: number; // sets the border width
    padding?: number; // integer. adds padding around the container
};

type RowLayoutProps = ContainerProps & {
    type: "RowLayout";
    columnSize?: "fixed" | "grow"; // default is fixed
};

type TextProps = BaseProps & {
    type: "Text";
    content: string; // text that should be shown
    fontSize?: number; // sets the font size
    fontColor?: string; // HTML color, formatted #RRGGBB
    bold?: boolean;
    italic?: boolean;
};

type DropZoneProps = BaseProps & {
    type: "DropZone";
    placeholder?: string;
    property: object; // widgets property object from Values API
};

type SelectableProps = BaseProps & {
    type: "Selectable";
    object: object; // object property instance from the Value API
    child: PreviewProps; // any type of preview property to visualize the object instance
};

type DatasourceProps = BaseProps & {
    type: "Datasource";
    property: object | null; // datasource property object from Values API
    child?: PreviewProps; // any type of preview property component (optional)
};

export type PreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;

export function getProperties(_values: AdvancedPaginationPreviewProps, defaultProperties: Properties): Properties {
    // Display Format
    switch (_values.displayFormat) {
        case "navigation":
            hidePropertiesIn(defaultProperties, _values, ["pageOffset", "pageBreak"]);
            break;
        case "perPage":
            hidePropertiesIn(defaultProperties, _values, [
                "pageDisplay",
                "pageDisplayType",
                "firstPageIcon",
                "lastPageIcon",
                "toLabel",
                "ofLabel"
            ]);
            break;
        case "dropdown":
            hidePropertiesIn(defaultProperties, _values, ["pageBreak", "pageOffset"]);
    }
    // Total Caption Alignment
    if (_values.resultCountCaptionAlignment === "hide") {
        hidePropertiesIn(defaultProperties, _values, ["resultCountCaption"]);
        if (_values.pageSizeType === "EXPRESSION") {
            hidePropertiesIn(defaultProperties, _values, ["showLineBreaks"]);
        }
    }

    if (!_values.autoCorrect) {
        hidePropertiesIn(defaultProperties, _values, ["autoCorrectTo"]);
    }

    if (!_values.includeEnds) {
        hidePropertiesIn(defaultProperties, _values, ["firstLabel", "firstPageIcon", "lastLabel", "lastPageIcon"]);
    }

    switch (_values.pageSizeType) {
        case "DROPDOWN":
            hidePropertiesIn(defaultProperties, _values, ["pageSize"]);
            break;
        case "EXPRESSION":
            hidePropertiesIn(defaultProperties, _values, [
                "pageSizes",
                "pageSizeAlignment",
                "pageSizeAttr",
                "pageSizeLabel",
                "showPageSizeLabel"
            ]);
            break;
        case "TEXT_BOX":
            hidePropertiesIn(defaultProperties, _values, ["pageSize", "pageSizes"]);
            break;
    }

    switch (_values.pageDisplayType) {
        case "PAGES":
            hidePropertiesIn(defaultProperties, _values, ["pageDisplay", "toLabel"]);
            break;
        case "RECORDS":
            hidePropertiesIn(defaultProperties, _values, ["pageDisplay"]);
            break;
        case "CUSTOM":
            hidePropertiesIn(defaultProperties, _values, ["ofLabel", "toLabel"]);
            break;
    }

    if (_values.displayFormat !== "perPage" || _values.pageBreak !== "ellipses") {
        hidePropertiesIn(defaultProperties, _values, ["pageBreakIcon"]);
    }

    return defaultProperties;
}

export function check(_values: AdvancedPaginationPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (_values.refreshAction === null) {
        errors.push({
            property: `refreshAction`,
            message: `Refresh action is required. Should Microflow with 'Refresh in Client' on the parent DataView's object`,
            url: "https://github.com/bsgriggs/pagination/blob/master/README.md"
        });
    }

    if (_values.pageSizeType === "DROPDOWN") {
        if (_values.pageSizes.length === 0) {
            errors.push({
                property: `pageSizes`,
                message: `At least 1 page size is required`,
                url: "https://github.com/bsgriggs/pagination/blob/master/README.md"
            });
        }
    }

    if (_values.displayFormat === "dropdown" && _values.pageDisplayType === "CUSTOM") {
        errors.push({
            property: `pageDisplayType`,
            message: `Page display type 'Custom' is not compatible with display format 'Dropdown'`,
            url: "https://github.com/bsgriggs/pagination/blob/master/README.md"
        });
    }

    return errors;
}

// export const getPreview = (_values: AdvancedPaginationPreviewProps, isDarkMode: boolean): PreviewProps => {
//     // const gridTitle = rowLayout({
//     //     columnSize: "fixed",
//     //     backgroundColor: palette.background.topbarData,
//     //     borders: true,
//     //     borderWidth: 1
//     // })(
//     //     container({
//     //         padding: 4
//     //     })(text({ fontColor: palette.text.data })("Data table"))

//     const resultCount: ContainerProps = {
//         type: "Container",
//         backgroundColor: isDarkMode ? "#252525" : "#FFFFFF",
//         children: [
//             {
//                 type: "Text",
//                 fontColor: isDarkMode ? "#579BF9" : "#146FF4",
//                 content: _values.resultCountCaption.trim() !== "" ? _values.resultCountCaption : "X results"
//             }
//         ]
//     };

//     const pageSize: ContainerProps = {
//         type: "RowLayout",
//         backgroundColor: isDarkMode ? "#252525" : "#FFFFFF",
//         borders: true,
//         borderWidth: 1,
//         borderRadius: 1,
//         children: [
//             {
//                 type: "RowLayout",
//                 padding: 4,
//                 columnSize: "grow",
//                 grow: 1,
//                 children: [
//                     {
//                         type: "Text",
//                         fontColor: isDarkMode ? "#579BF9" : "#146FF4",
//                         content: "Page Size X"
//                     }
//                 ]
//             }
//         ]
//     };

//     const pageDisplay: ContainerProps = {
//         type: "Container",
//         backgroundColor: isDarkMode ? "#252525" : "#FFFFFF",
//         children: [
//             {
//                 type: "Text",
//                 fontColor: isDarkMode ? "#579BF9" : "#146FF4",
//                 content:
//                     _values.pageDisplayType === "PAGES"
//                         ? "Page X of Y"
//                         : _values.pageDisplayType === "RECORDS"
//                         ? "X to Y of Z"
//                         : _values.pageDisplay
//             }
//         ]
//     };

//     const previousPageButton: ContainerProps = {
//         type: "Container",
//         backgroundColor: isDarkMode ? "#252525" : "#FFFFFF",
//         borders: true,
//         borderWidth: 1,
//         borderRadius: 1,
//         children: [
//             {
//                 type: "Text",
//                 fontColor: isDarkMode ? "#579BF9" : "#146FF4",
//                 content: "<"
//             }
//         ]
//     };
//     const nextPageButton: ContainerProps = {
//         type: "Container",
//         backgroundColor: isDarkMode ? "#252525" : "#FFFFFF",
//         borders: true,
//         borderWidth: 1,
//         borderRadius: 1,
//         children: [
//             {
//                 type: "Text",
//                 fontColor: isDarkMode ? "#579BF9" : "#146FF4",
//                 content: ">"
//             }
//         ]
//     };

//     if (_values.displayFormat === "navigation") {
//         return {
//             type: "Container",
//             children: [
//                 {
//                     type: "RowLayout",
//                     padding: 4,
//                     columnSize: "grow",
//                     grow: 1,
//                     children: [
//                         ...(_values.resultCountCaptionAlignment === "start" ? [resultCount] : []),
//                         ...(_values.pageSizeType !== "EXPRESSION" && _values.pageSizeAlignment === "START"
//                             ? [pageSize]
//                             : []),
//                         {
//                             type: "Text",
//                             fontColor: isDarkMode ? "#579BF9" : "#146FF4",
//                             content: "<<"
//                         },
//                         previousPageButton,
//                         pageDisplay,
//                         nextPageButton,
//                         {
//                             type: "Text",
//                             fontColor: isDarkMode ? "#579BF9" : "#146FF4",
//                             content: ">>"
//                         },
//                         ...(_values.pageSizeType !== "EXPRESSION" && _values.pageSizeAlignment === "END"
//                             ? [pageSize]
//                             : []),
//                         ...(_values.resultCountCaptionAlignment === "start" ? [resultCount] : [])
//                     ]
//                 }
//             ]
//         };
//     } else {
//         return {
//             type: "Container",
//             children: [
//                 {
//                     type: "RowLayout",
//                     columnSize: "grow",
//                     backgroundColor: isDarkMode ? "#252525" : "#FFFFFF",
//                     borders: true,
//                     borderWidth: 1,
//                     borderRadius: 1,
//                     children: [
//                         {
//                             type: "Container",
//                             padding: 4,
//                             grow: 0,
//                             children: [
//                                 {
//                                     type: "Text",
//                                     content: ""
//                                 }
//                             ]
//                         },
//                         {
//                             type: "RowLayout",
//                             padding: 4,
//                             columnSize: "grow",
//                             grow: 1,
//                             children: [
//                                 {
//                                     type: "Text",
//                                     fontColor: isDarkMode ? "#579BF9" : "#146FF4",
//                                     content: "<<"
//                                 },
//                                 {
//                                     type: "Text",
//                                     fontColor: isDarkMode ? "#579BF9" : "#146FF4",
//                                     content: "<"
//                                 },
//                                 {
//                                     type: "Text",
//                                     fontColor: isDarkMode ? "#579BF9" : "#146FF4",
//                                     content: ">"
//                                 },
//                                 {
//                                     type: "Text",
//                                     fontColor: isDarkMode ? "#579BF9" : "#146FF4",
//                                     content: ">>"
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         };
//     }
// };
