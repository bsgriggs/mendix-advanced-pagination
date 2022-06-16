## Advanced Pagination
Reusable widget to encapsulate the math required to manually do pagination. Most useful when getting data from an API that allows pagination (e.g. https://facebook.com/me/feed?limit=25&offset=50).

![Overview](https://github.com/bsgriggs/pagination/blob/media/Overview.png)

## Features
- Offers 2 *styles* of pagination. Navigation (first 2 above) and Per Page (last 2 above)
- Ability to configure most aspects inside the widget settings (text, color, alignment etc.)
- Accepts Page and Result Count from a parent Data View and calculates the rest for you 
- uses default mendix classes to easily copy brand specific styles (e.g. mx-text, btn-primary)

## Limitations
- Data source must return an integer of the total number of records available (needed to calculate the total number of pages)

## Usage
The following steps will create a *Custom Grid* that looks like the image below. Be aware that the text boxes are **not** required.
![page web](https://github.com/bsgriggs/pagination/blob/media/page_web.png)

1. Create a non-persistant entity called **Pagination** with Page, PageSize, and ResultTotal. Ideally this should be in it's own module for easier importing and exporting to new projects!<br/>![pagination entity](https://github.com/bsgriggs/pagination/blob/media/pagination_entity.png)
2. Create a non-persistant entity **specific** to your grid (i.e. AsyncListViewPagination), have it **inherit** Pagination and give it an association to **System.Session**<br/>![inheritance](https://github.com/bsgriggs/pagination/blob/media/inheritance.png)
3. Create a Microflow called **ACT_RefreshPagination** with a Pagination parameter, add a change object activity, and set the change object activity to refresh in client<br/>![ACT refresh pagination](https://github.com/bsgriggs/pagination/blob/media/ACT_RefreshPagination.png)
4. Create a Microflow called **DS_CreateRetrieve_{*SpecificEntityName*}** that will check the System.Session for an existing {*Specific Entity Name*} object. If an object is found, return it; otherwise create a new one *(don't forget to set the $currentSession in the Create Object activity)*<br/>![DS create retrieve specific entity](https://github.com/bsgriggs/pagination/blob/media/DS_Inheritance.png)
5. Setup your page similar to how you see below<br/>![page_mendix](https://github.com/bsgriggs/pagination/blob/media/page_mendix.png)
6. In the Advanced Pagination widgets, setup to Attributes tab using Page, PageSize, and ResultTotal.<br/>![configuration attributes](https://github.com/bsgriggs/pagination/blob/media/config_attributes.png)
7. In the Advanced Pagination widgets, setup the Refresh Action with **ACT_RefreshPagination**<br/>![refresh action](https://github.com/bsgriggs/pagination/blob/media/config_actions.png)
8. In your API call Microflow, calculate the Offset and Amount using the Pagination object. In my example, I'm using a retrieve from database action, but you should pass these as variables into your API call. <br/>![calculate offset](https://github.com/bsgriggs/pagination/blob/media/calculate_offset.png)
9. In your API Call Microflow, set the Pagination's ResultTotal attribute as the total count from the API Call. In my example, this is $Count from a database aggreate, but you would likely need to get this value from the API's return structure.<br/>![after API change object](https://github.com/bsgriggs/pagination/blob/media/afterapi_changeobject.png) 
10. Run the project and see what it looks like! Adjust the settings in the Advanced Pagination's general tab to your liking.

## Configuration Details
***For configuration outside of the widget (e.g. how to setup your project) change the [Usage](https://github.com/bsgriggs/pagination/edit/master/README.md#usage) section first.***<br/><br/>

### Settings on Both Modes
**Format -** Which *style* of pagination should be displayed in this location? In the overview image, the first 2 examples are the 'Navigation' style and the last 2 are the 'Per Page' style.<br/>
**Total Caption Allignment -** Where should the 'Total Caption' text be shown relative to the buttons?<br/>
**Total Caption -** Text that tells the user how many results exist. *(default '{ResultTotal} results')*.<br/>
**Button Allignment -** Where should the entire widget be displayed inside of it's parent's container?<br/>
**Render Mode -** Should the buttons contain padding and a border or only an icon?<br/>
**Button Style -** Which Mendix brand class should be applied (i.e. text-primary, btn-danger etc.)? These can be easily overridden with a css class (.widget-pagination .btn ...)<br/>

### Navigation Mode
![Navigation mode](https://github.com/bsgriggs/pagination/blob/media/config_navigation.png)<br/>
**Include End Buttons? -** Should the user be able to skip to the last page or back to the first page?<br/>
**Page Display -** Text shown in the middle of the buttons *(default 'Page {Page} of {PageTotal}')*.<br/>

### Per Page Mode 
![Per page mode](https://github.com/bsgriggs/pagination/blob/media/config_perpage.png)<br/>
**Include Arrows? -** Should the user be able to navigate between the page with arrows or only be able to click the specific numbers?<br/>
**Page Offset -** The Number of pages from the current page to display. For example, Page Offset is 1, Page is 5, and there are 10 pages, then the widget will show Pages 1, 4, 5, 6, 10.<br/><br/>It will include more pages at the beginning and the end of the range. For example, Page Offset is 1, Page is 1, and there are 10 pages, then it will show pages 1, 2, 3, 4, 10. This is because if the user *were* to go to page 3, then they would see pages 1, 2, 3, 4, 10 anyway. Likewise, when the user goes to page 10 they will see pages 1, 7, 8, 9, 10.<br/><br/>It will also check if the user would be displayed all possible pages should they click on any specific page and show all pages from the start. For example, Page Offset is 2 and there are 7 pages. The widget will show all pages 1 through 7, because if the user *were* to go to page 4 they would see all pages anyway.<br/>
**Page Break -** What whould be in between pages when there is a gap? For example, the widget is showing 1, 2, 3, 4, 10. What should be between 4 and 10?<br/>

## Demo project
[link to sandbox]

## Issues, suggestions and feature requests
Got any ideas for different *styles* of pagination? Submit an issue below!
https://github.com/bsgriggs/DropdownDatePicker/issues

## Development and contribution
Benjamin Griggs
