// Enter your user API key from INNERGY below
const apiKey = 'o8uwqo90ofamm2i1yj14bea3fptrqx7dq6pf5r0a29ufk2sagklpcmqfr2ksqrcx7cjdcykoudci90s5ngps1qtng5=='

// Proxy to allow cross origin requests 
const corsProxy = 'https://innergyapi.sketchdata.com/';

// SketchData License Key API Endpoint
// Enter your SketchData API key to acivate report license on load
const skeyApiKey = 'IURollSuA5DVzejTDfG4d0vJ1U93FK9517xUf77c';
const skeyUrl = 'https://sketchdata.com/api/v1/reportkey';

// Default report on open
const defReport = "Readme";

// Set theme css reference
let themePath = 'css/'
const theme = themePath + 'sdreports.css';

// Report list for local user, apiKey will restrict data access
// format  "Report filename": "Report description on list"
var reportsCollection = {
    "Readme": "Introduction Readme",
    "PurchaseOrderAll": "Purchase Order",
    "MaterialLog": "Workorder Materials",
    "ActualCritical": "Actual Critical",
    "ScheduleWeek": "Production by Week",
	"Inventory": "Inventory Onhand"
};
