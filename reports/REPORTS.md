# Report Folder
- The report folder contains the report definitions for each report
- The Stimulsoft reports are a JSON format
- When saving a report the designer with save to a .mrt format
- The .mrt file will need to be renamed to .js extension
- Edit to add a var statement

## Configuration Example
```
var Inventory = {
  "ReportVersion": "2022.3.5",
  "ReportGuid": "f16702b270bad17f0c3cbea042f37a32",
  "ReportName": "Inventory",
  "ReportAlias": "Inventory",
  "ReportFile": "Inventory.js",
  "ReportAuthor": "John Moore",
  "ReportDescription": "Inventory Onhand report.",
}
```