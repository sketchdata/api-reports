// Actual Critical Date report
async function APIActualCritical() {

  console.log('[APIActualCritical] retrieving Workorder data...');
   // Retrieve "Open" workorders
   // Cannot close Workorders until reporting is complete
   await apiCall('https://app.innergy.com/api/projectWorkOrders?status=Open', 'jsonData');
   jsonData = jsonData.Items;
 
   let jsonWO = [];
   // Build dataset with Custom Fields
   jsonData.forEach((Workorder) => {
     c = Workorder.CustomFields;
     c.forEach((data) => {
         key = 'C_' + data.Name;
         Workorder[key] = data.Value;
     });
     jsonWO.push(Workorder);
   });
 
   console.log(jsonWO);

  // SQL to select data for report
  var res = alasql("SELECT WorkflowName AS Div, Tags->0 AS Type, ProjectName, Name AS Workorder, PlannedCriticalDate, ActualStartDate, ActualEndDate, \
     ShipmentDate, CustomFields, ProjectManager->('FullName') AS PM, GrandTotalPrice->('Value') AS MfgValue \
     FROM ? WHERE GrandTotalPrice->('Value') > 0 ",[jsonWO]);
 
  Innergy = res;

  console.log(Innergy);
  console.log('[APIActualCritical] retrieving data complete...');

};