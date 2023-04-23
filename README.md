# API Reporting Tools

## By [SketchData](https://sketchdata.com/)

### Innergy reports for POs, etc. from standard API calls

## Deployment
- This javascript application can be deployed to a local folder on your computer or a shared folder on a file server
- Using the file server method can allow for easier deployment of changes and report groups for different departments

## Folder Structure
```
..\api         javascript file for each report to fetch data for each report
..\css         style sheet files to format the webpages
..\images      image files for icon and thumbnail on each reports
..\reports     javascript file for each report definition
..\scripts     script files to support the report designer and viewer
```

## Configuration
Configuration of the user INNERGY API key, default report to display on startup, list of reports for the user is set in config.js

## Sample config.js
```
// Enter your user API key from INNERGY below
const apiKey = 'o8uwqo90ofamm2i1yj14bea3fptrqx7dq6pf5r0a29ufk2sagklpcmqfr2ksqrcx7cjdcykoudci90s5ngps1qtng5=='

// Proxy to allow cross origin requests 
const corsProxy = 'https://innergyapi.sketchdata.com/';

// Default report on open
const defReport = "PurchaseOrderAll";

// Set theme css reference
let themePath = 'css/'
// Use innergy.css for an Innergy themed report style
const theme = themePath + 'sdreports.css';

// Report list for local user, apiKey will restrict data access
// format  "Report filename": "Report description on list"
var reportsCollection = {
    "PurchaseOrderAll": "Purchase Order",
    "MaterialLog": "Workorder Materials",
    "ActualCritical": "Actual Critical",
    "ScheduleWeek": "Production by Week",
    "Inventory": "Inventory Onhand"
};
```

## Obtain INNERGY API key
Navigate to your User Account details page in INNERGY, select API section, click COPY TO CLIPBOARD next to ApiKey

## Theme Configuration
Set a custom theme by editing the 'theme' variable in the config.js file. New themes can be added to the css if a custom design is desired.