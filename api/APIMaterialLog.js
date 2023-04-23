// Materials Inventory and non-stock
async function APIMaterialLog() {

    console.log('[APIMaterialLog] retrieving data...');

    // SAMPLE statuses=Submitted&statuses=PartiallyReceived&statuses=ConfirmedByVendor
    // Retrieve ALL status PO items
    await apiCall('https://app.innergy.com/api/purchaseOrders?statuses=Submitted&statuses=PartiallyReceived&statuses=ConfirmedByVendor&statuses=FullyReceived \
    &statuses=Closed&statuses=PartiallyReconciled&statuses=Reconciled', 'jsonData');

    // remove 'root' json record
    delete jsonData['CreateDate'];

    jsonData = jsonData['Items'];

    var res = alasql("SELECT Number AS PO_Num, Vendor, LineItems  \
    FROM ? ",[jsonData]);
    jsonData1 = res;

    // Data Format  DateTx, Material, Notes, PO_Num, Qty, Status, UOM, Vendor, WorkOrder, Project
    let jsonPO = [];
    jsonData1.forEach((POLine) => {
        l = POLine.LineItems;
        l.forEach((data) => {
            if (data.ExpenseUponReceipt == true ) {
                if (data.Status == 'Fully Received' || data.Status == 'Partially Received') {
                    let PO = {};
                    PO['PO_Num'] = POLine['PO_Num'];
                    PO['Vendor'] = POLine['Vendor'];
                    PO['JobNumber'] = String(data.WorkOrder).substring(0,14);
                    PO['WorkOrder'] = String(data.WorkOrder).substring(17);
                    PO['Project'] = String(data.Project).substring(12);
                    PO['Material'] = data.MaterialName + ' ' + data.NotesPlainText;
                    PO['Tag'] = data.Tags[0];
                    PO['Qty'] = data.QuantityReceived;
                    PO['Status'] = data.Status;
                    PO['UOM'] = data.UoM;
                    PO['DateTx'] = data.FirstDateReceived;
                    //console.log(JSON.stringify(PO));
                    jsonPO.push(PO);
                }
            }
        });
      });

    //console.log(jsonPO);
    console.log('[APIMaterialLog] retrieving Purchasing data...');
    
    let jsonMatl = [];
    for (let i = -7; i < 2; i++) {
        var now = new Date();
        dateObj = new Date(now.getFullYear(), now.getMonth()+1, 1);
        dateObj.setMonth(dateObj.getMonth() + (i-1));
        month = ("0" + (dateObj.getMonth() + 1)).slice(-2); //months from 1-12
        year = dateObj.getFullYear();
        d1 = year + "-" + month + "-01" ;

        var now = new Date();
        dateObj = new Date(now.getFullYear(), now.getMonth()+1, 1);
        dateObj.setMonth(dateObj.getMonth() + i);
        month = ("0" + (dateObj.getMonth() + 1)).slice(-2); //months from 1-12
        year = dateObj.getFullYear();
        d2 = year + "-" + month + "-01" ;

        param = 'from=' + d1 + '&to=' + d2 + '&showArchived=false';
        console.log(param);
        await apiCall('https://app.innergy.com/api/costTransactionHistory?' + param, 'retdata');
        jsonMatl = jsonMatl.concat(retdata.Items);
    }

    var res = alasql("SELECT PostDate AS DateTx, Description AS Material, BudgetGroupName AS Tag, PurchaseOrderNumber AS PO_Num, Quantity AS Qty, Type AS Status, UoM AS UOM, \
    '' AS Vendor, WorkOrder->('Number') AS JobNumber, WorkOrder->('Name') AS WorkOrder, Project->('ProjectName') AS Project  FROM ? WHERE CostType = 'Material' AND Type = 'MaterialFulfilled' ",[jsonMatl]);
      
    //console.log(res);
    console.log('[APIMaterialLog] retrieving Material data...');

    // merge json datasets
    Innergy = jsonPO;
    Innergy = Innergy.concat(res);

    // output results to debug console
    console.log(Innergy);
    console.log('[APIMaterialLog] retrieving data complete...');

};