# Mini Notes
#### Description:
Chrome extension, a simple notepad with basic editing options. 
The main goal is to have a functioning place to quickly store small amount of data. A simple note. Without any bloat or unnecessary options.

#### **Notes title bar**
Mini Notes can store multiple notes, generated dynamically, by pressing the “+” button. Each new “note” shows on the left panel and can be renamed by double-clicking the default name. Then the change is confirmed by switching focus of the element. As more notes are created, exceeding the main window, user can navigate through them by scrolling. By clicking on the “x” button next to the note title, the note will be permanently removed.

#### **Button bar**
To the right of notes list is a button panel, allowing user to add a new note, make selected text bold, italic or underline, or to add ordered or unordered list. Last button opens a new window in the browser with the settings options.

#### **Note text field**
Left panel is reserved for the actual note. It can by written manually or paste from clipboard scrubbed of any formatting from the source. There is no limit to the length of the note. When the text exceeds the window height, the block that stores the note becomes scrollable. Allowing for text of any size to be put in.

#### **Settings**
After pressing the button with the settings icon (the bottom one), settings menu is opened in a new browser window. There, user can change the font type from a few selected options, as well as the font size. By pressing the save button, the selection is saved and applied to the Notes text field.
There is also a reset button, designed for quick clean up of the application. It deletes everything stored by the application. Both settings and notes themselves.

#### **Technical aspects**

**index.html** defines the elements the user sees upon first opening the extension. Then upon making changes by editing settings or adding notes. The entire “page” is saved in localStorage as a string through Json stringify method. As we only store text, 5mb of allowed storage should be sufficient for most users.

**script.js** is responsible for the functioning part of the extension. Allowing user to add and edit notes. It is written in standard javascrip and also by utilizing the jquery library.

**style.css** is responsible for the visual aspect of extension, mainly the layout of the main window and style of the individual buttons. Here we take the minimalistic approach, as is the theme for the entire extension. 

Similar to the main part of the extension. The settings page is set up by options.html, options.js and optionsstyle.css. (To store the options chrome.storage is used.)

Main folder also contains two folders, One with necessary libraries (Bootstrap and jquery). The other with icons used for the buttons and main extension icon.