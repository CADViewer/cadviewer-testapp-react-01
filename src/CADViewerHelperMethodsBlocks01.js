import React, { Component }  from 'react';
import jQuery from 'jquery';
import {findDOMNode } from 'react-dom';
import logo from './logo.svg';
import './CADViewerHelperMethodsBlocks01.css';
import { render } from '@testing-library/react';

// We are only accessing the functional interface of CADViewer, not the canvas, so this import is sufficient
import * as cadviewer from "cadviewer";

import * as CV from "./CADViewerBlocks01.js";




// insert SVG file
var selectedColor = "#0000FF";
var iconObjectCounter = 1;



function insert_from_type_id_image(){

  var loadSpaceImage_Location = "/cadviewer/content/drawings/svg/" + jQuery('#image_sensor_location').val();
  var loadSpaceImage_ID = jQuery('#image_ID').val();
  var loadSpaceImage_Type = jQuery('#image_Type').val();
  var loadSpaceImage_Layer = "cvjs_SpaceLayer";

  cadviewer.cvjs_setImageSpaceObjectParameters(loadSpaceImage_Location, loadSpaceImage_ID, loadSpaceImage_Type, loadSpaceImage_Layer);
  cadviewer.cvjs_addFixedSizeImageSpaceObject("floorPlan");
  iconObjectCounter++;

}












// export to second helper component

 export function setSpaceInputFields(loadSpaceImage_Location, loadSpaceImage_ID, loadSpaceImage_Type, loadSpaceImage_Layer){

  jQuery('#image_sensor_location').val(loadSpaceImage_Location); 
  jQuery('#image_ID').val(loadSpaceImage_ID);
  jQuery('#image_Type').val(loadSpaceImage_Type);
  //var loadSpaceImage_Layer = loadSpaceImage_Layer;

}

/// RELAY LOCK JSON SAMPLE 


////////// FETCH ALL SPACE OBJECTS 

function display_all_objects(){
/*
 * Return a JSON structure with  all Space Object content, each entry is of the form: <br>
 * 	SpaceObjects :[  	{	"path":   path, <br>
 *								"tags": tags, <br>
 *								"node": node, <br>
 *								"area": area, <br>
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
 *								"transform": transform} <br> ]
 * @param {string} spaceID - Id of the Space Object to return
 * @return {Object} jsonSpaceObject - Object with all space objects content
 */

  //   get json obhect with all spaces processed from drawing
  var allSpaceObjects = cadviewer.cvjs_returnAllSpaceObjects();

  var myString = "";
  for (var spc in allSpaceObjects.SpaceObjects){
    console.log(spc);
    myString += "("+allSpaceObjects.SpaceObjects[spc].id+", "+allSpaceObjects.SpaceObjects[spc].area+")";
  }

  window.alert("The spaces with area (id,area): "+myString);

}

//////////  DECORATE TEXT ON SPACES





/////////  CANVAS CONTROL METHODS START


///  HERE ARE ALL THE CUSTOM TEMPLATES TO DO STUFF ON THE CANVAS 

var generic_canvas_flag_first_click_rectangle = false;
var generic_canvas_flag_rectangle= false;
var tPath_r;
var cvjs_RubberBand;
var cvjs_firstX;
var cvjs_firstY;
var cvjs_lastX;
var cvjs_lastY;

var selected_handles = [];
var handle_selector = false;
var current_selected_handle = "";

function cadviewerCanvasMethod01(){

  cadviewer.cvjs_executeCustomCanvasMethod_drag(generic_start_method_01, generic_stop_method_01, generic_move_method_01,'')

}


///// DRAG + CLICK ON CANVAS  - CONSOLE

/**
 * Template start drag method for custom canvas
 */

var generic_start_method_01 = function() {
  console.log("generic_start_method_01");
}

/**
* Template move drag method for custom canvas
*/
var generic_move_method_01 = function(dx,dy,x,y) {

  var svg_x = cadviewer.cvjs_SVG_x(x);
  var svg_y = cadviewer.cvjs_SVG_y(y);
  console.log("generic_move_method_01: dx="+dx+" dy="+dy+" x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);
}

/**
* Template stop drag method for custom canvas
*/
var generic_stop_method_01 = function() {

  cadviewer.cvjs_removeCustomCanvasMethod();
  console.log("REMOVE: generic_stop_method_01");
};

/**
* Template mouse-move method for custom canvas
*/

var generic_mousemove_method_01 = function(e,x,y) {

  var svg_x = cadviewer.cvjs_SVG_x(x);
  var svg_y = cadviewer.cvjs_SVG_y(y);
  
  //cadviewer.cvjs_removeCustomCanvasMethod();
  console.log("generic_mousemove_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);
}

/**
* Template mouse-down method for custom canvas
*/

var generic_mousedown_method_01 = function(e,x,y) {

  var svg_x = cadviewer.cvjs_SVG_x(x);
  var svg_y = cadviewer.cvjs_SVG_y(y);
  
  //cadviewer.cvjs_removeCustomCanvasMethod();
  console.log("generic_mousedown_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);

};

/**
* Template mouse-up method for custom canvas
*/

var generic_mouseup_method_01 = function(e,x,y) {

  var svg_x = cadviewer.cvjs_SVG_x(x);
  var svg_y = cadviewer.cvjs_SVG_y(y);
  
  console.log("generic_mouseup_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);

};

/**
* Template double-click method for custom canvas
*/

var generic_dblclick_method_01 = function(e,x,y) {
  cadviewer.cvjs_removeCustomCanvasMethod();

  var svg_x = cadviewer.cvjs_SVG_x(x);
  var svg_y = cadviewer.cvjs_SVG_y(y);
  console.log("REMOVE: generic_dblclick_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);
};
///// DRAG + CLICK ON CANVAS  - CONSOLE
/////////  CANVAS CONTROL METHODS END

// BLOCK CONTROL METHODS

function AudioVisual(){

  var spaceObjectIds = cadviewer.cvjs_getSpaceObjectIdList();
      console.log(" IDs:"+spaceObjectIds.length);

  var loadSpaceImage_Location = "data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmlld0JveD0iLTExMDAgLTIwMCAyMjAwIDIyMDAiCiAgIGhlaWdodD0iMjIwMCIKICAgd2lkdGg9IjIyMDAiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlkPSJzdmcyIgogICB2ZXJzaW9uPSIxLjEiPjxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTgiPjxyZGY6UkRGPjxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj48ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzCiAgICAgaWQ9ImRlZnM2IiAvPjxnCiAgICAgaWQ9ImcxMCI+PGcKICAgICAgIGlkPSJnMTIiPjxwYXRoCiAgICAgICAgIGlkPSJwYXRoNzIiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNlMTFhMjI7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmUiCiAgICAgICAgIGQ9Im0gNjQ5LjE0LDAgYyAtNDMyLjc4LC05Mi4xOSAtODY1LjQ5LC05Mi4xOSAtMTI5OC4yOCwwIC0xMjIuMTIsMjYuMDEgLTIxNy4yOCwxMjEuMTcgLTI0My4zLDI0My4zIC05Mi4xOCw0MzIuNzggLTkyLjE4LDg2NS40OSAwLDEyOTguMjggMjYuMDIsMTIyLjEyIDEyMS4xOCwyMTcuMjggMjQzLjMsMjQzLjI5IDQzMi43OSw5Mi4xOSA4NjUuNSw5Mi4xOSAxMjk4LjI4LDAgMTIyLjEzLC0yNi4wMSAyMTcuMjksLTEyMS4xNyAyNDMuMywtMjQzLjI5IDkyLjE5LC00MzIuNzkgOTIuMTksLTg2NS41IDAsLTEyOTguMjggLTI2LjAxLC0xMjIuMTMgLTEyMS4xNywtMjE3LjI5IC0yNDMuMywtMjQzLjMiIC8+PHBhdGgKICAgICAgICAgaWQ9InBhdGg3NCIKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIKICAgICAgICAgZD0ibSAwLDE0MDcuMzQgYyAtMTguODgsMCAtMzQuMjUsLTE1LjM2IC0zNC4yNSwtMzQuMjUgdiAtNzI0LjggYyAwLC0yMC40MSAtMTAuNTksLTM5LjM2IC0yNy45OCwtNTAuMDUgLTM1LjY4LC0yMS45NSAtNTYuOTksLTU5LjkgLTU2Ljk5LC0xMDEuNDkgMCwtNjUuNzMgNTMuNDksLTExOS4yMiAxMTkuMjIsLTExOS4yMiA2NS43NCwwIDExOS4yMiw1My40OSAxMTkuMjIsMTE5LjIyIDAsNDEuNTkgLTIxLjMxLDc5LjU0IC01Ni45OSwxMDEuNDkgLTE3LjM4LDEwLjY5IC0yNy45NywyOS42NCAtMjcuOTcsNTAuMDUgdiA3MjQuOCBjIDAsMTguODkgLTE1LjM3LDM0LjI1IC0zNC4yNiwzNC4yNSB6IG0gMCwtMTE0Ny4zNCBjIC0xMzAuNTQsMCAtMjM2Ljc0LDEwNi4yMSAtMjM2Ljc0LDIzNi43NSAwLDcxLjE1IDMxLjIyLDEzNi44NSA4NC45NiwxODEuNTMgdiA2OTQuODEgYyAwLDgzLjcgNjguMDksMTUxLjc4IDE1MS43OCwxNTEuNzggODMuNjksMCAxNTEuNzgsLTY4LjA4IDE1MS43OCwtMTUxLjc4IHYgLTY5NC44MSBjIDUzLjc0LC00NC42OCA4NC45NywtMTEwLjM4IDg0Ljk3LC0xODEuNTMgMCwtMTMwLjU0IC0xMDYuMjEsLTIzNi43NSAtMjM2Ljc1LC0yMzYuNzUiIC8+PHBhdGgKICAgICAgICAgaWQ9InBhdGg3NiIKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZSIKICAgICAgICAgZD0ibSAzODguMTAsMTQ1Ni42NSBjIC0yNi41MSwwIC00OC4wOCwtMjEuNTcgLTQ4LjA4LC00OC4wOCAwLC0yNi41MSAyMS41NywtNDguMDggNDguMDgsLTQ4LjA4IDI2LjUxLDAgNDguMDgsMjEuNTcgNDguMDgsNDguMDggMCwyNi41MSAtMjEuNTcsNDguMDggLTQ4LjA4LDQ4LjA4IHogbSAwLC0yMTMuNjkgYyAtOTEuMzIsMCAtMTY1LjYxLDc0LjI5IC0xNjUuNjEsMTY1LjYxIDAsOTEuMzIgNzQuMjksMTY1LjYxIDE2NS42MSwxNjUuNjEgOTEuMzIsMCAxNjUuNjEsLTc0LjI5IDE2NS42MSwtMTY1LjYxIDAsLTkxLjMyIC03NC4yOSwtMTY1LjYxIC0xNjUuNjEsLTE2NS42MSIgLz4KPC9nPjwvZz48L3N2Zz4="
  var id;

    for (var spc in spaceObjectIds){		
        id = spaceObjectIds[spc];
        console.log("AudioVisual id="+id+" spc:"+spc);
      cadviewer.cvjs_replaceSpaceObjectPathWithImage("floorPlan", id, loadSpaceImage_Location);
    }

  }



  function SigaPS(){

    var spaceObjectIds = cadviewer.cvjs_getSpaceObjectIdList();
    console.log(" IDs:"+spaceObjectIds.length);
  
//    var loadSpaceImage_Location = "http://localhost:3000/content/customInsertSpaceObjectMenu/images/76-Smoke-detector.svg";
    var loadSpaceImage_Location = "http://localhost:3000/content/customInsertSpaceObjectMenu/images/76-Smoke-detector-bg-white.svg";
    var id;
    var myobject;
    var attribute_tag;
    var attribute_value;
    var attribId;
    var s_attribute = "";
      for (var spc in spaceObjectIds){		

        id = spaceObjectIds[spc];
        myobject = cadviewer.cvjs_returnSpaceObjectID(id);

        try {
          // get block attribute:
          // block attributes are listed with  ID_counter , and can be retrived with cvjs:tag and cvjs:value
          s_attribute = "";
          for (var i = 1; i <= myobject.blockAttributeCount; i++) {
                attribId = "#" + myobject.blockAttributeId + "_" + i;
                attribute_tag = jQuery(attribId).attr('cvjs:tag');
                attribute_value = jQuery(attribId).attr('cvjs:value');

                if (attribute_tag == "SIGA-PS" ){
                  s_attribute = attribId ;
                  console.log("s_attribute ="+s_attribute);
                }

                if (attribute_tag == "FWK_DEVICE_ADDRESSES" && attribute_value =="0010020132"){

                  // we try hide any test attributes with tag SIGA-PS
                  // not working, more involved coding needed...
                  //if (s_attribute!= ""){
                  //  jQuery(s_attribute).hide();
                  //  console.log("hide!");
                  // } 
                  console.log("FWK_DEVICE_ADDRESSES 0010020132 id="+id+" spc:"+spc);
                  cadviewer.cvjs_replaceSpaceObjectPathWithImage("floorPlan", id, loadSpaceImage_Location);

                  cadviewer.cvjs_zoomHere_ObjectId(id, 10);

  
                }
          }
        }
        catch(err){
        
        }


      }
  
    }
  


// END BLOCK CONTROL METHODS





class CADViewerHelperMethodsBlocks01 extends Component {


  async componentDidMount () {

  }  

  render(){
    return (
      <div className="CADViewerHelperMethodsBlocks01">

{/*}
        CADViewer: Space Objects and Canvas Methods Interface  <font size="-1"> - Read more: <strong><a href="https://cadviewer.com/cadviewertechdocs/samples/spaceicons/">Tech Docs</a></strong>. Contact: <a href="mailto:developer@tailormade.com">developer@tailormade.com</a>.</font></h4>
        New Space Type/ID/Image:&nbsp; <button className="w3-button demo" onClick="insert_from_type_id_image();">New Space Object</button>&nbsp;&nbsp; Update Group ID: &nbsp; <button className="w3-button demo" onClick="update_group_with_path();">Add Path Object to Group</button>&nbsp; 
        <br/>Second group ID: &nbsp; &nbsp;<input type="text" id="group_2" defaultValue="NODE_xx" />&nbsp;<input type="text" id="group_2_subid" defaultValue="id_01" />&nbsp;<button className="w3-button demo" onClick="update_group_with_group();">Add Group to Group</button>&nbsp; &nbsp; <button className="w3-button demo" onClick="hide_object_in_group();">Hide Object In Group</button>&nbsp;&nbsp;  <button className="w3-button demo" onClick="show_object_in_group();">Show Object In Group</button>&nbsp;
    */}

    <canvas id="dummy" width="5" height="21"></canvas>
	  <strong>Space Type:</strong>&nbsp; 	<input type="text" id="image_Type" defaultValue="Wifi" />
    <strong>Space ID:</strong>&nbsp; 	<input type="text" id="image_ID" defaultValue="wifi_1" />
    <strong>Space Image:</strong>&nbsp; 	<input type="text" id="image_sensor_location" defaultValue="wifi_25.svg" />
    <strong>Create:</strong>&nbsp; 	<button className="w3-button demo" onClick={insert_from_type_id_image}>New Space Object</button>
    <br/>
    <canvas id="dummy" width="5" height="22"></canvas><strong>Block Substition:&nbsp;</strong>
    <button className="w3-button demo" onClick={AudioVisual}>AudioVisual</button>
		<button className="w3-button demo" onClick={cadviewer.cvjs_hideOnlyPop}>Clear Spaces</button>
    <button className="w3-button demo" onClick={SigaPS}>Sigs-PS</button>
    <br/>
    <canvas id="dummy" width="5" height="22"></canvas>
    <strong>Custom Interactive Canvas Samples:&nbsp;</strong><canvas id="dummy" width="10" height="10"></canvas>
		<button className="w3-button demo" onClick={cadviewerCanvasMethod01}>Canvas-DRAG (console)</button>
{/*}
*/} 
          </div>
    );
  }
}

export default CADViewerHelperMethodsBlocks01;
