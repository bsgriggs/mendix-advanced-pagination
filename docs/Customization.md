## Advanced Pagination Customization
This section assumes you've already completed the Usage in the main ReadMe (https://github.com/bsgriggs/pagination/edit/master/README.md#usage). With the widget working, this section explains how each of the customization options affects the widget.  
  
_Tip: Want to reuse your customized settings across your app? Create a Mendix building block of the widget after you've made all your changes. I would recommend storing these building blocks in the Pagination Module for easier exporting and importing into other projects._

### General Tab
![general](https://github.com/bsgriggs/pagination/blob/media_v2/general.png)  
**Page size type** - Controls how the widget sources the page size number. Must be one of the following settings:
- Expression: Page size is an integer expression. This can be a static integer or a dynamic value based on other attribute(s).
- Text box: Page size is an integer attribute. The user is presented with an input with type="number" to set the page size to whatever they want.  
![pageSizeType_Textbox](https://github.com/bsgriggs/pagination/blob/media_v2/customization/pageSizeType_Textbox.png)  
- Dropdown: Page size is an integer attribute. A list is displayed where you enter each of the selectable page sizes. The user is presented with a standard select with the configured values.  
![pageSizeType_Dropdown](https://github.com/bsgriggs/pagination/blob/media_v2/customization/pageSizeType_Dropdown.png)

Each of the times looks like the following in the browser.  
![pageSizeType](https://github.com/bsgriggs/pagination/blob/media_v2/customization/pageSizeType.png)  

### Customization Tab
![customizationNavigation](https://github.com/bsgriggs/pagination/blob/media_v2/customization/customizationNavigation.png)  
**Format** - The main structure of the buttons. Each has its own sub-set of options in the Type section shown in the expandable sections below. The two types look like this by default:   
![format](https://github.com/bsgriggs/pagination/blob/media_v2/customization/format.png)  
**Include end buttons** - Show buttons to navigate to the first and last page.  
![includeEndButtons](https://github.com/bsgriggs/pagination/blob/media_v2/customization/includeEndButtons.png)  

<details>
<summary><h4>Navigation</h4></summary>

**Page display type** - Determines the format of the text in the middle of the buttons. Each part of the text can be customized in the Text tab (e.g. "Page" or "of"). If set to Custom, a text template appears for you to enter whatever you want.  
![pageDisplayType](https://github.com/bsgriggs/pagination/blob/media_v2/customization/pageDisplayType.png)  
 
</details>

<details>
<summary><h4>Per page</h4></summary>

![customizationPerPage](https://github.com/bsgriggs/pagination/blob/media_v2/customization/customizationPerPage.png)  

**Page offset** - The number of pages away from the current page to display in the list. Should be at least 1.  
![pageOffset_Middle](https://github.com/bsgriggs/pagination/blob/media_v2/customization/pageOffset_Middle.png)  

**Page break** - Determines what is displayed in any gaps in the pages. The Ellipses icon follows the color of the Button Style in the Buttons tab. The icon itself can also be customized in the Buttons tab.  
![pageBreak](https://github.com/bsgriggs/pagination/blob/media_v2/customization/pageBreak.png)  
 
</details>



### Text Tab
![text](https://github.com/bsgriggs/pagination/blob/media_v2/customization/text.png)  
This tab controls all text inside the widget. They are all text templates meaning they support multi-lingual apps.

### Buttons Tab
![buttons](https://github.com/bsgriggs/pagination/blob/media_v2/customization/buttons.png)  
**Render mode** - Either displays the pagination buttons as full buttons or just their icons  
![text](https://github.com/bsgriggs/pagination/blob/media_v2/customization/renderMode.png)  

**Button style** - Determines the brand styling used for the buttons. This is by the CSS class btn-{style} (e.g. Button Style "Primary" uses CSS class btn-primary).  
![buttonStyle](https://github.com/bsgriggs/pagination/blob/media_v2/customization/buttonStyle.png)  
_Note: the colors for these classes are in your custom-variables.scss file (ProjectRoot\theme\web\custom-variables.scss)_  

**Button alignment** - Determines how the widget's content is justified using flex-box.  
![buttonAlignment](https://github.com/bsgriggs/pagination/blob/media_v2/customization/buttonAlignment.png)  

**Icons** - Here you can select specific icons based on the settings in the Customization tab.  
![icons_Custom](https://github.com/bsgriggs/pagination/blob/media_v2/customization/icons_Custom.png)  

### Common Tab
![common](https://github.com/bsgriggs/pagination/blob/media_v2/customization/common.png)  
Displays the applicable standard Mendix properties
