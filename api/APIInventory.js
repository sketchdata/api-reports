// Onhand Inventory report
async function APIInventory() {

  console.log('[APIInventory] retrieving data...');

  // Retrieve Inventory
  await apiCall('https://app.innergy.com/api/inventoryByMaterial', 'jsonData');
  jsonData = jsonData.Items;
  
  console.log(jsonData);

  // SQL to select data for report
  var res = alasql("SELECT ManufacturerSKU, MaterialName, OnHandTotal, TotalCost->('Value') AS Cost, \
  Items->0->('CommonUoM') AS UoM FROM ? WHERE OnHandTotal > 0 ",[jsonData]);
 
  Innergy = res;

  console.log(Innergy);

  console.log('[APIInventory] retrieving data complete...');

};