var viewer = null;
var designer = null;
// Variable for JSON dataset
var Innergy = '';
var reportListLoad = [];
var skey = '';

function loadCss() {
    var head = document.getElementsByTagName('HEAD')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = theme;
    head.appendChild(link);
}

loadCss();

function buildReportList() {
    Object.entries(reportsCollection).forEach(o=> {
		const [key, value] = o;
        reportListLoad.push('reports/'+key+'.js');
        reportListLoad.push('api/API'+key+'.js');
    });
}

buildReportList();

loadScriptsInOrder(reportListLoad).then(function () {

});

function createViewer() {

    Stimulsoft.Base.StiLicense.key = skey;
    
    // Specify necessary options for the viewer
    var options = new Stimulsoft.Viewer.StiViewerOptions();
    options.height = "100%";
    options.appearance.scrollbarsMode = true;
    options.toolbar.showDesignButton = true;
    options.toolbar.showSendEmailButton = false;
    options.toolbar.printDestination = Stimulsoft.Viewer.StiPrintDestination.Direct;
    
    options.exports.showExportToXps = false;
    options.exports.showExportToPowerPoint = false;
    options.exports.showExportToOpenDocumentWriter = false;
    options.exports.showExportToHtml = false;
    options.exports.showExportToHtml5 = false;
    options.exports.showExportToOpenDocumentCalc = false;
    options.exports.showExportToText = false;
    options.exports.showExportToImageBmp = false;
    options.exports.showExportToImageGif = false;
    options.exports.showExportToImageJpeg = false;
    options.exports.showExportToImagePcx = false;
    options.exports.showExportToImagePng = false;
    options.exports.showExportToImageTiff = false;
    options.exports.showExportToImageMetafile = false;
    options.exports.showExportToImageSvg = false;
    options.exports.showExportToImageSvgz = false;
    options.exports.showExportToCsv = false;
    options.exports.showExportToDbf = false;
    options.exports.showExportToXml = false;
    options.exports.showExportToDif = false;
    options.exports.showExportToSylk = false;
    options.exports.showExportToDocument = false;

    // 11/16/22 TODO - Email default settings (change with report render)
    options.email.defaultEmailAddress = "john@sketchdata.com";

    options.email.defaultEmailSubject = "New email";
    options.email.defaultEmailMessage = "Please check the attachment";

    // Create an instance of the viewer
    viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);

    // Add the design button event
    viewer.onDesignReport = function (e) {
        this.visible = false;
        if (designer == null) createDesigner();
        designer.visible = true;
        designer.report = e.report;
    };

    // 11/16/22 TODO email option
    viewer.onEmailReport = function (args) {
        // alert('emailing report...');
        // console.log(args);
        // Stimulsoft.Helper.process(args);
        window.open('mailto:'+options.email.defaultEmailAddress+'?subject='+options.email.defaultEmailSubject+'body='+options.email.defaultEmailMessage);		
    };

    viewer.renderHtml("viewerContent");
}

function createDesigner() {
    var options = new Stimulsoft.Designer.StiDesignerOptions();
    options.appearance.fullScreenMode = true;

    // Create an instance of the designer
    designer = new Stimulsoft.Designer.StiDesigner(options, "StiDesigner", false);

    // Add the exit menu item event
    designer.onExit = function (e) {
        this.visible = false;
    }

    designer.renderHtml("designerContent");
}

async function setReport(reportObject) {
    
    // Forcibly show process indicator
    viewer.showProcessIndicator();

    // Load API data for paricular report
    // console.log('getData()');
    // console.log(reportObject.ReportName);

    // Replaced by calls in report files
    // await getData(reportObject.ReportName);
    // Run data API calls based on report name
    let rRpt = window['API'+reportObject.ReportName];
    // Run data retrieval if function exists
    if (typeof rRpt === "function") await rRpt();

    // Timeout need for immediate display loading report indicator
    setTimeout(function () {
        // Create a new report instance
        var report = new Stimulsoft.Report.StiReport();
        // Load reports from JSON object
        report.load(reportObject);
        // Remove all connections in report template (they are used in the first place)
        report.dictionary.databases.clear();
        // Registered JSON data specified in the report with same name
        // console.log('regData()');
        report.regData("Innergy", "Innergy", Innergy);
        report.dictionary.synchronize();

        // Assign the report to the viewer
        viewer.report = report;

    }, 500);
}

// Set report button style
function setReportButton(button) {
    for (var reportName in reportsCollection) {
        var reportButton = document.getElementById(reportName);
        reportButton.isSelected = reportButton == button;
        reportButton.className = reportButton.isSelected ? "ReportButton Selected" : "ReportButton";
    }
}

// Load first report after the page is loaded
async function onBodyLoad() {
    await fetchSKey().then(s => {
        skey = s.key;
    });
    createViewer();
    defReportObj = eval(defReport);
    selectedButton = document.getElementById(defReport);
    onButtonClick(selectedButton, defReportObj);
}

function onButtonClick(button, reportObject) {
    selectedButton.className = "ReportButton";
    button.className = "ReportButton Selected";
    selectedButton = button;
    setReport(reportObject);
}

function onButtonMouseOver(button) {
    if (button != selectedButton) button.className = "ReportButton Over";
}

function onButtonMouseOut(button) {
    if (button != selectedButton) button.className = "ReportButton";
}

window.addEventListener('load', function() {
    onBodyLoad();
})