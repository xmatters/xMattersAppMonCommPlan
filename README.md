
# xMatters Comm Plan for Dynatrace AppMon Integration
This xMatters Comm Plan receives and processes notifications from Dynatrace AppMon v7.0+, and features closed loop integration. 

# Pre-Requisites
* Dynatrace AppMon v7.0+, configured with the xMatters AppMon Plugin - available here: https://community.dynatrace.com/community/display/DL/xMatters+Plugin

* xMatters account - If you don't have one, [get one](https://www.xmatters.com)!

# Files
* [InboundFromAppmon.js](InboundFromAppmon.js) - Inbound integration script.
* [Outbound.js](Outbound.js) - Outbound integration script.
* [DynatraceApplicationMonitoring30.zip](DynatraceApplicationMonitoring.zip) - The comm plan (if needed) 

# How it works

You can configure any incident rule in Dynatrace AppMon to use the xMatters plugin. When such a rule fires, it will trigger an API call into the xMatters Inbound Integration specified by this Comm Plan. The integration script then parses out the payload and builds an event and passes that to xMatters. There is an outbound integration that uses the AppMon Incident ID to confirm the incident in AppMon.

# Installation
1. Ensure that the xMatters AppMon Plugin is deployed in AppMon and is configured against your incident rule(s) of choice. Ensure that the required plugin parameters are configured:
* xMatters Integration URL
* Subject
* Message
   
# Testing
Once you have the xMatters AppMon Plugin deployed in Dynatrace AppMon, test it from the Plugin Development page in AppMon's Server Settings:


