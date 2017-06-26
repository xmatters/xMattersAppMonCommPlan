/*
 * To use functions that are defined in a shared library, import
 * the shared library using the require function. You can then
 * access the functions in the shared library. Shared library names
 * are case-sensitive.
 *
 * The following statements show how to use a function named 'myFunction'
 * that is included in a shared library named 'My Shared Library'.
 *
 * var mySharedLibrary = require('My Shared Library');
 * var message = mySharedLibrary.myFunction();
 */

var callback = JSON.parse(request.body);
console.log('Executing outbound integration for xMatters event ID: ' + callback.eventIdentifier);

// Convert list of event properties to an eventProperties object
if (callback.eventProperties && Array.isArray(callback.eventProperties)) {
    var eventProperties = callback.eventProperties;
    callback.eventProperties = {};

    for (var i = 0; i < eventProperties.length; i++) {
        var eventProperty = eventProperties[i];
        var key = Object.keys(eventProperty)[0];
        callback.eventProperties[key] = eventProperty[key];
    }
}

// Handle responses without annotations
if (callback.annotation == "null") {
    callback.annotation = null;
}

console.log('Processing response of ' + callback.response + ' from ' + callback.recipient);
switch (callback.response) {
    case 'Confirm Incident':
        appMonConfirmviaREST(callback.eventProperties['incidentID']);
        break;
    case 'Schedule New Build':
        talkToBuildSys();
        break;   
    case 'Create Jira Ticket':
        createJiraTicket();
        break; 
}

/*
 * Update AppMon's incident State property to Confirmed. The Description property could also potentially be modified
 * if greater detail was desired.
 */

function appMonConfirmviaREST(incidentID) {
    
    console.log('RESPONSE IS CONFIRM INCIDENT - id is '+incidentID);
    var req = http.request({
        method: 'PUT',
        endpoint: 'AppMonRobertsLaptop',
        path: '/api/v2/alerts/'+incidentID,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    var payload = {
         "state": "Confirmed",
        "description": "Confirmed from xMatters integration"
  };
    req.write(payload);
}

/*
 * The next two methods are stubs for future enhancements
 */
 
function createJiraTicket() {
    console.log('RESPONISE IS CREATE JIRA TICKET');
}

function talkToBuildSys() {
    console.log('RESPOBISE IS TALK TO BUILD SYSTEM');  
}
