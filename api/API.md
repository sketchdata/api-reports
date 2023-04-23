# API Folder

- This folder contains a javascript file with a function for each report definition
- The file/function are named to match the report definition and returns the data from INNERGY API

## Sample Javascript Function for Report
 - "APIReportname"  - add 'API' to 'report name' to define the function
```
async function APIReportname() {

  // Retrieve Inventory - api call structure from https://app.innergy.com/api/index.html
  await apiCall('https://app.innergy.com/api/inventoryByMaterial', 'jsonData');
  jsonData = jsonData.Items;

  // using alasql tools with SQL syntax to select data for report
  var res = alasql("SELECT ManufacturerSKU, MaterialName, OnHandTotal, TotalCost->('Value') AS Cost, \
  Items->0->('CommonUoM') AS UoM FROM ? WHERE OnHandTotal > 0 ",[jsonData]);
 
  Innergy = res;

  // sends data to console for debugging in browser
  console.log(Innergy);

  // displays message in console to indicate process is done
  console.log('[APIInventory] retrieving data complete...');

};
```