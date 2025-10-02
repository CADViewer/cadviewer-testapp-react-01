import React, { Component }  from 'react';
import JQ from 'jquery';
import {findDOMNode } from 'react-dom';
import logo from './logo.svg';
import './CADViewerHelperMethods.css';
import { render } from '@testing-library/react';

// We are only accessing the functional interface of CADViewer, not the canvas, so this import is sufficient
import * as cadviewer from "cadviewer";
import * as CV from "./CADViewer.js";


// export to second helper component

 export function setSpaceInputFields(loadSpaceImage_Location, loadSpaceImage_ID, loadSpaceImage_Type, loadSpaceImage_Layer){

  JQ('#image_sensor_location').val(loadSpaceImage_Location); 
  JQ('#image_ID').val(loadSpaceImage_ID);
  JQ('#image_Type').val(loadSpaceImage_Type);
  //var loadSpaceImage_Layer = loadSpaceImage_Layer;

}


export function echo_cvjs_mousedown(id, handle, entity){

// here we get the mouse down event from the canvas

  
  console.log("In CADViewerHelperMethods, with Echo from CADViewer.js: "+id+" "+handle+" "+entity);


}



export function cvjs_QuickCountCallback(count){

  // here we get the quick counts


  var page = cadviewer.cvjs_getCurrentPage();
  var pagename = cadviewer.cvjs_getCurrentPageName();


     
    window.alert("In CADViewerHelperMethods, with Echo from CADViewer.js: QuickCount "+count+"  on page:"+page+" with pagename:"+pagename);
  
  
}
  







/// RELAY LOCK JSON SAMPLE 

function open_all(){

  cadviewer.cvjs_showOnlyObjectInAllSpaceObjectGroups('open');
}

function lock_all(){

  cadviewer.cvjs_showOnlyObjectInAllSpaceObjectGroups('locked');
}

function close_all(){

  cadviewer.cvjs_showOnlyObjectInAllSpaceObjectGroups('closed');
}


function lock_single(){

    var door_id = JQ('#door_id').val();    
    cadviewer.cvjs_showOnlyObjectInSpaceObjectGroup(door_id, 'locked', "id")

}


function open_single(){

  var door_id = JQ('#door_id').val();    
  cadviewer.cvjs_showOnlyObjectInSpaceObjectGroup(door_id, 'open', "id")

}


function close_single(){

  var door_id = JQ('#door_id').val();    
  cadviewer.cvjs_showOnlyObjectInSpaceObjectGroup(door_id, 'closed', "id")

}

function hide_space_object(){

  var door_id = JQ('#door_id').val();    
  cadviewer.cvjs_hideSpaceObjectID(door_id);

}


function open_node(){

  var door_id = JQ('#door_id').val();    
  cadviewer.cvjs_open_StickyNote(door_id);

}


function close_node(){

  var door_id = JQ('#door_id').val();    
  cadviewer.cvjs_close_StickyNote(door_id);

}



function hide_node(){

  var door_id = JQ('#door_id').val();    
  cadviewer.cvjs_hide_StickyNote(door_id);

}



function show_node(){

  var door_id = JQ('#door_id').val();    
  cadviewer.cvjs_show_StickyNote(door_id);

}


function show_all_layers(){

  cadviewer.cvjs_AllLayersOn("floorPlan");

}

function hide_all_layers(){

  cadviewer.cvjs_AllLayersOff("floorPlan");

}






 
function hide_object_in_group(){

  var id = JQ('#copy_new_id').val();    
  var node = cadviewer.cvjs_getSpaceObjectNodefromId(id);
  var objectTag = JQ('#group_2_subid').val();    
  cadviewer.cvjs_hideObjectInSpaceObjectGroup(node, objectTag);
  
}


function show_object_in_group(){

  var id = JQ('#copy_new_id').val();    
  var node = cadviewer.cvjs_getSpaceObjectNodefromId(id);
  var objectTag = JQ('#group_2_subid').val();    
  cadviewer.cvjs_showObjectInSpaceObjectGroup(node, objectTag);
  
}

function retrieve_redlines_stickynotes(){

  CV.retrieve_redlines_stickynotes();

}





function text_on_layer(){

  var layer = JQ('#door_id').val();    
  var mylist = cadviewer.cvjs_getTextOnLayer("floorPlan",layer);

  window.alert(JSON.stringify(mylist));
}








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


;

///**
// * Add multiple of text, individually formatted and styled, inside a Space Object
// * @param {string} txtLayer - layer to apply the text
// * @param {string} Id - Id of the graphical object in which to place the text
// * @param {float} leftScale - distance from the left border of Space Object, value between 0 and 1
// * @param {array} textStringArr - Array with the lines of text
// * @param {array} textStyleArr - Array with textstyle of text lines, formattet as a java script object with css style elements, predefined is: text_style_arial_11pt_bold , text_style_arial_9pt_normal, text_style_dialog
// * @param {array} scaleTextArr - Array with relative scale of text lines, value between 0 and 1
// * @param {array} hexColorTextArr - Array of color of text lines in hex form, for example: #AA00AA
// * @param {boolean} clipping - true if clipping of text inside of Space Object, false if text to cross Space Object borders
// * @param {boolean} centering - true if centering of text inside of Space Object, false is default
// */
//
// function cvjs_AddTextOnSpaceObject(txtLayer, Id, leftScale, textStringArr, textStyleArr, scaleTextArr, hexColorTextArr, clipping, centering){


// This is the function that illustrates how to label text inside room polygons

function customAddTextToSpaces(){

  // I am making an API call to the function cvjs_getSpaceObjectIdList()
  // this will give me an array with IDs of all Spaces in the drawing
  var spaceObjectIds = cadviewer.cvjs_getSpaceObjectIdList();
  var i=0;

  
  var textString ;
  var textStyles ;
  var scaleText ; 
  var hexColorText; 



  for (var spc in spaceObjectIds)
  {
      //console.log(spaceObjectIds[spc]+" "+i);
  
      if ((i % 3) ==0){
          textString = new Array("Custom \u2728", "settings \u2728", "\u2764\u2728\u267B");
          textStyles = new Array(text_style_arial_9pt_normal, text_style_arial_11pt_bold, text_style_dialog);
          scaleText = new Array(0.15, 0.2, 0.15 );
          hexColorText = new Array("#AB5500", "#66D200", "#0088DF");
  
          // here we clip the roomlables so they are inside the room polygon
          cadviewer.cvjs_AddTextOnSpaceObject(CV.textLayer1, spaceObjectIds[spc],  0.05, textString, textStyles, scaleText, hexColorText, false, false);
  
      }
      else{
          if ((i % 3) == 1){
  
              textString = new Array('Unicode:\uf083\uf185\u2728', 'of custom text');
              textStyles = new Array(FontAwesome_9pt_normal, text_style_dialog);
              scaleText = new Array(0.15, 0.15 );
              hexColorText = new Array("#00D2AA", "#AB0055");
  
              // here we clip the roomlables so they are inside the room polygon            
              cadviewer.cvjs_AddTextOnSpaceObject(CV.textLayer1, spaceObjectIds[spc],  0.1, textString, textStyles, scaleText, hexColorText, true, false);
  
          }
          else{
  
              textString = new Array("\uf028");
              textStyles = new Array(FontAwesome_9pt_normal);
              scaleText = new Array( "0.5" );
              hexColorText = new Array("#AAAAAA");
              //var hexColorText = new Array("#00AADF");
  
              // here we clip the roomlables so they are inside the room polygon, we center object
              cadviewer.cvjs_AddTextOnSpaceObject(CV.textLayer1, spaceObjectIds[spc],  0, textString, textStyles, scaleText, hexColorText, true, true);
          }
      
      }
      i++;
  }

}

/* text style for adding text into Space Objects */
var text_style_arial_11pt_bold = {
        'font-family': "Arial",
        'font-size': "11pt",
        'font-weight': "bold",
        'font-style': "none",
        'margin': 0,
        'cursor': "pointer",
        'text-align': "left",
        'z-index': 1980,
        'opacity': 0.5
      };
  
  /* text style for adding text into Space Objects */
  var text_style_arial_9pt_normal = {
        'font-family': "Arial",
        'font-size': "9pt",
        'font-weight': "normal",
        'font-style': "none",
        'margin': 0,
        'cursor': "pointer",
        'text-align': "left",
        'z-index': 1980,
        'opacity': 1
      };
  
  
  var FontAwesome_9pt_normal = {
        'font-family': "FontAwesome",
        'font-size': "9pt",
        'font-weight': "normal",
        'font-style': "none",
        'margin': 0,
        'cursor': "pointer",
        'text-align': "left",
        'z-index': 1980,
        'opacity': 1
      };
        
  
  /* text style for adding text into Space Objects */
  var text_style_dialog = {
        'font-family': "Dialog",
        'font-size': "9pt",
        'font-weight': "normal",
        'font-style': "italic",
        'margin': 0,
        'cursor': "pointer",
        'text-align': "left",
        'z-index': 1980,
        'opacity': 1
      };
  







////////// HIGHLIGHT METHODS START

var selectedColor = "#0000FF";

var iconObjectCounter = 1;


function highlight_all_spaces(){

  selectedColor = JQ("#input_color").val();
  var secondcolor = selectedColor.substring(0,5);
  secondcolor+="FF";
  // window.alert(secondcolor);

  var colortype = {
      fill: selectedColor,
      "fill-opacity": "0.3",
      stroke: selectedColor,
      'stroke-width': 1,
      'stroke-opacity': "1",
      'stroke-linejoin': 'round'
    };

  var spaceObjectIds = cadviewer.cvjs_getSpaceObjectIdList();
  for (var spc in spaceObjectIds){		
    var rmid = spaceObjectIds[spc];
    cadviewer.cvjs_highlightSpace(rmid, colortype);
  }

}


function highlight_all_borders(){	
    
  selectedColor = JQ("#input_color").val();
  var colortype = {
    fill: '#fff',
    "fill-opacity": 0.01,
    stroke: selectedColor,    
    'stroke-width': 3.0,
    'stroke-opacity': 1,
    'stroke-linejoin': 'round'
    };

  var spaceObjectIds = cadviewer.cvjs_getSpaceObjectIdList();
  for (var spc in spaceObjectIds){	
  
    var rmid = spaceObjectIds[spc];
    cadviewer.cvjs_highlightSpace(rmid, colortype);
  }
}

function highlight_space_type(){

  selectedColor = JQ("#input_color").val();
  var type = JQ('#image_Type').val();	
  var colortype = {
      fill: selectedColor,
      "fill-opacity": "0.8",
      stroke: '#fe50d9',
      'stroke-width': 1,
      'stroke-opacity': "1",
      'stroke-linejoin': 'round'
    };

    var spaceObjectIds = cadviewer.cvjs_getSpaceObjectIdList();
    for (var spc in spaceObjectIds){	
      var spaceType = cadviewer.cvjs_getSpaceObjectTypefromId(spaceObjectIds[spc]);
      var vqid = spaceObjectIds[spc];
      console.log(spc+"  "+ vqid + "  "+spaceType+ "  "+spaceType.indexOf("Device"));		
      if (spaceType.indexOf(type)==0)
        cadviewer.cvjs_highlightSpace(vqid, colortype);
    }
}

function highlight_space_id(){

  selectedColor = JQ("#input_color").val();
  var spaceid = JQ('#image_ID').val();	
  var colortype = {
      fill: selectedColor,
      "fill-opacity": "0.8",
      stroke: selectedColor,
      'stroke-width': 1,
      'stroke-opacity': "1",
      'stroke-linejoin': 'round'
    };

  var spaceObjectIds = cadviewer.cvjs_getSpaceObjectIdList();
  for (var spc in spaceObjectIds){	
    console.log(spaceid+"  "+spaceObjectIds[spc]+" "+(spaceid.indexOf(spaceObjectIds[spc])==0)+" "+((spaceid.length == spaceObjectIds[spc].length)));
    if (spaceid.indexOf(spaceObjectIds[spc])==0 && (spaceid.length == spaceObjectIds[spc].length) )
      cadviewer.cvjs_highlightSpace(spaceObjectIds[spc], colortype);
  }
}


function clear_space_highlight(){

	cadviewer.cvjs_clearSpaceLayer();
  
  CV.clearTextLayer();

}

////////// HIGHLIGHT METHODS END

function copy_group_object(){

  //console.log("Hello World");
  console.log("Hello World - copy_group_object");

}


function update_group_with_group(){

//  console.log("Hello World");
  console.log("Hello World - update_group_with_group");

}


function insert_from_type_id_image(){

    var loadSpaceImage_Location = "http://localhost:3000/content/drawings/svg/" + JQ('#image_sensor_location').val();
    var loadSpaceImage_ID = JQ('#image_ID').val();
    var loadSpaceImage_Type = JQ('#image_Type').val();
    var loadSpaceImage_Layer = "cvjs_SpaceLayer";

    cadviewer.cvjs_setImageSpaceObjectParameters(loadSpaceImage_Location, loadSpaceImage_ID, loadSpaceImage_Type, loadSpaceImage_Layer);
    cadviewer.cvjs_addFixedSizeImageSpaceObject("floorPlan");
    iconObjectCounter++;

}



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

function cadviewerCanvasMethod02(){

  cadviewer.cvjs_executeCustomCanvasMethod_click(generic_mousemove_method_01, generic_mousedown_method_01, generic_mouseup_method_01, generic_dblclick_method_01,'')

}

function cadviewerCanvasMethod03(){

  cadviewer.cvjs_executeCustomCanvasMethod_click(generic_make_rect_mousemove_method, generic_make_rect_mousedown_method, generic_make_rect_mouseup_method, '', generic_make_rect_init_method)
}

function cadviewerCanvasMethod04(){

  cadviewer.cvjs_executeCustomCanvasMethod_drag(generic_drag_rect_start, generic_drag_rect_stop, generic_drag_rect_move,'')
}

function cadviewerCanvasMethod05(){

  cadviewer.cvjs_executeCustomCanvasMethod_drag(select_drag_rect_start, select_drag_rect_stop, select_drag_rect_move,'')
}

function cadviewerCanvasMethod06(){

  cadviewer.cvjs_executeCustomCanvasMethod_click(generic_make_rect_arrow_mousemove_method, generic_make_rect_arrow_mousedown_method, generic_make_rect_arrow_mouseup_method, generic_make_rect_arrow_dblclick_method, generic_make_rect_arrow_init_method)

}

function cadviewerCanvasMethod07(){

  cadviewer.cvjs_executeCustomCanvasMethod_click(generic_handles_mousemove_method_01, generic_handles_mousedown_method_01, generic_handles_mouseup_method_01, generic_handles_dblclick_method_01,generic_handles_init_method_01)  
}
 


function loadprocessedsvg(){


    CV.setOnloadEndFlag(false);
    var FileName = "http://localhost:3000"+ "/content/drawings/svg/testSVGnotprocessed.svg";
		cadviewer.cvjs_setCustomConversionEndpointExtension(false);
		cadviewer.cvjs_setSpaceObjectProcessing(false);
		cadviewer.cvjs_LoadDrawing("floorPlan", FileName);

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


// SAMPLE TO CREATE RECTANGLE BY CLICK

var generic_make_rect_init_method = function(){
  console.log("generic_make_rect_init_method");
  generic_canvas_flag_first_click_rectangle = false;
  generic_canvas_flag_rectangle= false;
}


var generic_make_rect_mousedown_method = function(e, x, y) {

  try{
      console.log("generic_make_rect_mousedown_method");

      if (!generic_canvas_flag_first_click_rectangle){
      var tPath_r = "M" + 0 + "," + 0;
          cvjs_RubberBand = cadviewer.cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({stroke: "#b00000", fill : "none", 'stroke-width': 0.5});
          generic_canvas_flag_first_click_rectangle = true;
          generic_canvas_flag_rectangle= false;
          console.log("rubberband");
      }
      else{
          console.log(generic_canvas_flag_first_click_rectangle+"  "+generic_canvas_flag_rectangle);            
          if (generic_canvas_flag_rectangle){
              generic_make_rect_stop_method();
          }
      }
  }
  catch(err){console.log(err)}
  //console.log("mouse down ");
}


var generic_make_rect_mouseup_method = function() {

  try{
      console.log("generic_make_rect_mouseup_method");
  }
  catch(err){console.log(err)}
}


var generic_make_rect_dblclick_method = function() {

  try{
      console.log("generic_make_rect_dblclick_method");
  }
  catch(err){console.log(err)}
}


var generic_make_rect_mousemove_method = function(e, x, y) {
 
 try{
      if (generic_canvas_flag_first_click_rectangle){
          cadviewer.cvjs_customCanvasMethod_globalScale();        
          if (!generic_canvas_flag_rectangle){
              cvjs_firstX = cadviewer.cvjs_SVG_x(x);
              cvjs_firstY = cadviewer.cvjs_SVG_y(y)
              cvjs_lastX = cvjs_firstX;
              cvjs_lastY = cvjs_firstY;
              generic_canvas_flag_rectangle = true;
          }
          else{
              // we cannot have the mouse directly on top of the rubberband path, then it will not respond
              var mousedelta = 2;
              cvjs_lastX = cadviewer.cvjs_SVG_x(x-mousedelta);
              cvjs_lastY = cadviewer.cvjs_SVG_y(y-mousedelta);
          }	
          
          tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;		
          tPath_r += "L" + cvjs_firstX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_firstY;
          tPath_r += "L" + cvjs_firstX + "," + cvjs_firstY+" Z"; 
          cvjs_RubberBand.attr({'path': tPath_r});
      }
  }
  catch(err){
      console.log(err);
  } 
}

var generic_make_rect_stop_method = function() {

 // find the current highest node number
 var Node_id = cadviewer.cvjs_currentMaxSpaceNodeId();
 Node_id++;
 var currentNode_underbar = "Node_"+Node_id;
  
 window.alert("generic_make_rect_stop_method "+currentNode_underbar);


  var loadSpaceImage_ID = JQ('#image_ID').val();
  var loadSpaceImage_Type = JQ('#image_Type').val();
  var loadSpaceImage_Layer = "cvjs_SpaceLayer";

  // create a group with space as main object
  cadviewer.cvjs_createSpaceObjectGroup( currentNode_underbar, cvjs_RubberBand, loadSpaceImage_ID, loadSpaceImage_ID, loadSpaceImage_Type, loadSpaceImage_Layer, "myGroup");   

  // make an equal rect, but with the proper color settings and controls
  var grayBox = cadviewer.cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({fill: '#808080', "fill-opacity": "1.0", stroke: '#000', 'stroke-opacity': "1.0", 'stroke-width': 0.5 });
  cadviewer.cvjs_addGraphicsToSpaceObjectGroup( currentNode_underbar,  grayBox, "rect01");

  cadviewer.cvjs_removeCustomCanvasMethod();    
};

// END - SAMPLE TO CREATE RECTANGLE BY CLICK





// SAMPLE TO CREATE RECTANGLE BY DRAG

var generic_drag_rect_start = function() {

  generic_canvas_flag_first_click_rectangle = true;
  generic_canvas_flag_rectangle = false;

  var tPath_r = "M" + 0 + "," + 0;
  cvjs_RubberBand = cadviewer.cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({stroke: "#b00000", fill : "none"});

  console.log("generic_start_method_01");
}

/**
* Template move drag method for custom canvas
*/
var generic_drag_rect_move = function(dx,dy,x,y) {

  try{
      if (generic_canvas_flag_first_click_rectangle){
          cadviewer.cvjs_customCanvasMethod_globalScale();        
          if (!generic_canvas_flag_rectangle){
              cvjs_firstX = cadviewer.cvjs_SVG_x(x);
              cvjs_firstY = cadviewer.cvjs_SVG_y(y)
              cvjs_lastX = cvjs_firstX;
              cvjs_lastY = cvjs_firstY;
              generic_canvas_flag_rectangle = true;
          }
          else{
              // we cannot have the mouse directly on top of the rubberband path, then it will not respond
              var mousedelta = 1;
              cvjs_lastX = cadviewer.cvjs_SVG_x(x-mousedelta);
              cvjs_lastY = cadviewer.cvjs_SVG_y(y-mousedelta);
          }	
          
          var tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;		
          tPath_r += "L" + cvjs_firstX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_firstY;
          tPath_r += "L" + cvjs_firstX + "," + cvjs_firstY+" Z"; 
          cvjs_RubberBand.attr({'path': tPath_r});
      }
  }
  catch(err){
      console.log(err);
  } 

}

/**
* Template stop drag method for custom canvas
*/
var generic_drag_rect_stop = function() {

  cvjs_RubberBand.attr({fill: '#99ff99', "fill-opacity": "0.5", stroke: '#ff9999', 'stroke-opacity': "1"});
  cadviewer.cvjs_removeCustomCanvasMethod();
  console.log("REMOVE: generic_drag_rect_stop");
};

// END - SAMPLE TO CREATE RECTANGLE BY DRAG






// SAMPLE TO DRAG RECTANGLE if overlapping space objects 

var select_drag_rect_start = function() {

  generic_canvas_flag_first_click_rectangle = true;
  generic_canvas_flag_rectangle = false;

  var tPath_r = "M" + 0 + "," + 0;
  cvjs_RubberBand = cadviewer.cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({fill: '#ff9999', "fill-opacity": "0.5", stroke: '#ff9999', 'stroke-opacity': "1"});

  console.log("generic_start_method_01");
}

var select_drag_rect_move = function(dx,dy,x,y) {

  try{
      if (generic_canvas_flag_first_click_rectangle){
          cadviewer.cvjs_customCanvasMethod_globalScale();        
          if (!generic_canvas_flag_rectangle){
              cvjs_firstX = cadviewer.cvjs_SVG_x(x);
              cvjs_firstY = cadviewer.cvjs_SVG_y(y)
              cvjs_lastX = cvjs_firstX;
              cvjs_lastY = cvjs_firstY;
              generic_canvas_flag_rectangle = true;
          }
          else{
              // we cannot have the mouse directly on top of the rubberband path, then it will not respond
              var mousedelta = 1;
              cvjs_lastX = cadviewer.cvjs_SVG_x(x-mousedelta);
              cvjs_lastY = cadviewer.cvjs_SVG_y(y-mousedelta);
          }	
          
          var tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;		
          tPath_r += "L" + cvjs_firstX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_firstY;
          tPath_r += "L" + cvjs_firstX + "," + cvjs_firstY+" Z"; 
          cvjs_RubberBand.attr({'path': tPath_r});
      }
  }
  catch(err){
      console.log(err);
  } 

}


var select_drag_rect_stop = function() {

  cvjs_RubberBand.attr({'path': "M0,0"});
  var mybox;
  var overlap;
  var selected_list = "";

  // reorder x,  if not dragged left to right, top to buttom
  var temp;
  if (cvjs_firstX>cvjs_lastX){
      temp = cvjs_firstX;
      cvjs_firstX = cvjs_lastX;
      cvjs_lastX = temp;
  }
  // reorder y,  if not dragged left to right, top to buttom
  if (cvjs_firstY>cvjs_lastY){
      temp = cvjs_firstY;
      cvjs_firstY = cvjs_lastY;
      cvjs_lastY = temp;
  }

  
  // get all spaces
  var spaceObjectIds = cadviewer.cvjs_getSpaceObjectIdList();
  // loop over all spaces
  for (var spc in spaceObjectIds){
      // get the bounding box of the space
      
      mybox = cadviewer.cvjs_getSpaceObjectBoundingBox(spaceObjectIds[spc]);
      // check if it operlaps with the drag rectangle
      if (mybox == false) continue;

      //console.log(cvjs_firstX+"  "+ cvjs_firstY+" "+ cvjs_lastX+ " "+ cvjs_lastY+"  "+spc);
      //console.log(mybox.x+" "+ mybox.y+" "+ (mybox.x+mybox.width) + " "+ (mybox.y+mybox.height));

      overlap= cadviewer.cvjs_rect_doOverlap( cvjs_firstX, cvjs_firstY, cvjs_lastX, cvjs_lastY, mybox.x, mybox.y, mybox.x+mybox.width, mybox.y+mybox.height);

      if (overlap) 
          selected_list+= spaceObjectIds[spc]+";";
  }

  if (selected_list == "") selected_list = "None";

  window.alert("Selected Objects: "+selected_list);
  //cvjs_RubberBand.attr({fill: '#99ff99', "fill-opacity": "0.5", stroke: '#ff9999', 'stroke-opacity': "1"});
  cadviewer.cvjs_removeCustomCanvasMethod();
  console.log("REMOVE: generic_drag_rect_stop");
};

// END - SAMPLE TO DRAG RECTANGLE if overlapping space objects 





// SAMPLE TO CREATE RECTANGLE w TEXT and ARRow BY CLICK

var logic_flags = [false,false,false,false,false,false];
var operation_type = "";
var mybasewidth = 1;

var generic_make_rect_arrow_init_method = function(){
  console.log("generic_make_rect_init_method");
  logic_flags = [false,false,false,false,false,false];
  operation_type = "box";    
}

var tPath_r;

var generic_make_rect_arrow_mousedown_method = function(e, x, y) {

  try{
      if ((operation_type.indexOf("arrow") ==0) && logic_flags[0] && logic_flags[1]){
          generic_make_rect_arrow_stop_method2();
      }

      if ((operation_type.indexOf("box") ==0) && !logic_flags[0]){  // first box
          var tPath_r = "M" + 0 + "," + 0;
          cvjs_RubberBand = cadviewer.cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({stroke: "#b00000", fill : "none"});
          logic_flags[0] = true;
          logic_flags[1]= false;
      }
      if ((operation_type.indexOf("box") ==0) && logic_flags[0] && logic_flags[1]){
          generic_make_rect_arrow_stop_method1();
      }
 }
  catch(err){console.log(err)}
  //console.log("mouse down ");
}


var generic_make_rect_arrow_mouseup_method = function() {

  try{
      console.log("generic_make_rect_mouseup_method");
  }
  catch(err){console.log(err)}
}


var generic_make_rect_arrow_dblclick_method = function() {

  try{
      console.log("generic_make_rect_dblclick_method");
  }
  catch(err){console.log(err)}
}


var generic_make_rect_arrow_mousemove_method = function(e, x, y) {
 
 try{
      if ((operation_type.indexOf("box") ==0) && logic_flags[0]){
          cadviewer.cvjs_customCanvasMethod_globalScale();        
          if (!logic_flags[1]){
              cvjs_firstX = cadviewer.cvjs_SVG_x(x);
              cvjs_firstY = cadviewer.cvjs_SVG_y(y)
              cvjs_lastX = cvjs_firstX;
              cvjs_lastY = cvjs_firstY;
              logic_flags[1] = true;
          }
          else{
              // we cannot have the mouse directly on top of the rubberband path, then it will not respond
              var mousedelta = 1;
              cvjs_lastX = cadviewer.cvjs_SVG_x(x-mousedelta);
              cvjs_lastY = cadviewer.cvjs_SVG_y(y-mousedelta);
          }	
          
          tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;		
          tPath_r += "L" + cvjs_firstX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_firstY;
          tPath_r += "L" + cvjs_firstX + "," + cvjs_firstY+" Z"; 
          cvjs_RubberBand.attr({'path': tPath_r});
      }


      if ((operation_type.indexOf("arrow") ==0) && logic_flags[0]){
          cadviewer.cvjs_customCanvasMethod_globalScale();        

          logic_flags[1] = true;
          var mousedelta = 1;
          cvjs_lastX = cadviewer.cvjs_SVG_x(x-mousedelta);
          cvjs_lastY = cadviewer.cvjs_SVG_y(y-mousedelta);

          tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;		
          tPath_r += "L" + cvjs_lastX + "," + cvjs_lastY;
          cvjs_RubberBand.attr({'path': tPath_r});
      }
  }
  catch(err){
      console.log(err);
  } 
}

var randomNr;

var generic_make_rect_arrow_stop_method1 = function() {

  // find the current highest node number
  var Node_id = cadviewer.cvjs_currentMaxSpaceNodeId();
  // increment and set current node underbar
  Node_id++;
  var currentNode_underbar = "Node_"+Node_id;

  randomNr = Math.floor(Math.random() * Math.floor(100000)); window.alert("randomNr "+randomNr);

  cvjs_RubberBand.attr({fill: 'none', "fill-opacity": "0.5", stroke: '#0000b0', 'stroke-opacity': "1"});
  // create a group with space as main object
  cadviewer.cvjs_createSpaceObjectGroup( currentNode_underbar, cvjs_RubberBand, "API"+randomNr, "API"+randomNr, "Generic", "myLayer", "myGroup");   

  // create a new border object as separate graphics - we use the rubberband as our graphics variable
  cvjs_RubberBand = cadviewer.cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({fill: 'none', "fill-opacity": "1", stroke: '#000', 'stroke-opacity': "1", 'stroke-width': mybasewidth});
  cadviewer.cvjs_addGraphicsToSpaceObjectGroup( currentNode_underbar,  cvjs_RubberBand, "rect01");

  // create the text string add add to graphics group
  var myText = cadviewer.cvjs_makeTextObjectOnCanvas(cvjs_firstX+(cvjs_lastX-cvjs_firstX)/10.0, cvjs_lastY - (cvjs_lastY-cvjs_firstY)/5.0, "API"+randomNr).attr({fill: '#000', "fill-opacity": "1", stroke: '#000', 'font-size' : (Math.abs(cvjs_lastY-cvjs_firstY)/2.0) });
  cadviewer.cvjs_addGraphicsToSpaceObjectGroup( currentNode_underbar,  myText, "text01");

  // we change to arrow, and directly make the mouse draggable
  operation_type = "arrow";
  logic_flags[0] = true;
  logic_flags[1]= false;  

  // set rubberband to middle of box side
  cvjs_firstX = (cvjs_firstX+cvjs_lastX)/2.0;
  cvjs_firstY = cvjs_lastY;
// make new rubberband 
  tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;
  cvjs_RubberBand = cadviewer.cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({stroke: "#b00000", fill : "none"});
};



var generic_make_rect_arrow_stop_method2 = function() {

  cvjs_RubberBand.attr({fill: 'none', "fill-opacity": "1", stroke: '#000', 'stroke-opacity': "1", 'stroke-width': mybasewidth});
// we create an arrow object and add to space object

  // here we have to add the graphical object to our already created object
  var Node_id = cadviewer.cvjs_currentMaxSpaceNodeId();
  var currentNode_underbar = "Node_"+Node_id;
  
  cadviewer.cvjs_addGraphicsToSpaceObjectGroup( currentNode_underbar, cvjs_RubberBand, "arrow-line01");

// create an arrow
var angleInDegrees = ( Math.atan2((cvjs_lastY-cvjs_firstY),(cvjs_lastX-cvjs_firstX)) / Math.PI * 180.0);
var scaleTriangle = mybasewidth;  // same as stroke-width
var triangle_design= -5.0*scaleTriangle+","+5.5*scaleTriangle+" "+0.0*scaleTriangle+","+-4.5*scaleTriangle+" "+5.0*scaleTriangle+","+5.5*scaleTriangle;
var mysin = Math.sin(angleInDegrees/180*Math.PI);
var mycos = Math.cos(angleInDegrees/180*Math.PI);
var Ttrans = 'r' + (angleInDegrees - 270)+'T' + (cvjs_lastX+ mycos*scaleTriangle) +"," + cvjs_lastY ;
  var Triangle = cadviewer.cvjs_makeGraphicsObjectOnCanvas('Polyline', triangle_design);
  Triangle.attr({fill: 'none', "fill-opacity": "1", stroke: '#000', 'stroke-opacity': "1", 'stroke-width': mybasewidth});
Triangle.attr({
  fill: "#000",
  transform: Ttrans
});

// here we add an arrow to the object
cadviewer.cvjs_addGraphicsToSpaceObjectGroup( currentNode_underbar, Triangle, "arrow01");

  //NOTE:  IF THE CADViewer callback method is not exported from this component, then we need to catch it
  try{
    this.cvjs_graphicalObjectOnChange('Create', 'CustomObject',  "API"+randomNr);  
  }
  catch(err){console.log("cvjs_graphicalObjectOnChange: arrow method:"+ err);};
  cadviewer.cvjs_removeCustomCanvasMethod();    
};

// END OF DRAG







// CLICK TO SELECT HANDLES


// NOTE  - for Handles to be processed in DWG conversion, the conversion parameter -hlall  must be set:
      // USE THIS FOR PROCESSING AUTOCAD HANDLES        
// include this:         cadviewer.cvjs_conversion_addAXconversionParameter("hlall", "");		

// USE THESE TO PROCESS LAYERS RM_ AND RM_TXT FOR INTERACTIVE HIGHLIGHT 
// optional:       cadviewer.cvjs_conversion_addAXconversionParameter("rl", "RM_");		 
// optional:		cadviewer.cvjs_conversion_addAXconversionParameter("tl", "RM_TXT");	

var generic_handles_init_method_01 = function(){
  selected_handles = [];
  // we want to send click object to back!!!!!!
  // so we can click on Handle Objects
  cadviewer.cvjs_sendCustomCanvasToBack("floorPlan");
  handle_selector = true;
}

/**
* Template mouse-move method for custom canvas
*/

var generic_handles_mousemove_method_01 = function(e,x,y) {

var svg_x = cadviewer.cvjs_SVG_x(x);
var svg_y = cadviewer.cvjs_SVG_y(y);

//cadviewer.cvjs_removeCustomCanvasMethod();
// console.log("generic_mousemove_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);
}


/**
* Template mouse-down method for custom canvas
*/

var generic_handles_mousedown_method_01 = function(e,x,y) {

var svg_x = cadviewer.cvjs_SVG_x(x);
var svg_y = cadviewer.cvjs_SVG_y(y);

// cadviewer.cvjs_removeCustomCanvasMethod();
// onsole.log("generic_mousedown_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);

};

/**
* Template mouse-up method for custom canvas
*/

var generic_handles_mouseup_method_01 = function(e,x,y) {

var svg_x = cadviewer.cvjs_SVG_x(x);
var svg_y = cadviewer.cvjs_SVG_y(y);

// console.log("generic_mouseup_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);

};

/**
* Template double-click method for custom canvas
*/

var generic_handles_dblclick_method_01 = function(e,x,y) {
cadviewer.cvjs_removeCustomCanvasMethod();
handle_selector = false;

var mystring = "";
for (var spc in selected_handles){
  // we find all handles
  mystring+= selected_handles[spc].handle+";";
  // we need to clean out highlighted handles
  cadviewer.cvjs_mouseout_handleObjectStyles(selected_handles[spc].id, selected_handles[spc].handle);
}

window.alert(mystring);

var svg_x = cadviewer.cvjs_SVG_x(x);
var svg_y = cadviewer.cvjs_SVG_y(y);
console.log("REMOVE: generic_dblclick_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);
};



// END - SAMPLE TO DRAG RECTANGLE over HANDLES

function checknumberoftypes(){

  var mytype = "wi-fi";
  var myspaces = cadviewer.cvjs_getSpaceObjectByType(mytype);
  window.alert("Number of "+mytype+ " types="+myspaces.SpaceObjects.length);
}


// COMPARE TWO DRAWINGS

function compareTwoDrawings(){


  cadviewer.cvjs_CompareDrawings_DisplayNameAlias("floorPlan","http://localhost:3000/content/drawings/dwg/hq17_.dwg", "http://localhost:3000/content/drawings/dwg/hq17_1space.dwg", "hq17(version1).dwg", "hq17(version2).dwg");


}


// COMPARE TWO DRAWINGs


// INSERT A SPACE OBJECT WITH TEXT

function createSampleTextSpaceObject(){

  var text_style_arial_9pt_normal = {
      'stroke': "#00539B",
      'fill': "#00539B",
      'font-family': "Arial",
      'font-size': "9pt",
      'font-weight': "normal",
      'margin': 0,
      'margin-top': "-10px",
      'cursor': "pointer",
      'text-align': "left",
      'vertical-align': "top",
      'width': "128px",
      'z-index': 1980
  };

  var id = Math.floor(Math.random() * 1600).toString();

  var textArray = new Array("cctv", id);
  var textStyles = new Array(text_style_arial_9pt_normal, text_style_arial_9pt_normal);	
//            var textStyles = new Array(FontAwesome_9pt_normal);	
  var scaleText = new Array(0.8, 0.5);
  var hexColorText = new Array("#AB55BB", "#AB5500");
//            var hexColorText = new Array("#AB5500");
  var leftFactor = 0.05;

  
  var location = "http://localhost:3000/content/customInsertSpaceObjectMenu/images/sensor_c.svg";
  
  //sample01	- dwg coordinates
  var xcor = 	117749.9320;
  var ycor =  36536.9007;	
  // svg coordinates
  var xcor = 	Math.floor(Math.random() * 1600);
  var ycor =  Math.floor(Math.random() * 1000);

  var jsonObject = { "name": "1001", "type": "cctv", "id": id, "translate_x": xcor, "translate_y": ycor };
  
  // use cvjs_addSpaceObjectDirect for direct insertion of space object
  cadviewer.cvjs_addSpaceObjectDirect("floorPlan", location, jsonObject, 0, textArray, 1.0, "none", textStyles, scaleText, hexColorText, leftFactor);

  // same method with direct insertion of space object
  // use cvjs_addSpaceObjectDirectXY for direct insertion of space object
//  cadviewer.cvjs_addSpaceObjectDirectXY("floorPlan", location, jsonObject, 0, textArray, 1.0, "none", textStyles, scaleText, hexColorText, leftFactor);


}
// INSERT A SPACE OBJECT WITH TEXT




// exit quickcount
function exit_quickcount(){ 

  cadviewer.cvjs_exitQuickCount();

}



function loadfile(){ 

  var FileName = "http://localhost:3000" + "/content/custom/bpretail/4386-SP1.svg";		

  var FileName = "http://localhost:3000" + "/content/drawings/dwg/hq17_.dwg";		


  var FileName = "http://localhost:3000" + "/content/custom/bpretail/2352-LP1.svg";		



  cadviewer.cvjs_LoadDrawing("floorPlan", FileName);

}





var clickCounterCollection = [];


function setClickTypeOrange() {

var currentQuickCountType = "orange"; // orange, red, green, blue, purple, yellow
  var currentQuickCountID = "O1";
var currentQuickCountSettings = {"stroke": "#FF7F27", "stroke-width" : "0.5", "fill" : "#FF7F27", "fill-opacity": "0.8"}

  cadviewer.cvjs_setClickCounterActiveType(currentQuickCountType, currentQuickCountID, currentQuickCountSettings)

}


function setDistanceMeasurement() {

  cadviewer.cvjs_setMeasurementDefaultType("Distance");  // Distance, Area, Volume, Angle
  
}





function setClickTypeGreen() {

  var currentQuickCountType = "green";
  var currentQuickCountID = "G2";
  var currentQuickCountSettings = {"stroke": "#0F0", "stroke-width" : "0.5", "fill" : "#0F0", "fill-opacity": "0.8"}

  cadviewer.cvjs_setClickCounterActiveType(currentQuickCountType, currentQuickCountID, currentQuickCountSettings)

}


function setClickTypeBlue() {

  var currentQuickCountType = "blue";
  var currentQuickCountID = "B3";
  var currentQuickCountSettings = {"stroke": "#00F", "stroke-width" : "0.5", "fill" : "#00F", "fill-opacity": "0.8"}

  cadviewer.cvjs_setClickCounterActiveType(currentQuickCountType, currentQuickCountID, currentQuickCountSettings)

}



function getClickCollection() {
    //console.log("getClickCollection called");
    clickCounterCollection = cadviewer.cvjs_returnAllClickCounterObjects();
    console.log("cvjs_clickCounterCollection:", JSON.stringify(clickCounterCollection));
    //return cvjs_clickCounterCollection;
}


function setClickCollection() {


    console.log("before set cvjs_clickCounterCollection:"+JSON.stringify(clickCounterCollection))

    cadviewer.cvjs_setAllClickCounterObjects(clickCounterCollection);
}




function getUnits(){
    //cvjs_initAllCalibrations();
    window.alert(JSON.stringify(cadviewer.cvjs_getCurrentMeasurementUnits("floorPlan")));
}

var calibrationCollection = [];

function getCalibrations(){
    calibrationCollection = JSON.parse(cadviewer.cvjs_returnAllCalibrations());
    console.log("getAllCalibrations:"+JSON.stringify(calibrationCollection));
}

function setCalibrations(){
  console.log("setAllCalibrations:"+JSON.stringify(calibrationCollection));
  cadviewer.cvjs_setAllCalibrations(JSON.stringify(calibrationCollection));
//  console.log("setAllCalibrations:"+JSON.stringify(calibrationCollection));
}


function setCalibrationModal(){
  console.log("setCalibrationModal:");
  cadviewer.cvjs_setSelectCalibration('floorPlan', 'cvjs_addPolygonSpaceObject', false);
//  console.log("setAllCalibrations:"+JSON.stringify(calibrationCollection));
}



function addcircle(){
  console.log("addcircle:");
  cadviewer.cvjs_addSpaceObjectCircle('floorPlan', '1', 'mytype', 'first circle', 'spaceobjeclayer')
}





 var allspace = null

function getallspaceobjects(){

  //console.log(JSON.stringify(cvjs_returnAllSpaceObjects()))
  allspace = cadviewer.cvjs_returnAllSpaceObjects();
  //console.log(JSON.stringify(cvjs_returnAllSpaceObjects()))

  for (var i=0; i<allspace.SpaceObjects.length; i++) { 
  //    console.log(i+" id:"+allspace[i].id+" name:"+allspace[i].name+" layer:"+allspace[i].data("layer"));
      console.log(" full:"+JSON.stringify(allspace.SpaceObjects[i]));  
      console.log(" ");  
  }

}


function setallspaceobjects(){

    cadviewer.cvjs_setSpaceObjectsStructureDirect("floorPlan", JSON.stringify(allspace ) );
    window.alert("Insert JSONSpaceObjects JSON with SPACES");

}



function myclickmenu(){

cadviewer.cvjs_addSpaceObjectRectangle('floorPlan', '2384023408', 'concrete wall', 'X2345', 'concreteLayer')

}











/////////  CANVAS CONTROL METHODS END


class CADViewerHelperMethods extends Component {


  async componentDidMount () {


    /*    remove slider, as implemented internally in CADViewer v6.9.11
    var slider = document.getElementById("myRange");
    var output = document.getElementById("iconsize");
    output.innerHTML = slider.value+"%";
    
    slider.oninput = function() {
      output.innerHTML = this.value+"%";
      // SETTTING THE CADVIEWER GLOBAL CONTROLS:
      
      cadviewer.cvjs_setGlobalSpaceImageObjectScaleFactor(this.value/100.0);
      
    }
    */

  }  

  render(){
    return (
      <div className="CADViewerHelperMethods">

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
    &nbsp;<b>Highlight Spaces based on Color:&nbsp; </b> <input type="text" id="input_color" defaultValue="#AAAA00" />
		<button className="w3-button demo" onClick={highlight_all_spaces}>Spaces</button>
		<button className="w3-button demo" onClick={highlight_all_borders}>Borders</button>
		<button className="w3-button demo" onClick={highlight_space_type}>Space Type</button>
		<button className="w3-button demo" onClick={highlight_space_id}>Space ID</button>
    <button className="w3-button demo" onClick={clear_space_highlight}>Clear All</button>
    <button className="w3-button demo" onClick={display_all_objects}>All:(id,area)</button>
    <button className="w3-button demo" onClick={customAddTextToSpaces}>Text on Spaces</button>
    <button className="w3-button demo" onClick={compareTwoDrawings}>Compare Two Drawings</button>
    <button className="w3-button demo" onClick={createSampleTextSpaceObject}>Create sample SpaceObject with text</button>
    <br/>
    &nbsp;<b>Color:&nbsp; </b> <input type="text" id="input_color" defaultValue="#AAAA00" />
		Higlight:<button className="w3-button demo" onClick={highlight_all_spaces}>All Spaces</button>
		<button className="w3-button demo" onClick={highlight_all_borders}>All Borders</button>
    <strong>Space Type:</strong>&nbsp; 	<input type="text" id="image_Type" defaultValue="Wifi" />
		<button className="w3-button demo" onClick={highlight_space_type}>Space Type</button>
    <strong>Space ID:</strong>&nbsp; 	<input type="text" id="image_ID" defaultValue="wifi_1" />
		<button className="w3-button demo" onClick={highlight_space_id}>Space ID</button>
    <button className="w3-button demo" onClick={clear_space_highlight}>Clear All</button>
    <button className="w3-button demo" onClick={hide_all_layers}>All Layers Off</button>&nbsp;
  <button className="w3-button demo" onClick={show_all_layers}>All Layers On</button>&nbsp;
  <b>QuickCount:&nbsp; </b> <button className="w3-button demo" onClick={exit_quickcount}>Exit QuickCount</button>&nbsp;
  <br/>
    <canvas id="dummy" width="5" height="22"></canvas>





    <strong>Custom Interactive Canvas Samples:&nbsp;</strong><canvas id="dummy" width="10" height="10"></canvas>
		<button className="w3-button demo" onClick={cadviewerCanvasMethod01}>Canvas-DRAG (console)</button>
		<button className="w3-button demo" onClick={cadviewerCanvasMethod02}>Canvas-CLICK (console)</button>
		<button className="w3-button demo" onClick={cadviewerCanvasMethod03}>Make Rect -CLICK</button>
		<button className="w3-button demo" onClick={cadviewerCanvasMethod04}>Make Rect -DRAG</button>
		<button className="w3-button demo" onClick={cadviewerCanvasMethod05}>Select Spaces -DRAG (rl/tl in ax2023)</button>
		<button className="w3-button demo" onClick={cadviewerCanvasMethod06}>Make Box/Arrow Canvas-CLICK</button>
    <button className="w3-button demo" onClick={cadviewerCanvasMethod07}>Select Handles -CLICK (DblClick End) (hlall in ax2023)</button>
    <button className="w3-button demo" onClick={loadprocessedsvg}>Load processed SVG</button>
    <button className="w3-button demo" onClick={checknumberoftypes}>Check number of types</button>


{/*
    <br/><b><i>IOT commands:</i>&nbsp; </b> 
    &nbsp;&nbsp;&nbsp;&nbsp;  <button className="w3-button demo" onClick={copy_group_object}><i>Copy Group</i></button>&nbsp;<input type="text" id="copy_org_id" defaultValue="orgid" />&nbsp;<input type="text" id="copy_new_id" defaultValue="newid" /><button className="w3-button demo" onClick={hide_object_in_group}>Hide Subgroup In Group</button>&nbsp;&nbsp;  <button className="w3-button demo" onClick={show_object_in_group}>Show Subgroup In Group</button>&nbsp;
    <br/><i>Group 1:</i> &nbsp; &nbsp;<input type="text" id="group_1" defaultValue="NODE_xx" />  <i>Group 2:</i> &nbsp; &nbsp;<input type="text" id="group_2" defaultValue="NODE_yy" />&nbsp;<button className="w3-button demo" onClick={update_group_with_group}><i>Add Group to Group</i></button>&nbsp;&nbsp;Subgroup ID:&nbsp;<input type="text" id="group_2_subid" defaultValue="id_01" />&nbsp; &nbsp; 
*/} 

  <br/>
  <canvas id="dummy" width="5" height="22"></canvas>
  <b>Place out Door Objects:&nbsp;</b><button className="w3-button demo" onClick={close_all}>Close all Doors</button>&nbsp;
  <button className="w3-button demo" onClick={lock_all}>Lock all Doors</button>&nbsp;<button className="w3-button demo" onClick={open_all}>Open All Doors</button>&nbsp; 
  <input type="text" id="door_id" defaultValue="Door_" />&nbsp;<button className="w3-button demo" onClick={lock_single}>Lock Door</button>&nbsp;
  <button className="w3-button demo" onClick={close_single}>Close Door</button>&nbsp;<button className="w3-button demo" onClick={retrieve_redlines_stickynotes}>Retrieve Deleted Redlines</button>&nbsp;
  <button className="w3-button demo" onClick={hide_space_object}>Hide Space Object</button>&nbsp;&nbsp;
  <button className="w3-button demo" onClick={open_node}>Open StickyNote</button>&nbsp;
  <button className="w3-button demo" onClick={close_node}>Close StickyNote</button>&nbsp;
  <button className="w3-button demo" onClick={hide_node}>Hide StickyNote</button>&nbsp;
  <button className="w3-button demo" onClick={show_node}>Show StickyNote</button>&nbsp;
  <button className="w3-button demo" onClick={text_on_layer}>Get Text On Layer</button>&nbsp;
  <button className="w3-button demo" onClick={loadfile}>Load testfile</button>&nbsp;
{/*  
  <br/>
  <br/>
  <button className="w3-button demo" onClick={show_node}>Show StickyNote</button>&nbsp;
  <button className="w3-button demo" onClick={text_on_layer}>Get Text On Layer</button>&nbsp;
  <button className="w3-button demo" onClick={loadfile}>Load testfile</button>&nbsp;
*/}
<br/>

    <button className="w3-button demo" onClick={getClickCollection}>getClickCollection</button>
    <button className="w3-button demo" onClick={setClickCollection}>setClickCollection</button>
    <button className="w3-button demo" onClick={setClickTypeGreen}>setClickTypeGreen</button>
    <button className="w3-button demo" onClick={setClickTypeBlue}>setClickTypeBlue</button>
    <button className="w3-button demo" onClick={setClickTypeOrange}>setClickTypeOrange</button>
    <button className="w3-button demo" onClick={setDistanceMeasurement}>setDistanceMeasurement</button>
    <button className="w3-button demo" onClick={getUnits}>getUnits</button>
    <button className="w3-button demo" onClick={getCalibrations}>getCalibrations</button>
    <button className="w3-button demo" onClick={setCalibrations}>setCalibrations</button>
    <button className="w3-button demo" onClick={setCalibrationModal}>setCalibrationModal</button>
    <button className="w3-button demo" onClick={addcircle}>addcircle</button>
    <button className="w3-button demo" onClick={getallspaceobjects}>getallspaceobjects</button>
    <button className="w3-button demo" onClick={setallspaceobjects}>setallspaceobjects</button>
    <button className="w3-button demo" onClick={myclickmenu}>cvjs_addSpaceObjectRectangle(f_div, ID, type, name, layer)</button>




{/*    remove slider, as implemented internally in CADViewer v6.9.11
  <canvas id="dummy" width="5" height="18"></canvas>
  <div className="slidecontainer">
  <strong><small>SVG Icon Size at Insert: <span id="iconsize"></span></small></strong><input type="range" min="1" max="400"  className="slider" id="myRange"/>
  </div>
*/}


{/*}
          <img id ="img1" src={logo} className="CADViewerHelperMethods-logo" alt="logo" />
          <h4>CADViewerHelperMethods</h4>
*/} 

          </div>
    );
  }
}

export default CADViewerHelperMethods;
