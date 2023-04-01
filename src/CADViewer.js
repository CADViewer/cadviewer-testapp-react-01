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


export function retrieve_redlines_stickynotes(){
	cadviewer.cvjs_setAllRedlineStickyNoteObjects(myredlinestickynoteObjects);
}



export function setOnloadEndFlag(flag){
	onloadEndFlag2 = flag;
}



var  selected_handles = [];
var  handle_selector = false;
var  current_selected_handle = "";

var onloadEndFlag1 = false;   // set this to true to download display svg and overlay json file on load
var onloadEndFlag2 = false;   // set this to true to overlay with a json object


var FileName = "";

// We should to define all the CADViewer methods in which we are getting information return from CADViewer
// THEY CAN BE PLACEHOLDERS ONLY 


//export function cvjs_OnLoadEnd(){

function cvjs_OnLoadEnd(){
	// generic callback method, called when the drawing is loaded
	// here you fill in your stuff, call DB, set up arrays, etc..
	// this method MUST be retained as a dummy method! - if not implemeted -

	// set maximum CADViewer canvas side  - as component has been rendered at this point
	cadviewer.cvjs_resizeWindow_position("floorPlan" );



	cadviewer.cvjs_hideSpaceObjectID("107");

	cadviewer.cvjs_resetZoomPan("floorPlan");

	var user_name = "Bob Smith";
	var user_id = "user_1";

	// set a value for redlines
	cadviewer.cvjs_setCurrentStickyNoteValues_NameUserId(user_name, user_id );
	cadviewer.cvjs_setCurrentRedlineValues_NameUserid(user_name, user_id);
	// cadviewer.cvjs_dragBackgroundToFront_SVG("floorPlan");					
	//cvjs_initZeroWidthHandling("floorPlan", 1.0);			

	textLayer1 = cadviewer.cvjs_clearLayer(textLayer1);

	
	// capture processed SVG for storage or processing. 
	if (onloadEndFlag1){
		var mySVG = cadviewer.cvjs_extractSVGfromCanvas("floorPlan");
		// download as SVG file
		cadviewer.cvjs_downloadObjectAsFile("testSVGprocessed.svg", mySVG);

		// download non processed SVG file
		var mySVGnotprocessed = cadviewer.cvjs_returnNonPreprocessedSVG();
		cadviewer.cvjs_downloadObjectAsFile("testSVGnotprocessed.svg", mySVGnotprocessed);
		

		// get the data content link to pull serverside svg/svgz file
		var mySVGzlink = cadviewer.cvjs_restAPI_getSVGContentData(true);
		console.log("endpoint to pickup on server: "+mySVGzlink);


		// get all space objects
		var SpaceObjects = cadviewer.cvjs_returnAllSpaceObjects()
		cadviewer.cvjs_downloadObjectAsFile("testSpaceObjects.json", JSON.stringify(SpaceObjects));

	}
	
	
	// if loading a SVG, decorate with spaceobjects
	if (onloadEndFlag2){
		cadviewer.cvjs_loadSpaceObjectsDirect("floorPlan", "http://localhost:3000/content/SpaceObjects/testSpaceObjects.json")
//		cadviewer.cvjs_loadSpaceObjectsDirect("floorPlan", "http://localhost:3000/content/SpaceObjects/testSpaceObjects2.json")


	}


	// NOTE - FOR NPM FIRST INSTALL , we load the JSON object with spaces too!
	//cadviewer.cvjs_loadSpaceObjectsDirect("floorPlan", "https://onlinedemo.cadviewer.com/cadviewer_7_0/php/load-demo-file-npm-install.php?file=spaceobject-npm-demo-01.json")
	// REMOVE WHEN LOADING FROM CAD SERVER


	cadviewer.cvjs_setCurrentRedlineValues_NameUserid(user_name, user_id);


	// THIS ILLUSTRATES HOW TO TURN OFF LAYERS ON LOAD ..... sample drawing may not have these layers...
	cadviewer.cvjs_LayerOff("EC1 Space Names");
	cadviewer.cvjs_LayerOff("EC1 Space Status Descs");
	cadviewer.cvjs_LayerOff("EC1 Space Project");



	// this illustrates how to set rotated watermarks
	//cadviewer.cvjs_setWatermarks("Hello World-你好世界!", "这个真是好东西！2022-09-01", "#A3A3A3", true);



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


var myobject;
var myredlineObjects = {};
var mystickynoteObjects = {};
var myredlinestickynoteObjects = {};

// Callback Method on Creation and Delete 
//export function cvjs_graphicalObjectOnChange(type, graphicalObject, spaceID){
function cvjs_graphicalObjectOnChange(type, graphicalObject, spaceID){
	// do something with the graphics object created! 
//	window.alert("CALLBACK: cvjs_graphicalObjectOnChange: "+type+" "+graphicalObject+" "+spaceID+" indexSpace: "+graphicalObject.toLowerCase().indexOf("space"));
	console.log("CALLBACK: cvjs_graphicalObjectOnChange: "+type+" "+graphicalObject+" "+spaceID+" indexSpace: "+graphicalObject.toLowerCase().indexOf("space"));


	if (graphicalObject.toLowerCase().indexOf("space")!==-1){
		myobject = cadviewer.cvjs_returnSpaceObjectID(spaceID);
		console.log("This Object "+myobject.id+" with name "+myobject.name+" has Parent: "+myobject.parent);
	}



	// SPACE OBJECTS


	if (type == 'Create' && graphicalObject.toLowerCase().indexOf("space")>-1 && graphicalObject.toLowerCase().indexOf("circle")==-1){
			
		/**
		 * Return a JSON structure of all content of a given ID: <br>
		* 	var jsonStructure =  	{	"path": path,
		*								"tags": tags, 
		*								"node": node, 
		*								"area": area, 
		*								"outerhtml": outerHTML, 
		*								"occupancy": occupancy, 
		*								"name": name, 
		*								"type": type, 
		*								"id": id, 
		*								"defaultcolor": defaultcolor, 
		*								"highlightcolor": highlightcolor, 
		*								"selectcolor": selectcolor, 
		*								"layer": layer, 
		*								"group": group, 
		*								"linked": linked, 
		*								"attributes": attributes, 
		*								"attributeStatus": attributeStatus, 
		*								"displaySpaceObjects": displaySpaceObjects,
		*								"translate_x": translate_x, 
		*								"translate_y": translate_y, 
		*								"scale_x": scale_x ,
		*								"scale_y": scale_y ,
		*								"rotate": rotate, 
		*								"transform": transform, 
		*								"svgx": svgx, 
		*								"svgy": svgx, 
		*								"dwgx": dwgx, 
		*								"dwgy": dwgy , 
		*                               "customContent" : mycustomcontent,
		*                               "pageNumber" : "",
		*                               "pageName" : "",
		*                               "block" : "",
		*                               "blockAttributeId" : "",
		*                               "blockAttributeCount" : ""
		*                               "clickhandler" : "enable",
		*                               "parent" : "none",
		*                               }
 		* @param {string} spaceID - Id of the Space Object to return
		* @return {Object} jsonSpaceObject - Object with the entire space objects content
		*/

		myobject = cadviewer.cvjs_returnSpaceObjectID(spaceID);
		// I can save this object into my database, and then use command 
		// cvjs_setSpaceObjectDirect(jsonSpaceObject) 
		// when I am recreating the content of the drawing at load
		// for the fun of it, display the SVG geometry of the space:			
		// console.log("This is the SVG: "+myobject.outerhtml);



		// NOTE! - When an object is created, the application programmer can simply give 
		// the object a name matching a database, if needed. 
		/*
		var newName = "ID"+Math.floor(Math.random() * 1000000);
		console.log("OnloadEnd new object created name:"+myobject.name+ " id:"+myobject.id+" new name"+newName)
		cadviewer.cvjs_changeSpaceObjectName(myobject.id, newName)
		*/


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
	
	// REDLINE & STICKYNOTE OBJECTS


		// REDLINES
		if (type == 'Create' && graphicalObject.toLowerCase().indexOf("redline")>-1 ){
			myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects();   // cadviewer 6
            myredlinestickynoteObjects = cadviewer.cvjs_returnAllRedlineStickyNoteObjects();  //cadviewer 7
			console.log("red: "+JSON.stringify(myredlineObjects));
			// 7.0.15
		}

		if (type == 'Delete' && graphicalObject.toLowerCase().indexOf("redline")>-1 ){		
			myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects();   // cadviewer 6
            myredlinestickynoteObjects = cadviewer.cvjs_returnAllRedlineStickyNoteObjects();  //cadviewer 7
			console.log("red: "+JSON.stringify(myredlineObjects));
		}			

		if (type == 'Create' && graphicalObject.toLowerCase().indexOf("stickynote")>-1){
			myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects();   // cadviewer 6
            myredlinestickynoteObjects = cadviewer.cvjs_returnAllRedlineStickyNoteObjects();  //cadviewer 7
			console.log("note:"+JSON.stringify(mystickynoteObjects));
		}


		if (type == 'Delete' && graphicalObject.toLowerCase().indexOf("stickynote")>-1 ){
			myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects();   // cadviewer 6
            myredlinestickynoteObjects = cadviewer.cvjs_returnAllRedlineStickyNoteObjects();  //cadviewer 7
			console.log("note:"+JSON.stringify(mystickynoteObjects));
		}


		if (type == 'Edit' && graphicalObject.toLowerCase().indexOf("stickynote")>-1 ){
			myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects();   // cadviewer 6
            myredlinestickynoteObjects = cadviewer.cvjs_returnAllRedlineStickyNoteObjects();  //cadviewer 7
			console.log("note:"+JSON.stringify(mystickynoteObjects));
		}

		if (type == 'Move' && graphicalObject.toLowerCase().indexOf("stickynote")>-1 ){
			myredlineObjects = cadviewer.cvjs_returnAllRedlineObjects();   // cadviewer 6
            myredlinestickynoteObjects = cadviewer.cvjs_returnAllRedlineStickyNoteObjects();  //cadviewer 7
			console.log("note:"+JSON.stringify(mystickynoteObjects));
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


var mouseover = false;
var mouseclick = false;
var customclickcontrol = false;


// ENABLE ALL API EVENT HANDLES FOR AUTOCAD Handles
function cvjs_mousedown(id, handle, entity){

	console.log("cvjs_mousedown");


    if (customclickcontrol){
        if (!mouseclick)
        mouseclick = true;
    }

	// TEST - when click move to center with 300% around block handle 
	cadviewer.cvjs_zoomHere_Handle(handle, 3.0, "floorPlan");
	
	// we cannot highlight because we have moved the mouse or finger out
	// remove cadviewer.cvjs_mouseout_handleObjectStyles(id, handle); and it will highlight

	//cadviewer.cvjs_HighlightHandleObjectStyles("#F00", 2.0, 1.0, true, id, handle);

}

var insertsensor = false


function cvjs_click(id, handle, entity, path, xpos, ypos){

	console.log("click "+id+"  "+handle+" xpos="+xpos+" ypos="+ypos);

	if (!insertsensor) return;


  // if there is no x,y we simply return
  if (xpos == undefined || ypos == undefined) return;

  if (customclickcontrol){
	  if (mouseclick)
		  mouseclick = false;
  }

  // if we click on an object, then we add to the handle list
  if (handle_selector){
	  selected_handles.push({id,handle});
	  current_selected_handle = handle;
  }

  var loadSpaceImage_Location = "data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmlld0JveD0iLTExMDAgLTIwMCAyMjAwIDIyMDAiCiAgIGhlaWdodD0iMjIwMCIKICAgd2lkdGg9IjIyMDAiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlkPSJzdmcyIgogICB2ZXJzaW9uPSIxLjEiPjxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTgiPjxyZGY6UkRGPjxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj48ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzCiAgICAgaWQ9ImRlZnM2IiAvPjxnCiAgICAgaWQ9ImcxMCI+PGcKICAgICAgIGlkPSJnMTIiPjxwYXRoCiAgICAgICAgIGlkPSJwYXRoNzIiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNlMTFhMjI7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmUiCiAgICAgICAgIGQ9Im0gNjQ5LjE0LDAgYyAtNDMyLjc4LC05Mi4xOSAtODY1LjQ5LC05Mi4xOSAtMTI5OC4yOCwwIC0xMjIuMTIsMjYuMDEgLTIxNy4yOCwxMjEuMTcgLTI0My4zLDI0My4zIC05Mi4xOCw0MzIuNzggLTkyLjE4LDg2NS40OSAwLDEyOTguMjggMjYuMDIsMTIyLjEyIDEyMS4xOCwyMTcuMjggMjQzLjMsMjQzLjI5IDQzMi43OSw5Mi4xOSA4NjUuNSw5Mi4xOSAxMjk4LjI4LDAgMTIyLjEzLC0yNi4wMSAyMTcuMjksLTEyMS4xNyAyNDMuMywtMjQzLjI5IDkyLjE5LC00MzIuNzkgOTIuMTksLTg2NS41IDAsLTEyOTguMjggLTI2LjAxLC0xMjIuMTMgLTEyMS4xNywtMjE3LjI5IC0yNDMuMywtMjQzLjMiIC8+PHBhdGgKICAgICAgICAgaWQ9InBhdGg3NCIKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIKICAgICAgICAgZD0ibSAwLDE0MDcuMzQgYyAtMTguODgsMCAtMzQuMjUsLTE1LjM2IC0zNC4yNSwtMzQuMjUgdiAtNzI0LjggYyAwLC0yMC40MSAtMTAuNTksLTM5LjM2IC0yNy45OCwtNTAuMDUgLTM1LjY4LC0yMS45NSAtNTYuOTksLTU5LjkgLTU2Ljk5LC0xMDEuNDkgMCwtNjUuNzMgNTMuNDksLTExOS4yMiAxMTkuMjIsLTExOS4yMiA2NS43NCwwIDExOS4yMiw1My40OSAxMTkuMjIsMTE5LjIyIDAsNDEuNTkgLTIxLjMxLDc5LjU0IC01Ni45OSwxMDEuNDkgLTE3LjM4LDEwLjY5IC0yNy45NywyOS42NCAtMjcuOTcsNTAuMDUgdiA3MjQuOCBjIDAsMTguODkgLTE1LjM3LDM0LjI1IC0zNC4yNiwzNC4yNSB6IG0gMCwtMTE0Ny4zNCBjIC0xMzAuNTQsMCAtMjM2Ljc0LDEwNi4yMSAtMjM2Ljc0LDIzNi43NSAwLDcxLjE1IDMxLjIyLDEzNi44NSA4NC45NiwxODEuNTMgdiA2OTQuODEgYyAwLDgzLjcgNjguMDksMTUxLjc4IDE1MS43OCwxNTEuNzggODMuNjksMCAxNTEuNzgsLTY4LjA4IDE1MS43OCwtMTUxLjc4IHYgLTY5NC44MSBjIDUzLjc0LC00NC42OCA4NC45NywtMTEwLjM4IDg0Ljk3LC0xODEuNTMgMCwtMTMwLjU0IC0xMDYuMjEsLTIzNi43NSAtMjM2Ljc1LC0yMzYuNzUiIC8+PHBhdGgKICAgICAgICAgaWQ9InBhdGg3NiIKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIKICAgICAgICAgZD0ibSAzODguMTAsMTQ1Ni42NSBjIC0yNi41MSwwIC00OC4wOCwtMjEuNTcgLTQ4LjA4LC00OC4wOCAwLC0yNi41MSAyMS41NywtNDguMDggNDguMDgsLTQ4LjA4IDI2LjUxLDAgNDguMDgsMjEuNTcgNDguMDgsNDguMDggMCwyNi41MSAtMjEuNTcsNDguMDggLTQ4LjA4LDQ4LjA4IHogbSAwLC0yMTMuNjkgYyAtOTEuMzIsMCAtMTY1LjYxLDc0LjI5IC0xNjUuNjEsMTY1LjYxIDAsOTEuMzIgNzQuMjksMTY1LjYxIDE2NS42MSwxNjUuNjEgOTEuMzIsMCAxNjUuNjEsLTc0LjI5IDE2NS42MSwtMTY1LjYxIDAsLTkxLjMyIC03NC4yOSwtMTY1LjYxIC0xNjUuNjEsLTE2NS42MSIgLz4KPC9nPjwvZz48L3N2Zz4="

  var baseobject = "http://localhost:3000/content/customInsertSpaceObjectMenu/images/sensor_c.svg"
  var id = "myID_"+ Math.floor(Math.random() * 10000);
  var type = "sensor";
  var layer = "mylayer";
  cadviewer.cvjs_setImageSpaceObjectParameters(baseobject, id, type, layer);
  // cadviewer.cvjs_setImageSpaceObjectParameters(loadSpaceImage_Location, id, type, layer);
  cadviewer.cvjs_setGlobalSpaceImageObjectScaleFactor(1.0);

  //console.log("cvjs_addFixedSizeImageSpaceObjectXY");
  cadviewer.cvjs_addFixedSizeImageSpaceObjectXY("floorPlan", xpos, ypos)
  //cvjs_addFixedSizeImageSpaceObject("floorPlan");

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

	console.log("mouseover "+id+"  "+handle+"  "+jQuery("#"+id).css("color"));
	
		if (customclickcontrol){
			if (!mouseover){
				mouseover = true;
				if (!mouseclick) cadviewer.cvjs_changeSpaceFixedLocation(id);
			}
		}
	
	
		//cvjs_mouseover_handleObjectPopUp(id, handle);	
	}
	
	function cvjs_mouseleave(id, handle, entity){
	
		console.log("mouseleave "+id+"  "+handle+"  "+jQuery("#"+id).css("color"));
	
		if (customclickcontrol){
			mouseover = false;
			console.log("mouseleave variable mouseclick: "+mouseclick);
			if (!mouseclick)
				cadviewer.cvjs_hideOnlyPop();
		}
	
	}
	


function cvjs_mouseenter(id, handle, entity){
//	cvjs_mouseenter_handleObjectStyles("#a0a000", 4.0, 1.0, id, handle);
//	cvjs_mouseenter_handleObjectStyles("#ffcccb", 5.0, 0.7, true, id, handle);

console.log("cvjs_mouseenter");


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

function cvjs_customCommand_01(){
	window.alert("Hello click! cvjs_customCommand_01");
};
function cvjs_customCommand_02(){
	window.alert("Hello click! cvjs_customCommand_02");
};
function cvjs_customCommand_03(){
	window.alert("Hello click! cvjs_customCommand_03");
};
function cvjs_customCommand_04(){
	window.alert("Hello click! cvjs_customCommand_04");
};
function cvjs_customCommand_05(){
	window.alert("Hello click! cvjs_customCommand_05");
};
function cvjs_customCommand_06(){
	window.alert("Hello click! cvjs_customCommand_06");
};
function cvjs_customCommand_07(){
	window.alert("Hello click! cvjs_customCommand_07");
};
function cvjs_customCommand_08(){
	window.alert("Hello click! cvjs_customCommand_08");
};
function cvjs_customCommand_09(){
	window.alert("Hello click! cvjs_customCommand_09");
};
function cvjs_customCommand_10(){
	window.alert("Hello click! cvjs_customCommand_10");
};
function cvjs_customCommand_11(){
	window.alert("Hello click! cvjs_customCommand_11");
};
function cvjs_customCommand_12(){
	window.alert("Hello click! cvjs_customCommand_12");
};
function cvjs_customCommand_13(){
	window.alert("Hello click! cvjs_customCommand_13");
};
function cvjs_customCommand_14(){
	window.alert("Hello click! cvjs_customCommand_14");
};
function cvjs_customCommand_15(){
	window.alert("Hello click! cvjs_customCommand_15");
};
function cvjs_customCommand_16(){
	window.alert("Hello click! cvjs_customCommand_16");
};
function cvjs_customCommand_17(){
	window.alert("Hello click! cvjs_customCommand_17");
};
function cvjs_customCommand_18(){
	window.alert("Hello click! cvjs_customCommand_18");
};
function cvjs_customCommand_19(){
	window.alert("Hello click! cvjs_customCommand_19");
};
function cvjs_customCommand_20(){
	window.alert("Hello click! cvjs_customCommand_20");
};


function cvjs_insertSpaceObjectCustomCodePlaceholder(){
	console.log("callback for spaceobject insertion, do custom checks here if false the insertion is aborted, if true continued as usual");
	return true;
};



 


// Dynamic Modal Call-back

function myCustomPopUpBody(rmid){

	// set custom color on modal
	//cadviewer.cvjs_styleQTip_color(true, '#3DCD5D', '#293133', '#293133', '#293133', '#293133');

	console.log("click on myCustomPopUpBody: "+rmid+" I now change the pop-up menu:");
	// make your own popup based on callback
	var my_cvjsPopUpBody = "";

	// we make 3 random modals
	var modalnumber = Math.floor(Math.random() * 6.0);


	if (modalnumber == 0){
		// standard modal
		// standard 3 item menu
		//  cvjs_modal_1 sets a suitable size 

		// style=\"background-color: none; color: #CBCBCB;\"

		my_cvjsPopUpBody = "<div  class=\"cvjs_modal_1\" id=\"my_own_clickmenu1()\">Custom<br>Menu 1<br><i class=\'fa fa-undo\'></i></div>";
		my_cvjsPopUpBody += "<div class=\"cvjs_modal_1\" id=\"my_own_clickmenu2()\">Custom<br>Menu 2<br><i class=\'fa fa-info-circle\'></i></div>";
		my_cvjsPopUpBody += "<div class=\"cvjs_modal_1\" id=\"cvjs_zoomHere()\">Zoom<br>Here<br><i class=\'fa fa-search-plus\'></i></div>";
	}
	else
	if (modalnumber == 1){
		// column based, but just two click menus
		my_cvjsPopUpBody = "<div class=\"cvjs_modal_1\" id=\"my_own_clickmenu1()\">Custom<br>Menu One<br><i class=\'fa fa-undo\'></i></div>";
		my_cvjsPopUpBody += "<div class=\"cvjs_modal_1\" id=\"cvjs_zoomHere()\">Zoom<br>Here<br><i class=\'fa fa-reply\'></i></div>";
	}
	else
	if (modalnumber >=2){
		// row based content with callback

		var str = " "+rmid;
		my_cvjsPopUpBody = "<div>";
		my_cvjsPopUpBody += "Element ID: <span style=\"color: darkblue;cursor: pointer;\" id=\"custom_callback1()\" >"+str+"</span><br>";

		var branch = Math.floor(Math.random() * 2.0);

		if (branch == 0){
			str = " Presumed Wall Void";	
			my_cvjsPopUpBody += "Survey: <span style=\"color: darkblue;cursor: pointer;\" id=\"custom_callback2()\" >"+str+"</span><br>";
			str = " Service Alert";
			my_cvjsPopUpBody += "Notice: <span style=\"color: darkblue;cursor: pointer;\" id=\"custom_callback3()\" >"+str+"</span><br>";
		
		}else{
			str = "Presumed Ceiling Void";	
			my_cvjsPopUpBody += "Survey: <span style=\"color: darkblue;cursor: pointer;\" id=\"custom_callback4()\" >"+str+"</span><br>";
			str = "Evaluation Pending";
			my_cvjsPopUpBody += "Notice: <span style=\"color: darkblue;cursor: pointer;\" id=\"custom_callback5()\" >"+str+"</span><br>";

		}
//		my_cvjsPopUpBody += "Status: <a href=\"javascript:custom_callback5()\"><strong>More Info</strong> <i class=\"glyphicon glyphicon-transfer\" id=\"custom_callback5()\"></i></a> ";

		my_cvjsPopUpBody += "Status: <span style=\"color: darkblue;cursor: pointer;\" id=\"custom_callback6()\" >"+"<strong>More Info</strong>"+"   <i class=\'fa fa-reply\'></i></span><br>";
		my_cvjsPopUpBody += "</div>";
	}

	return my_cvjsPopUpBody;
}

function populateMyCustomPopUpBody(rmid, node){
	console.log(" we actually have a second callback to change content of the the pop-up menu after myCustomPopUpBody (developed originally for Angular2) populateMyCustomPopUpBody: "+rmid+"  "+node);
}




class CADViewer extends Component {

	async componentDidMount () {

		// window.alert("loading 6.4.05");

		window.addEventListener('resize', this._handleWindowResize);
	

		// connecting to Servlets Server
		//var ServerBackEndUrl = "http://localhost:8080/cadviewer/";
		//var ServerLocation = "c:/xampp/tomcat/webapps/cadviewer/";

		// Connecting to .NET Core Server
		//var ServerBackEndUrl = "http://localhost:53737/";
		//var ServerLocation = "c:/visualstudio/cadviewer/";


		// Standard NodeJS Server
		var ServerBackEndUrl = "http://localhost:3000/";
		var ServerLocation = "";    // leave blank


		// Standard Dotnet Server
		//	var ServerBackEndUrl = "http://localhost:44371/";
		// Connecting to .NET Core Server
		//var ServerBackEndUrl = "http://localhost:53737/";
//		var ServerLocation = "";





		// ONLINE TEST SERVER
		//var ServerBackEndUrl = "http://convertcad.online:3000/";
		//var ServerLocation = "/home/cadviewer/convertcad.online/cadviewer-conversion-server/";


		// PHP server
		//var ServerBackEndUrl = "http://localhost:/cadviewer/";


		// Standard Front-end
		var ServerUrl = "http://localhost:8000/";
	



//		cadviewer.cvjs_setIconImageSize("floorPlan",34, 44);  // standard sizes, no need to change these, modify if 7 skin and want to scale
//      cadviewer.cvjs_setCADViewerInterfaceVersion(6);  // old skin,  version 7 is new skin, which is default 


		// NOTE - FOR NPM FIRST INSTALL
		// Loading pre-conveted DWG file from CADViewer Server. Install CADViewer NodeJS Conversion Server, and pull DWG from that. 
		// Uncomment this, then CADViewer Conversion Server is up running. 
//		FileName = "https://onlinedemo.cadviewer.com/cadviewer_7_0/php/load-demo-file-npm-install.php?file=base_xref_json_Mar_15_H11_8.svg";
		//FileName = "https://onlinedemo.cadviewer.com/cadviewer_7_0/php/load-demo-file-npm-install.php?file=M0-generic-06.svg";
		// REMOVE WHEN LOADING FROM CAD SERVER

	    //Standard file from /content/ folder on CADViewer NodeJS Conversion Server
		FileName = ServerBackEndUrl+ "/content/drawings/dwg/hq17_.dwg";


		cadviewer.cvjs_debugMode(true);
	   // cadviewer.cvjs_setLeafletJS(true);
		
		// Set all paths, and handlers, changes these depending on back-end server
		cadviewer.cvjs_setAllServerPaths_and_Handlers(ServerBackEndUrl, ServerUrl, ServerLocation, "NodeJS", "ReactJS", "floorPlan");
//		cadviewer.cvjs_setAllServerPaths_and_Handlers(ServerBackEndUrl, ServerUrl, ServerLocation, "PHP", "ReactJS", "floorPlan");
//		cadviewer.cvjs_setAllServerPaths_and_Handlers(ServerBackEndUrl, ServerUrl, ServerLocation, "DotNet", "ReactJS", "floorPlan");


        //      Setting all callback methods  - they have to be injected into the CADViewer class componnet

		cadviewer.cvjs_setCallbackMethod("cvjs_insertSpaceObjectCustomCodePlaceholder", cvjs_insertSpaceObjectCustomCodePlaceholder);
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

		// custom callback commands
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
		// custom icon commands
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_01", cvjs_customCommand_01);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_02", cvjs_customCommand_02);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_03", cvjs_customCommand_03);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_04", cvjs_customCommand_04);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_05", cvjs_customCommand_05);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_06", cvjs_customCommand_06);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_07", cvjs_customCommand_07);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_08", cvjs_customCommand_08);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_09", cvjs_customCommand_09);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_10", cvjs_customCommand_10);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_11", cvjs_customCommand_11);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_12", cvjs_customCommand_12);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_13", cvjs_customCommand_13);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_14", cvjs_customCommand_14);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_15", cvjs_customCommand_15);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_16", cvjs_customCommand_16);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_17", cvjs_customCommand_17);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_18", cvjs_customCommand_18);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_19", cvjs_customCommand_19);
        cadviewer.cvjs_setCallbackMethod("cvjs_customCommand_20", cvjs_customCommand_20);



		// END set all callback methods

		  // Location of installation folders
		  // NOTE: THE LOCATION OF THE ServerLocation/ServerUrl VARIABLES ARE DEFINED IN /cadviewer/app/cv/XXXHandlerSettings.js	
		  //	var ServerLocation = 
		  //	var ServerUrl =    
		 cadviewer.cvjs_CADViewerPro(true);
		 
		 // Pass over the location of the installation, will update the internal paths
		 cadviewer.cvjs_PrintToPDFWindowRelativeSize(0.8);
		 cadviewer.cvjs_setFileModalEditMode(false);
	   		   
		//cadviewer.cvjs_setZoomExtentsMode("top");


		cadviewer.cvjs_setCADViewerInterfaceVersion(8);


		 cadviewer.cvjs_DisplayCoordinatesMenu("floorPlan",true);

		// 6.9.18
		// set SpaceObjectsCustomMenu location and json config file,  flag true to display SpaceObject Menu, false to hide
		cadviewer.cvjs_setSpaceObjectsCustomMenu( "/content/customInsertSpaceObjectMenu/", "cadviewercustomspacecommands.json", true);


		// For "Merge DWG" / "Merge PDF" commands, set up the email server to send merged DWG files or merged PDF files with redlines/interactive highlight.
		// See php / xampp documentation on how to prepare your server
		cadviewer.cvjs_emailSettings_PDF_publish("From CAD Server", "my_from_address@mydomain.com", "my_cc_address@mydomain.com", "my_reply_to@mydomain.com");
		   	 
		// CHANGE LANGUAGE - DEFAULT IS ENGLISH	
		cadviewer.cvjs_loadCADViewerLanguage("English", ""); 
		// Available languages:  "English" ; "French, "Korean", "Spanish", "Portuguese", "Chinese-Simplified", "Chinese-Traditional"
		  										//cadviewer.cvjs_loadCADViewerLanguage("English", "/cadviewer/app/cv/cv-pro/custom_language_table/custom_cadviewerProLanguage.xml");

		// Set Icon Menu Interface controls. Users can: 
		// 1: Disable all icon interfaces
		//  cvjs_displayAllInterfaceControls(false, "floorPlan");  // disable all icons for user control of interface

		// 2: Disable either top menu icon menus or navigation menu, or both

		//cvjs_displayTopMenuIconBar(false, "floorPlan");  // disable top menu icon bar
		//cvjs_displayTopNavigationBar(false, "floorPlan");  // disable top navigation bar

		// 3: Users can change the number of top menu icon pages and the content of pages, based on a configuration file in folder /cadviewer/app/cv/cv-pro/menu_config/    		
		cadviewer.cvjs_setTopMenuXML("floorPlan", "cadviewer_full_commands_01.xml", "");  //cadviewer.cvjs_setTopMenuXML("floorPlan", "cadviewer_full_commands_01.xml", "/cadviewer/app/cv/cv-pro/menu_config/");
		//cadviewer.cvjs_setTopMenuXML("floorPlan", "cadviewer_viewonly_nofileload_01.xml", "/cadviewer/app/cv/cv-pro/menu_config/"); //, "/app/cv/cv-pro/menu_config/");



		// Menu including custom commands row on last page
		//cadviewer.cvjs_setTopMenuXML("floorPlan", "cadviewer_menu_all_items_custom_commands.xml", "cadviewer/app/cv/cv-pro/menu_config/");
		



		// Initialize CADViewer  - needs the div name on the svg element on page that contains CADViewerJS and the location of the
		// main application "app" folder. It can be either absolute or relative

		

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



		/** FIXED POP-UP MODAL **/ 
		
			// THIS IS THE DESIGN OF THE pop-up MODAL WHEN CLICKING ON SPACES
		// KEEP METHODS NAME AS IS FOR NOW...............

		var my_cvjsPopUpBody = "<div class=\'cvjs_modal_1\' id=\'my_own_clickmenu1()\'>Custom<br>Menu 1<br><i class=\'fa fa-undo\'></i></div>";
		my_cvjsPopUpBody += "<div class=\'cvjs_modal_1\' id=\'my_own_clickmenu2()\'>Custom<br>Menu 2<br><i class=\'fa fa-info-circle\'></i></div>";
		my_cvjsPopUpBody += "<div class=\'cvjs_modal_1\' id=\'cvjs_zoomHere()\'>Zoom<br>Here<br><i class=\'fa fa-search-plus\'></i></div>";
				
	
		// custom development of call-back modal  - UNCOMMENT TWO CODE LINES BELOW  
		//      Setting Space Object Modals Display to be based on a callback method -

		my_cvjsPopUpBody = "";
		cadviewer.cvjs_setCallbackForModalDisplay(true, myCustomPopUpBody, populateMyCustomPopUpBody)

	
		cadviewer.cvjs_InitCADViewer_highLight_popUp_app("floorPlan", "/assets/cadviewer/app/", BaseAttributes, HighlightAttributes, SelectAttributes, my_cvjsPopUpBody );
		// note second path parameter internally overwritten in case of npm install


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
		cadviewer.cvjs_setRedlinesAbsolutePath(ServerBackEndUrl+'/content/redlines/v7/', ServerLocation+'/content/redlines/v7/', true);
		cadviewer.cvjs_setSpaceObjectsAbsolutePath(ServerBackEndUrl+'/content/spaceObjects/', ServerLocation+'/content/spaceObjects/');
		cadviewer.cvjs_setInsertImageObjectsAbsolutePath(ServerBackEndUrl+'/content/inserted_image_objects/', ServerLocation+'/content/inserted_image_objects/')

			
		cadviewer.cvjs_conversion_clearAXconversionParameters();

	    // process layers for spaces  RL/TL
		//cadviewer.cvjs_conversion_addAXconversionParameter("RL", "RM%24");		 
		//cadviewer.cvjs_conversion_addAXconversionParameter("TL", "RM%24TXT");		 

		cadviewer.cvjs_conversion_addAXconversionParameter("RL", "RM_");		 
		cadviewer.cvjs_conversion_addAXconversionParameter("TL", "RM_TXT");		 
		// calculate areas of spaces
		cadviewer.cvjs_conversion_addAXconversionParameter("LA", "");		 

		// process all handles
		// cadviewer.cvjs_conversion_addAXconversionParameter("HLALL", "");		 

		// open the last saved view in the file
		cadviewer.cvjs_conversion_addAXconversionParameter("model", "");		 
//		cadviewer.cvjs_conversion_addAXconversionParameter("last", "");		 
							
		// Load file - needs the svg div name and name and path of file to load


		cadviewer.cvjs_LoadDrawing("floorPlan", FileName );		
/*
		var mySVG = "PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxjQueryyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iODMwLjAwMDAwMHB0IiBoZWlnaHQ9IjEyODAuMDAwMDAwcHQiIHZpZXdCb3g9IjAgMCA4MzAuMDAwMDAwIDEyODAuMDAwMDAwIgogcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLDEyODAuMDAwMDAwKSBzY2FsZSgwLjEwMDAwMCwtMC4xMDAwMDApIgpmaWxsPSIjZmYwMDAwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMjAiID4KPHBhdGggZD0iTTM4NTUgMTI3ODkgYy01NTUgLTQ0IC0xMDQzIC0xNzYgLTE1MzAgLTQxNCAtMTQ1NyAtNzEyIC0yMzcwIC0yMjIzCi0yMzIyIC0zODQwIDE5IC02MDUgMTUyIC0xMTU1IDQwNiAtMTY4MCAxMDkgLTIyNSAxODMgLTM1MyAzMzEgLTU3NSA2NSAtOTYKODU2IC0xMzY5IDE3NjAgLTI4MjcgOTAzIC0xNDU5IDE2NDYgLTI2NTMgMTY1MCAtMjY1MyA0IDAgNzQ3IDExOTQgMTY1MCAyNjUyCjkwNCAxNDU5IDE2OTUgMjczMiAxNzYwIDI4MjggMTQ4IDIyMiAyMjIgMzUwIDMzMSA1NzUgNDIxIDg2OSA1MjAgMTg2OSAyNzkKMjgyMSAtMjQ0IDk1OCAtODIyIDE3OTUgLTE2NDAgMjM3MSAtNjk2IDQ5MSAtMTU1MSA3NTkgLTI0MDQgNzUyIC05NCAtMSAtMjE2Ci01IC0yNzEgLTEweiBtNjM1IC0xNzY0IGM0NDAgLTgwIDgxMyAtMjcxIDExMjAgLTU3NSA3NjkgLTc2MSA4MjUgLTE5ODAgMTMwCi0yODEyIC0zMzUgLTQwMiAtODE3IC02NjMgLTEzNDQgLTcyOCAtMTE0IC0xNCAtMzc4IC0xNCAtNDkyIDAgLTg1MyAxMDUKLTE1NTAgNzE1IC0xNzY0IDE1NDQgLTE0MSA1NDUgLTUyIDExMzYgMjQzIDE2MTMgMzMwIDUzMSA4NjIgODc2IDE0OTcgOTY4CjEzMCAxOSA0ODEgMTMgNjEwIC0xMHoiLz4KPC9nPgo8L3N2Zz4=";
		cadviewer.cvjs_LoadDrawing_SVG_string("floorPlan",mySVG, "pin.svg", true);

*/		




		// NOTE!set maximum CADViewer canvas side  - once loaded in cvjs_OnLoadEnd()
		// cadviewer.cvjs_resizeWindow_position("floorPlan" );

		// alternatively set a fixed CADViewer canvas size
		//window.alert("resize");
		//cadviewer.cvjs_resizeWindow_fixedSize(200, 300, "floorPlan");			   
		cadviewer.cvjs_resizeWindow_position("floorPlan" );
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this._handleWindowResize);
	}


	_handleWindowResize () {

        console.log("_handleResize")
            // we put the resize in a try-catch in case the init_CADViewer() has not initialized yet, and values are zero
        try{    
            cadviewer.cvjs_resizeWindow_position("floorPlan" );
			//window.alert("resize");
            //cadviewer.cjs_resizeWindow_fixedSize(300, 300, "floorPlan");		

        } 
        catch(err) {console.log(err);}
    }

    render(){
        return (    
              <div className="CADViewer"> 
					{/*This is the CADViewer floorplan div declaration*/}
					<div id="floorPlan">
					</div>
					{/*End of CADViewer declaration*/}.
			  </div>
        );
    }
}

export default CADViewer;




