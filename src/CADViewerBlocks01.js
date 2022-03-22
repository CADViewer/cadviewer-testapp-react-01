import React, { Component }  from 'react';
//import {findDOMNode } from 'react-dom';
//import logo from './logo.svg';
//import { render } from '@testing-library/react';
//import  ResizeObserver from 'rc-resize-observer';
// import { View } from 'react-native';
//import 'jquery-ui';
import jQuery from "jquery";

import './CADViewer_component.css';

import * as cadviewer from "cadviewer";

export var textLayer1; 

export function clearTextLayer(){
	textLayer1 = cadviewer.cvjs_clearLayer(textLayer1);
}


var  selected_handles = [];
var  handle_selector = false;
var  current_selected_handle = "";


// We should to define all the CADViewer methods in which we are getting information return from CADViewer
// THEY CAN BE PLACEHOLDERS ONLY 


//export function cvjs_OnLoadEnd(){

function cvjs_OnLoadEnd(){
	// generic callback method, called when the drawing is loaded
	// here you fill in your stuff, call DB, set up arrays, etc..
	// this method MUST be retained as a dummy method! - if not implemeted -

	cadviewer.cvjs_resetZoomPan("floorPlan");

	var user_name = "Bob Smith";
	var user_id = "user_1";

	// set a value for redlines
	cadviewer.cvjs_setCurrentStickyNoteValues_NameUserId(user_name, user_id );
	cadviewer.cvjs_setCurrentRedlineValues_NameUserid(user_name, user_id);
	// cadviewer.cvjs_dragBackgroundToFront_SVG("floorPlan");					
	//cvjs_initZeroWidthHandling("floorPlan", 1.0);			

	textLayer1 = cadviewer.cvjs_clearLayer(textLayer1);
	
}

function cvjs_OnLoadEndRedlines(){
	// generic callback method, called when the redline is loaded
	// here you fill in your stuff, hide specific users and lock specific users
	// this method MUST be retained as a dummy method! - if not implemeted -

	// I am hiding users added to the hide user list
	cadviewer.cvjs_hideAllRedlines_HiddenUsersList();

	// I am freezing users added to the lock user list
	cadviewer.cvjs_lockAllRedlines_LockedUsersList();
}

// Callback Method on Creation and Delete 
//export function cvjs_graphicalObjectOnChange(type, graphicalObject, spaceID){
function cvjs_graphicalObjectOnChange(type, graphicalObject, spaceID){
	var myobject;
	// do something with the graphics object created! 
//	window.alert("CALLBACK: cvjs_graphicalObjectOnChange: "+type+" "+graphicalObject+" "+spaceID+" indexSpace: "+graphicalObject.toLowerCase().indexOf("space"));
	console.log("CALLBACK: cvjs_graphicalObjectOnChange: "+type+" "+graphicalObject+" "+spaceID+" indexSpace: "+graphicalObject.toLowerCase().indexOf("space"));

	if (type == 'Create' && graphicalObject.toLowerCase().indexOf("space")>-1 && graphicalObject.toLowerCase().indexOf("circle")==-1){
			
		/**
		 * Return a JSON structure of all content of a given ID: <br>
		* 	var jsonStructure =  	{	"path":   path, <br>
		*								"tags": tags, <br>
		*								"node": node, <br>
		*								"outerhtml": outerHTML, <br>
		*								"occupancy": occupancy, <br>
		*								"name": name, <br>
		*								"type": type, <br>
		*								"id": id, <br>
		*								"defaultcolor": defaultcolor, <br>
		*								"layer": layer, <br>
		*								"group": group, <br>
		*								"linked": linked, <br>
		*								"attributes": attributes, <br>
		*								"attributeStatus": attributeStatus, <br>
		*								"displaySpaceObjects": displaySpaceObjects, <br>
		*								"translate_x": translate_x, <br>
		*								"translate_y": translate_y, <br>
		*								"scale_x": scale_x ,<br>
		*								"scale_y": scale_y ,<br>
		*								"rotate": rotate, <br>
		*								"transform": transform} <br>
		* @param {string} spaceID - Id of the Space Object to return
		* @return {Object} jsonSpaceObject - Object with the entire space objects content
		*/

		myobject = cadviewer.cvjs_returnSpaceObjectID(spaceID);
		// I can save this object into my database, and then use command 
		// cvjs_setSpaceObjectDirect(jsonSpaceObject) 
		// when I am recreating the content of the drawing at load
		// for the fun of it, display the SVG geometry of the space:			
		console.log("This is the SVG: "+myobject.outerhtml)
	}


	if (type == 'Delete' && graphicalObject.toLowerCase().indexOf("space")>-1 ){
		// remove this entry from my DB

		window.alert("We have deleted: "+spaceID)
	}


	if (type == 'Move' && graphicalObject.toLowerCase().indexOf("space")>-1 ){
		// remove this entry from my DB

		console.log("This object has been moved: "+spaceID)		
		myobject = cadviewer.cvjs_returnSpaceObjectID(spaceID);

	}

}


function cvjs_saveStickyNotesRedlinesUser(){

// there are two modes, user handling of redlines
// alternatively use the build in redline file manager

cadviewer.cvjs_openRedlineSaveModal("floorPlan");

// custom method startMethodRed to set the name and location of redline to save
// see implementation below
//startMethodRed();
// API call to save stickynotes and redlines
//cvjs_saveStickyNotesRedlines("floorPlan");
}


// This method is linked to the load redline icon in the imagemap
function cvjs_loadStickyNotesRedlinesUser(){


cadviewer.cvjs_openRedlineLoadModal("floorPlan");

// first the drawing needs to be cleared of stickynotes and redlines
//cvjs_deleteAllStickyNotes();
//cvjs_deleteAllRedlines();

// custom method startMethodRed to set the name and location of redline to load
// see implementation below
// startMethodRed();

// API call to load stickynotes and redlines
//cvjs_loadStickyNotesRedlines("floorPlan");
}

// Here we are writing a basic function that will be used in the PopUpMenu
// this is template on all the good stuff users can add
function my_own_clickmenu1(){
var id = cadviewer.cvjs_idObjectClicked();
//		var node = cvjs_NodeObjectClicked();
window.alert("Custom menu item 1: Here developers can implement their own methods, the look and feel of the menu is controlled in the settings.  Clicked object ID is: "+id);
}

// Here we are writing a basic function that will be used in the PopUpMenu
// this is template on all the good stuff users can add
function my_own_clickmenu2(){
var id = cadviewer.cvjs_idObjectClicked();
//var node = cvjs_NodeObjectClicked();

window.alert("Custom menu item 2: Here developers can implement their own methods, the look and feel of the menu is controlled in the settings. Clicked object ID is: "+id);
//window.alert("Custom menu item 2: Clicked object Node is: "+node);
}

function cvjs_popupTitleClick(roomid){
	window.alert("we have clicked "+roomid);	
}
   

// HANDLING OF MOUSE OPERATION


// ENABLE ALL API EVENT HANDLES FOR AUTOCAD Handles
function cvjs_mousedown(id, handle, entity){

	// TEST - when click move to center with 300% around block handle 
	cadviewer.cvjs_zoomHere_Handle(handle, 3.0, "floorPlan");
	
	// we cannot highlight because we have moved the mouse or finger out
	// remove cadviewer.cvjs_mouseout_handleObjectStyles(id, handle); and it will highlight

	//cadviewer.cvjs_HighlightHandleObjectStyles("#F00", 2.0, 1.0, true, id, handle);

}

function cvjs_click(id, handle, entity){


  console.log("mysql click "+id+"  "+handle);
  // if we click on an object, then we add to the handle list
  if (handle_selector){
      selected_handles.push({id,handle});
      current_selected_handle = handle;
  }

// tell to update the Scroll bar 
//vqUpdateScrollbar(id, handle);
// window.alert("We have clicked an entity: "+entity.substring(4)+"\r\nThe AutoCAD Handle id: "+handle+"\r\nThe svg id is: "+id+"\r\nHighlight SQL pane entry");
}

function cvjs_dblclick(id, handle, entity){

console.log("mysql dblclick "+id+"  "+handle);
window.alert("We have double clicked entity with AutoCAD Handle: "+handle+"\r\nThe svg id is: "+id);
}

function cvjs_mouseout(id, handle, entity){

  console.log("mysql mouseout "+id+"  "+handle);
  
  if (current_selected_handle == handle){
      // do nothing
  }
  else{
      cadviewer.cvjs_mouseout_handleObjectStyles(id, handle);
  }
}

function cvjs_mouseover(id, handle, entity){

	console.log("mysql mouseover "+id+"  "+handle+"  "+jQuery("#"+id).css("color"))
	//cvjs_mouseover_handleObjectPopUp(id, handle);	


}

function cvjs_mouseleave(id, handle, entity){

console.log("mysql mouseleave "+id+"  "+handle+"  "+jQuery("#"+id).css("color"));
}


function cvjs_mouseenter(id, handle, entity){
//	cvjs_mouseenter_handleObjectStyles("#a0a000", 4.0, 1.0, id, handle);
//	cvjs_mouseenter_handleObjectStyles("#ffcccb", 5.0, 0.7, true, id, handle);


cadviewer.cvjs_mouseenter_handleObjectStyles("#F00", 10.0, 1.0, true, id, handle);

}

// END OF MOUSE OPERATION

function cvjs_graphicalObjectCreated(graphicalObject){
// do something with the graphics object created!
//		window.alert(graphicalObject);

}

function cvjs_ObjectSelected(rmid){
	// placeholder for method in tms_cadviewerjs_modal_1_0_14.js   - must be removed when in creation mode and using creation modal
}

function cvjs_measurementCallback(){
}
function cvjs_CalibrateMeasurementCallback(){
}
function cvjs_Url_callback(){
}
function cvjs_loadSpaceImage_UserConfiguration(){
}
function cvjs_NoObjectSelected(){
}
function cvjs_SVGfileObjectClicked(){
}
function cvjs_SVGfileObjectMouseEnter(){
}
function cvjs_SVGfileObjectMouseLeave(){
}
function cvjs_SVGfileObjectMouseMove(){
};
function cvjs_ParseDisplayDataMaps(){
};
function cvjs_QuickCountCallback(){
};
function cvjs_OnHyperlinkClick(){
};
function cvjs_setUpStickyNotesRedlines(){
};
function custom_host_parser_PopUpMenu(){
};
function cvjs_customHostParser(){
}
function drawPathsGeneric(){
};
function cvjs_callbackForModalDisplay(){
};
function cvjs_populateMyCustomPopUpBody(){
};
function cvjs_customModalPopUpBody(){
};
function cvjs_NoObjectSelectedStickyNotes(){
};
function cvjs_NoObjectSelectedHyperlinks(){
};
function cvjs_ObjectSelectedHyperlink(){
};
function cvjs_ObjectSelectedStickyNotes(){
};

function custom_callback1(){
	var id = cadviewer.cvjs_idObjectClicked();
	window.alert("Hello callback1 "+id);
};
function custom_callback2(){
	var id = cadviewer.cvjs_idObjectClicked();
	window.alert("Hello callback2 "+id);
};
function custom_callback3(){
	var id = cadviewer.cvjs_idObjectClicked();
	window.alert("Hello callback3 "+id);
};
function custom_callback4(){
	var id = cadviewer.cvjs_idObjectClicked();
	window.alert("Hello callback4 "+id);
};
function custom_callback5(){
	var id = cadviewer.cvjs_idObjectClicked();
	window.alert("Hello callback5 "+id);
};
function custom_callback6(){
	var id = cadviewer.cvjs_idObjectClicked();
	window.alert("Hello callback6 "+id);
};
function custom_callback7(){
	var id = cadviewer.cvjs_idObjectClicked();
	window.alert("Hello callback7 "+id);
};
function custom_callback8(){
	var id = cadviewer.cvjs_idObjectClicked();
	window.alert("Hello callback8 "+id);
};
function custom_callback9(){
	var id = cadviewer.cvjs_idObjectClicked();
	window.alert("Hello callback9 "+id);
};
function custom_callback10(){
	var id = cadviewer.cvjs_idObjectClicked();
	window.alert("Hello callback10 "+id);
};





function myCustomPopUpBody(rmid){

	// extracting block attributes
    var myobject = cadviewer.cvjs_returnSpaceObjectID(rmid);
    //console.log("myCustomPopUpBody is called: "+ rmid+" "+JSON.stringify(myobject));
    try {
        // get block attribute:

        var cvjsPopUpBody = "<div style='line-height:75%'><font size='0'>";
        
        for (var i = 1; i <= myobject.blockAttributeCount; i++) {
            var attribId = "#" + myobject.blockAttributeId + "_" + i;
            cvjsPopUpBody += jQuery(attribId).attr('cvjs:tag')+": <span id=\"mymodal_name_"+jQuery(attribId).attr('cvjs:value')+"\" >"+jQuery(attribId).attr('cvjs:value')+"</span><br>";
        }
        cvjsPopUpBody+= "<font size='+2'></div>";
        return cvjsPopUpBody;
    }
    catch(err){


    }

}

function populateMyCustomPopUpBody(){

    // void
}








class CADViewerBlocks01 extends Component {

	async componentDidMount () {

		// window.alert("loading 6.4.05");

		window.addEventListener('resize', this._handleWindowResize);
	

		// connecting to Servlets Server
		//var ServerBackEndUrl = "http://localhost:8080/cadviewer/";
		//var ServerLocation = "c:/xampp/tomcat/webapps/cadviewer/";

		// Connecting to .NET Server
		//var ServerBackEndUrl = "http://localhost:53737/";
		//var ServerLocation = "c:/visualstudio/cadviewer/";


		// Standard NodeJS Server
		var ServerBackEndUrl = "http://localhost:3000/";
		var ServerLocation = "";    // leave blank


		// ONLINE TEST SERVER
		//var ServerBackEndUrl = "http://convertcad.online:3000/";
		//var ServerLocation = "/home/cadviewer/convertcad.online/cadviewer-conversion-server/";


		// Standard Front-end
		var ServerUrl = "http://localhost:8000/";
		
	    //var FileName = ServerBackEndUrl+ "/content/drawings/dwg/hq17_2spaces.dwg";		
		//var FileName = ServerBackEndUrl+ "/content/drawings/dwg/hq17_.dwg";

		var FileName = ServerBackEndUrl+ "/content/custom/ff-ia.svg";


		cadviewer.cvjs_debugMode(true);
	   // cadviewer.cvjs_setLeafletJS(true);
		
		// Set all paths, and handlers, changes these depending on back-end server
		cadviewer.cvjs_setAllServerPaths_and_Handlers(ServerBackEndUrl, ServerUrl, ServerLocation, "NodeJS", "ReactJS", "floorPlan");
	  


        //      Setting all callback methods  - they have to be injected into the CADViewer class componnet
        cadviewer.cvjs_setCallbackMethod("cvjs_OnLoadEnd", cvjs_OnLoadEnd);
        cadviewer.cvjs_setCallbackMethod("cvjs_graphicalObjectOnChange", cvjs_graphicalObjectOnChange);
        cadviewer.cvjs_setCallbackMethod("cvjs_OnLoadEndRedlines", cvjs_OnLoadEndRedlines);
        cadviewer.cvjs_setCallbackMethod("cvjs_ObjectSelected", cvjs_ObjectSelected);
        cadviewer.cvjs_setCallbackMethod("cvjs_measurementCallback", cvjs_measurementCallback);
        cadviewer.cvjs_setCallbackMethod("cvjs_CalibrateMeasurementCallback", cvjs_CalibrateMeasurementCallback);
        cadviewer.cvjs_setCallbackMethod("cvjs_Url_callback", cvjs_Url_callback);
        cadviewer.cvjs_setCallbackMethod("cvjs_loadSpaceImage_UserConfiguration", cvjs_loadSpaceImage_UserConfiguration);
        cadviewer.cvjs_setCallbackMethod("cvjs_NoObjectSelected", cvjs_NoObjectSelected);
        cadviewer.cvjs_setCallbackMethod("cvjs_SVGfileObjectClicked", cvjs_SVGfileObjectClicked);
        cadviewer.cvjs_setCallbackMethod("cvjs_SVGfileObjectMouseEnter", cvjs_SVGfileObjectMouseEnter);
        cadviewer.cvjs_setCallbackMethod("cvjs_SVGfileObjectMouseLeave", cvjs_SVGfileObjectMouseLeave);
        cadviewer.cvjs_setCallbackMethod("cvjs_SVGfileObjectMouseMove", cvjs_SVGfileObjectMouseMove);
		cadviewer.cvjs_setCallbackMethod("cvjs_ParseDisplayDataMaps", cvjs_ParseDisplayDataMaps);
        cadviewer.cvjs_setCallbackMethod("cvjs_QuickCountCallback", cvjs_QuickCountCallback);
        cadviewer.cvjs_setCallbackMethod("cvjs_OnHyperlinkClick", cvjs_OnHyperlinkClick);
        cadviewer.cvjs_setCallbackMethod("cvjs_setUpStickyNotesRedlines", cvjs_setUpStickyNotesRedlines);
        cadviewer.cvjs_setCallbackMethod("custom_host_parser_PopUpMenu", custom_host_parser_PopUpMenu);
        cadviewer.cvjs_setCallbackMethod("cvjs_customHostParser", cvjs_customHostParser);
        cadviewer.cvjs_setCallbackMethod("drawPathsGeneric", drawPathsGeneric );
        cadviewer.cvjs_setCallbackMethod("cvjs_callbackForModalDisplay", cvjs_callbackForModalDisplay);
        cadviewer.cvjs_setCallbackMethod("cvjs_populateMyCustomPopUpBody", cvjs_populateMyCustomPopUpBody);
        cadviewer.cvjs_setCallbackMethod("cvjs_customModalPopUpBody", cvjs_customModalPopUpBody);
        cadviewer.cvjs_setCallbackMethod("cvjs_NoObjectSelectedStickyNotes", cvjs_NoObjectSelectedStickyNotes);
        cadviewer.cvjs_setCallbackMethod("cvjs_NoObjectSelectedHyperlinks", cvjs_NoObjectSelectedHyperlinks);
        cadviewer.cvjs_setCallbackMethod("cvjs_ObjectSelectedHyperlink", cvjs_ObjectSelectedHyperlink);
        cadviewer.cvjs_setCallbackMethod("cvjs_ObjectSelectedStickyNotes", cvjs_ObjectSelectedStickyNotes);
		cadviewer.cvjs_setCallbackMethod("cvjs_saveStickyNotesRedlinesUser", cvjs_saveStickyNotesRedlinesUser);
        cadviewer.cvjs_setCallbackMethod("cvjs_loadStickyNotesRedlinesUser", cvjs_loadStickyNotesRedlinesUser);
        cadviewer.cvjs_setCallbackMethod("my_own_clickmenu1", my_own_clickmenu1);
        cadviewer.cvjs_setCallbackMethod("my_own_clickmenu2", my_own_clickmenu2);
        cadviewer.cvjs_setCallbackMethod("cvjs_popupTitleClick", cvjs_popupTitleClick);
        cadviewer.cvjs_setCallbackMethod("cvjs_mousedown", cvjs_mousedown);
        cadviewer.cvjs_setCallbackMethod("cvjs_click", cvjs_click);
        cadviewer.cvjs_setCallbackMethod("cvjs_dblclick", cvjs_dblclick);
        cadviewer.cvjs_setCallbackMethod("cvjs_mouseout", cvjs_mouseout);
        cadviewer.cvjs_setCallbackMethod("cvjs_mouseover", cvjs_mouseover);
        cadviewer.cvjs_setCallbackMethod("cvjs_mouseleave", cvjs_mouseleave);
        cadviewer.cvjs_setCallbackMethod("cvjs_mouseenter", cvjs_mouseenter);
        cadviewer.cvjs_setCallbackMethod("cvjs_graphicalObjectCreated", cvjs_graphicalObjectCreated);

        cadviewer.cvjs_setCallbackMethod("custom_callback1", custom_callback1);
        cadviewer.cvjs_setCallbackMethod("custom_callback2", custom_callback2);
        cadviewer.cvjs_setCallbackMethod("custom_callback3", custom_callback3);
        cadviewer.cvjs_setCallbackMethod("custom_callback4", custom_callback4);
        cadviewer.cvjs_setCallbackMethod("custom_callback5", custom_callback5);
        cadviewer.cvjs_setCallbackMethod("custom_callback6", custom_callback6);
        cadviewer.cvjs_setCallbackMethod("custom_callback7", custom_callback7);
        cadviewer.cvjs_setCallbackMethod("custom_callback8", custom_callback8);
        cadviewer.cvjs_setCallbackMethod("custom_callback9", custom_callback9);
        cadviewer.cvjs_setCallbackMethod("custom_callback10", custom_callback10);


		// END set all callback methods

		  // Location of installation folders
		  // NOTE: THE LOCATION OF THE ServerLocation/ServerUrl VARIABLES ARE DEFINED IN /cadviewer/app/cv/XXXHandlerSettings.js	
		  //	var ServerLocation = 
		  //	var ServerUrl =    
		 cadviewer.cvjs_CADViewerPro(true);
		 
		 // Pass over the location of the installation, will update the internal paths
		 cadviewer.cvjs_PrintToPDFWindowRelativeSize(0.8);
		 cadviewer.cvjs_setFileModalEditMode(false);


		// do not display modals


		cadviewer.cvjs_setNoModalMode(true);
        cadviewer.cvjs_setCallbackForModalDisplay(true, myCustomPopUpBody, populateMyCustomPopUpBody);




	   		   
		// For "Merge DWG" / "Merge PDF" commands, set up the email server to send merged DWG files or merged PDF files with redlines/interactive highlight.
		// See php / xampp documentation on how to prepare your server
		cadviewer.cvjs_emailSettings_PDF_publish("From CAD Server", "my_from_address@mydomain.com", "my_cc_address@mydomain.com", "my_reply_to@mydomain.com");
		   	 
		// CHANGE LANGUAGE - DEFAULT IS ENGLISH	
		cadviewer.cvjs_loadCADViewerLanguage("English"); //cadviewer.cvjs_loadCADViewerLanguage("English", "/app/cv/cv-pro/language_table/cadviewerProLanguage.xml");

		// Available languages:  "English" ; "French, "Korean", "Spanish", "Portuguese", "Chinese-Simplified", "Chinese-Traditional"

		// Set Icon Menu Interface controls. Users can: 
		// 1: Disable all icon interfaces
		//  cvjs_displayAllInterfaceControls(false, "floorPlan");  // disable all icons for user control of interface

		// 2: Disable either top menu icon menus or navigation menu, or both

		//cvjs_displayTopMenuIconBar(false, "floorPlan");  // disable top menu icon bar
		//cvjs_displayTopNavigationBar(false, "floorPlan");  // disable top navigation bar

		// 3: Users can change the number of top menu icon pages and the content of pages, based on a configuration file in folder /cadviewer/app/js/menu_config/    		
		cadviewer.cvjs_setTopMenuXML("floorPlan", "cadviewer_full_commands_01.xml");  //cadviewer.cvjs_setTopMenuXML("floorPlan", "cadviewer_full_commands_01.xml", "/cadviewer/app/cv/cv-pro/menu_config/");

		
		// Initialize CADViewer  - needs the div name on the svg element on page that contains CADViewerJS and the location of the
		// main application "app" folder. It can be either absolute or relative

		
/*		
		// SETTINGS OF THE COLORS OF SPACES
		var BaseAttributes = {
				fill: '#d8e1e3', //'#d8e1e3', // '#ffd7f4', //'#D3D3D3',   // #FFF   #ffd7f4
				"fill-opacity": 0.1,    //"0.05",   // 0.1
				stroke: '#CCC',  
				'stroke-width': 0.25,
				'stroke-linejoin': 'round',
				'stroke-opacity': 0.1,
				//opacity: 0.1,
			};
		
		var HighlightAttributes = {
				fill: '#a4d7f4',   // #a4d7f4
				"fill-opacity": 1.0,
				stroke: '#a4d7f4',
				'stroke-width': 0.75,
				'stroke-opacity': 1,
				//opacity: 0.5,

			};
			
		var SelectAttributes = {
				fill: '#5BBEF6',
				"fill-opacity": 1.0,
				stroke: '#5BBEF6',
				'stroke-width': 0.75,
				'stroke-opacity': 1.0,
				 //opacity: 0.5,
			};

*/

			var BaseAttributes = {
				fill: '#d8e1e3', //'#d8e1e3', // '#ffd7f4', //'#D3D3D3',   // #FFF   #ffd7f4
				"fill-opacity": "0.1",
				stroke: '#CCC',  //  #CCC
				'stroke-width': 0.5,
				'stroke-opacity': "0.7",
				'stroke-linejoin': 'round'
			};

			// Location Highlight Attribute    (no separation between location types)
			var HighlightAttributes = {
				fill: '#a4d7f4',
				"fill-opacity": "0.8",
				stroke: '#a4d7f4',
				'stroke-width': 1,
				'stroke-opacity': "0.8"
			};

			// Location Select Attribute    (no separation between location types)
			var SelectAttributes = {   // fill: '#5BBEF6',
				fill: '#5BBEF6',
				"fill-opacity": "0.8",
				stroke: '#5BBEF6',
				'stroke-width': 1,
				'stroke-opacity': "0.8"
			};



		/** FIXED POP-UP MODAL  **/
		
			// THIS IS THE DESIGN OF THE pop-up MODAL WHEN CLICKING ON SPACES
		// KEEP METHODS NAME AS IS FOR NOW...............

		var my_cvjsPopUpBody = "<div class=\'cvjs_modal_1\' id=\'my_own_clickmenu1()\'>Custom<br>Menu 1<br><i class=\'fa fa-undo\'></i></div>";
		my_cvjsPopUpBody += "<div class=\'cvjs_modal_1\' id=\'my_own_clickmenu2()\'>Custom<br>Menu 2<br><i class=\'fa fa-info-circle\'></i></div>";
		my_cvjsPopUpBody += "<div class=\'cvjs_modal_1\' id=\'cvjs_zoomHere()\'>Zoom<br>Here<br><i class=\'fa fa-search-plus\'></i></div>";
			

			// Initialize CADViewer - needs the div name on the svg element on page that contains CADViewerJS and the location of the
			// And we intialize with the Space Object Custom values
		//  cvjs_InitCADViewer_highLight_popUp_app("floorPlan", ServerUrl+"app/", cvjsRoomPolygonBaseAttributes, cvjsRoomPolygonHighlightAttributes, cvjsRoomPolygonSelectAttributes, my_cvjsPopUpBody);

		//      cvjs_InitCADViewer_highLight_popUp_app("floorPlan", ServerUrl+ "/cadviewer/app/", cvjsRoomPolygonBaseAttributes, cvjsRoomPolygonHighlightAttributes, cvjsRoomPolygonSelectAttributes, my_cvjsPopUpBody );
		cadviewer.cvjs_InitCADViewer_highLight_popUp_app("floorPlan", "/cadviewer/app/", BaseAttributes, HighlightAttributes, SelectAttributes, my_cvjsPopUpBody );
				
		// set the location to license key, typically the js folder in main app application folder ../app/cv/
		//cadviewer.cvjs_setLicenseKeyPath("/cadviewer/app/cv/");
		// alternatively, set the key directly, by pasting in the cvKey portion of the cvlicense.js file, note the JSON \" around all entities 	 
		cadviewer.cvjs_setLicenseKeyDirect('{ \"cvKey\": \"00110010 00110010 00110000 00110001 00110010 00110000 00110100 00110001 00110100 00111000 00110001 00110100 00110101 00110001 00110101 00110111 00110001 00110101 00111001 00110001 00110100 00111000 00110001 00110101 00110010 00110001 00110100 00110101 00110001 00110100 00110001 00110001 00110100 00110000 00110001 00111001 00110111 00110010 00110000 00110111 00110010 00110000 00110110 00110010 00110000 00110001 00110010 00110001 00110000 00110010 00110000 00111000 00110010 00110001 00110000 00110010 00110000 00111000 00110010 00110001 00110000 00110010 00110000 00110111 00110001 00111001 00111000 00110010 00110000 00110110 00110010 00110000 00111000 00110010 00110000 00110110 00110010 00110000 00110101 00110010 00110001 00110001 00110010 00110000 00111000 00110010 00110000 00110111 00110010 00110001 00110001 00110010 00110000 00110101 00110010 00110000 00110111 00110001 00111001 00111000 00110001 00110100 00110001 00110001 00110100 00110100 00110001 00110101 00111001 00110001 00110101 00110111 00110001 00110101 00110101 \" }');		 
			
		// Sets the icon interface for viewing, layerhanding, measurement, etc. only
		//cvjs_setIconInterfaceControls_ViewingOnly();

		// disable canvas interface.  For developers building their own interface
		// cvjs_setIconInterfaceControls_DisableIcons(true);


		cadviewer.cvjs_allowFileLoadToServer(true);
		
		//		cvjs_setUrl_singleDoubleClick(1);
		//		cvjs_encapsulateUrl_callback(true);
		
		// NOTE BELOW: THESE SETTINGS ARE FOR SERVER CONTROLS FOR UPLOAD OF REDLINES

		// NOTE BELOW: THESE SETTINGS ARE FOR SERVER CONTROLS FOR UPLOAD OF REDLINES, FILES, SPACE OBJECTS
		cadviewer.cvjs_setServerFileLocation_AbsolutePaths(ServerLocation+'/content/drawings/dwg/', ServerBackEndUrl+'content/drawings/dwg/',"","");
		cadviewer.cvjs_setRedlinesAbsolutePath(ServerBackEndUrl+'/content/redlines/fileloader_610/', ServerLocation+'/content/redlines/fileloader_610/');
		cadviewer.cvjs_setSpaceObjectsAbsolutePath(ServerBackEndUrl+'/content/spaceObjects/', ServerLocation+'/content/spaceObjects/');
		cadviewer.cvjs_setInsertImageObjectsAbsolutePath(ServerBackEndUrl+'/content/inserted_image_objects/', ServerLocation+'/content/inserted_image_objects/')


		
		
		cadviewer.cvjs_conversion_clearAXconversionParameters();

		// process blocks with a given name, in this case "audiovisual"
		cadviewer.cvjs_conversion_addAXconversionParameter("blockname", "audiovisual");		 

		// process all invisible attributes in the block 
		cadviewer.cvjs_conversion_addAXconversionParameter("ia", "");		 

		// open the modelspace 
		cadviewer.cvjs_conversion_addAXconversionParameter("model", "");		 
							
		// Load file - needs the svg div name and name and path of file to load
		cadviewer.cvjs_LoadDrawing("floorPlan", FileName );

		// set maximum CADViewer canvas side
		cadviewer.cvjs_resizeWindow_position("floorPlan" );

		// alternatively set a fixed CADViewer canvas size
		//	cvjs_resizeWindow_fixedSize(600, 400, "floorPlan");			   
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this._handleWindowResize);
	}


	_handleWindowResize () {

        console.log("_handleResize")
            // we put the resize in a try-catch in case the init_CADViewer() has not initialized yet, and values are zero
        try{    
            cadviewer.cvjs_resizeWindow_position("floorPlan" );
         //	window.vjs_resizeWindow_fixedSize(600, 400, "floorPlan");		

        } 
        catch(err) {console.log(err);}
    }

    render(){
        return (    
              <div className="CADViewerBlocks01"> 
					{/*This is the CADViewer floorplan div declaration*/}
					<div id="floorPlan" >
					</div>
					{/*End of CADViewer declaration*/}.
			  </div>
        );
    }
}

export default CADViewerBlocks01;




