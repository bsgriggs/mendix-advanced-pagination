import { AdvancedPaginationPreviewProps } from "../typings/AdvancedPaginationProps";
import { hidePropertiesIn } from "./utils/PageEditorUtils";

export type Properties = PropertyGroup[];

export type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

export type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export function getProperties(_values: AdvancedPaginationPreviewProps, defaultProperties: Properties): Properties {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    /* Example
    if (values.myProperty === "custom") {
        delete defaultProperties.properties.myOtherProperty;
    }
    */

    // Display Format
    switch (_values.displayFormat) {
        case "navigation":
            hidePropertiesIn(defaultProperties, _values, ["includeArrows", "pageOffset", "pageBreak"]);
            break;
        case "perPage":
            hidePropertiesIn(defaultProperties, _values, ["pageDisplay", "includeEnds"]);
            break;
    }
    // Total Caption Alignment
    if (_values.resultCountCaptionAlignment === "hide") {
        hidePropertiesIn(defaultProperties, _values, ["resultCountCaption"]);
    }

    if(!_values.autoCorrect){
        hidePropertiesIn(defaultProperties, _values, ["autoCorrectTo"]);
    }

    return defaultProperties;
}

export function check(_values: AdvancedPaginationPreviewProps): Problem[] {
    const errors: Problem[] = [];
    // Add errors to the above array to throw errors in Studio and Studio Pro.
    /* Example
    if (values.myProperty !== "custom") {
        errors.push({
            property: `myProperty`,
            message: `The value of 'myProperty' is different of 'custom'.`,
            url: "https://github.com/myrepo/mywidget"
        });
    }
    */
    if (_values.refreshAction === null) {
        errors.push({
            property: `refreshAction`,
            message: `Refresh action is required. Should Microflow with 'Refresh in Client' on the parent DataView's object`,
            url: "https://github.com/bsgriggs/pagination/blob/master/README.md"
        });
    }

    return errors;
}
