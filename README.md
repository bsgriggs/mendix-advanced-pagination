<!-- prettier-ignore-start -->
## Advanced Pagination
A reusable widget to encapsulate the math required to manually do server-side pagination. It's useful for the following scenarios:
1. Getting data from an API (e.g. an OData API - https://facebook.com/feed?$top=2$skip=18).
2. Building a list view, template grid, or gallery that resembles a data grid with custom search criteria and/or aggregates that change with the search criteria.

Tip: Need sorting too? Check out Advanced Sorting. (<a href='https://github.com/bsgriggs/mendix-advanced-sorting' target="_blank">GitHub</a>) (<a href='https://marketplace.mendix.com/link/component/202511' target="_blank">Mendix Marketplace</a>)  
Need row selection too? Check out Listview Selection. (<a href='https://github.com/bsgriggs/mendix-listview-selection' target="_blank">GitHub</a>) (<a href='https://marketplace.mendix.com/link/component/212384' target="_blank">Mendix Marketplace</a>)

![Overview](https://github.com/bsgriggs/pagination/blob/media_v2/demo.png)

## Features
- Offers 2 *styles* of pagination. Navigation (first 2 above) and Per Page (last 2 above)
- Ability to configure most aspects inside the widget settings (text, color, alignment etc.)
- Accepts Page and Result Count from a parent Data View and calculates the rest for you 
- Uses default Mendix classes to easily copy brand-specific styles (e.g. mx-text, btn-primary)
- Automatically correct the current page number if it is outside the range
- Set the page size with either an expression, a text box, or a dropdown

## Limitations
- Data source must return an integer of the total number of records available (needed to calculate the total number of pages)

## Usage
The following steps will create a list view with server-side pagination that looks like the image below.  
![demoBrowser](https://github.com/bsgriggs/pagination/blob/media_v2/demoBrowser.png)  
### Create the Pagination Module
I usually make a separate, small module for some of the core functionality. This serves 2 purposes:
1. The module can easily be exported and imported into other projects
2. The core logic is stored in a common place if you need to make multiple Custom Grids in your app

Follow these steps to make the Pagination Module:
1. Download the latest version of the [Nanoflow Commons](https://marketplace.mendix.com/link/component/109515) module
2. Right-click on your app name in Studio Pro, click 'Add module ...', and name the module "Pagination"
3. In the domain model, create a non-persistent entity called **Pagination** with Page (default to 1), PageSize, and ResultTotal.  
![pagination entity](https://github.com/bsgriggs/pagination/blob/media_v2/pagination/paginationEntity.png)  
_Note: The SortAscending and SortAttribute are not used for this example, but you'll need them if you want to use the Advanced Sorting widget. (<a href='https://github.com/bsgriggs/mendix-advanced-sorting' target="_blank">GitHub</a>) (<a href='https://marketplace.mendix.com/link/component/202511' target="_blank">Mendix Marketplace</a>)_
4. Create a Nanoflow called **ACT_Pagination_Refresh** with a Pagination parameter. Add a refresh object activity from the Nanoflow Commons module.  
![ACT Pagination_Refresh](https://github.com/bsgriggs/pagination/blob/media_v2/pagination/ACT_Pagination_Refresh.png)
5. Create a Nanoflow called **ACT_Pagination_Search** with a Pagination parameter. Add a change object activity and set the Page attribute to 1. Then call the **ACT_Pagination_Refresh** Nanoflow.  
![ACT Pagination_Refresh](https://github.com/bsgriggs/pagination/blob/media_v2/pagination/ACT_Pagination_Search.png)
6. Create a module role called User and grant that module role full access to the Pagination entity and the Microflows from steps 3 and 4.  
7. In your project security settings, grant all user roles the Pagination module's User user role.  

_What are the two Nanoflows for? ~ ACT_Pagination_Refresh should be used when you just want to refresh the results (e.g. changing pages or sorting). ACT_Pagination_Search should be used when the user may have changed the search criteria (e.g. on-change action for a text box or a search button)_

### Main Domain Model
Inside the domain model of the entity you need to retrieve, create a non-persistent entity **specific** to your grid. I usually put this right next to the entity it retrieves in the domain model  
- I use the format Search{ReturnedEntity} (e.g. if my grid is going to return Employee objects, I would name it SearchEmployees). _For the rest of the documentation, this entity will be referred to as **Search{Entity}**_  
- Set **Search{Entity}** to generalize Pagination  
- Add an association to **System.Session**.  
- Add attributes and associations for any search criteria you want. For me, FuzzySearch is for the text input and the associations are for multi-select popups I want to display.  
![searchEmployees](https://github.com/bsgriggs/pagination/blob/media_v2/searchEmployees.png)

### Page and Widget Setup
1. Create a Microflow called **DS_Search{Entity}** that retrieves the list from **$currentSession** for an existing **Search{Entity}** object. If the list is not empty, head the list and return the object. Otherwise, create a new object with the association to System.Session as $currentSession and PageSize as whatever default page size you want.  
![DS_SearchEmployees](https://github.com/bsgriggs/pagination/blob/media_v2/DS_SearchEmployees.png)  
2. Wrap your list view with a data view that calls **DS_Search{Entity}**. Add input widgets for your search criteria and the Advanced Pagination widget where you would like the buttons.  
![page_mendix](https://github.com/bsgriggs/pagination/blob/media_v2/demoMendix.png)  
3. In the Advanced Pagination widget(s), set the Page, Result Count, Page Size, and the refresh action as the following:  
![required configuration](https://github.com/bsgriggs/pagination/blob/media_v2/general.png)  
4. In your listview's data source Microflow, you can calculate the Offset and Amount/Limit using the Pagination object. In my example, I'm using a custom retrieve from database action, but you could use the same expressions for your retrieve or API call.  
![calcLimitOffset](https://github.com/bsgriggs/pagination/blob/media_v2/calcLimitOffset.png)  
5. Also in your listview's data source Microflow, set the Pagination's ResultTotal attribute as the total count of objects.  
a. For standard database retrieves, it should be from a second database retrieve that has range set to all. Directly after the second retrieve, add an Aggregate List action set to Count.  
![calcResultTotal](https://github.com/bsgriggs/pagination/blob/media_v2/calcResultTotal.png)  
b. For API Calls, you will need to get this number from the API itself. ResultTotal should be the total number of records that match the search criteria without the limit or offset.  
6. Run the project and see how the widget looks.

### Auto Correct
![required configuration](https://github.com/bsgriggs/pagination/blob/media_v2/general.png)  
When enabled, the widget will update the page number if it is outside the range of valid pages. It can set the page to either the first or last page.  

This is helpful when the user to looking at data that is changing. For example, think of a page listing Orders in the open status. User1 is looking at the last page while User2 is changing the status of the Orders to closed. User1's current page would become invalid on a refresh if too many Orders changed status (i.e. Page 4 of 3).  

By default, this setting is enabled and set to the first page. You should only have 1 advanced pagination widget per page with this setting enabled to avoid extra refreshes.  

## Customization Settings
See the documentation [here](https://github.com/bsgriggs/mendix-advanced-pagination/blob/master/docs/Customization.md) to learn how each setting in the Customization, Text, and Buttons tabs changes the widget.

## Demo project
https://widgettesting105-sandbox.mxapps.io/p/advanced-listview-controls

## Issues, suggestions, and feature requests
Got any ideas for different *styles* of pagination? Submit an issue below!  
https://github.com/bsgriggs/mendix-advanced-pagination/issues

## Development and contribution
Benjamin Griggs
<!-- prettier-ignore-end -->
