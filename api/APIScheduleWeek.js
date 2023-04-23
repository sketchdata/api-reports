// Actual Inventory Date AID report
async function APIScheduleWeek() {

  console.log('[APIScheduleWeek] retrieving data start...');

  // Retrieve "Open" workorders
  await apiCall('https://app.innergy.com/api/projectWorkOrders?status=Open', 'jsonData');
  jsonData = jsonData.Items;

  alasql.fn.dateweek = function(sDate) {
    var currentDate = new Date(sDate);        
    return currentDate.getWeekYear() + '-' + currentDate.getWeek().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  };

  let jsonWO = [];
  // Build dataset with Custom Fields
  jsonData.forEach((Workorder) => {
    c = Workorder.CustomFields;
    c.forEach((data) => {
        key = 'C_' + data.Name;
        Workorder[key] = data.Value;
    });
    // Build dataset with Engineers - only 1 Engineer
    e = Workorder.Engineers;
    if (!Object.is(e, null)) {
      e.length = 1;
      e.forEach((data) => {
        key = 'Engineer';
        Workorder[key] = data.FullName;
      });
    }
    else {
      key = 'Engineer';
      Workorder[key] = '';
    }
    jsonWO.push(Workorder);
  });

  //SQL to select data for report
  var res = alasql("SELECT WorkflowName AS Div, Tags->0 AS Type, ProjectName, Name AS Workorder, PlannedCriticalDate, ActualStartDate, ActualEndDate, dateweek(PlannedCriticalDate) AS Week, \
     ShipmentDate, ProjectManager->('FullName') AS PM, Engineer, GrandTotalPrice->('Value') AS MfgValue, Type, Step, StepIndex \
     FROM ? WHERE Type = 'Production' AND GrandTotalPrice->('Value') > 0 ",[jsonWO]);
 
  Innergy = res;

  console.log(Innergy);
  console.log('[APIScheduleWeek] retrieving data complete...');

};