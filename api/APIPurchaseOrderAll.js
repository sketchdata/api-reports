// Purchase Order All Report
async function APIPurchaseOrderAll() {
    // SAMPLE statuses=Submitted&statuses=PartiallyReceived&statuses=ConfirmedByVendor
    // Retrieve "Submitted" status items
    await apiCall('https://app.innergy.com/api/purchaseOrders?statuses=Submitted&statuses=PartiallyReceived&statuses=ConfirmedByVendor&statuses=FullyReceived\
    &statuses=PartiallyReconciled&statuses=Reconciled&statuses=Closed', 'jsonData');

    // remove 'root' json record
    delete jsonData['CreateDate'];
    console.log('[APIPurchaseOrderAll] retrieving Purchasing data...');

    // merge json datasets
    Innergy = jsonData['Items']
    console.log(Innergy);
    console.log('[APIPurchaseOrderAll] retrieving data complete...');
};