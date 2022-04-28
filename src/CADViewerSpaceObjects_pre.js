import React, { Component }  from 'react';
import jQuery from 'jquery';
import {findDOMNode } from 'react-dom';
import logo from './logo.svg';
import './CADViewerSpaceObjects.css';
import { render } from '@testing-library/react';

// We want to export some variables back to CADViewerHelperMethods after we have placed out an image
import * as myHelperMethods from './CADViewerHelperMethods';

// We are only accessing the functional interface of CADViewer, not the canvas, so this import is sufficient
import * as cadviewer from "cadviewer";


var insertImageSelected = 0;
var iconObjectCounter = 0;
var maxImages = 13;


var loadSpaceImage_Location = "/cadviewer/content/drawings/svg/";
var loadSpaceImage_ID = "xx1";
var loadSpaceImage_Type = "Lyn";
var loadSpaceImage_Layer = "cvjs_SpaceLayer";

function selectIconImageDummy() {

    console.log("do nothing");
}

function selectIconImage(n) {

    insertImageSelected  = n;
    console.log("imageSelected: "+n);
    loadSpaceImage_Layer = "cvjs_SpaceLayer";

    iconObjectCounter++;


  if (n==1){
    loadSpaceImage_Type ="Danger";
    loadSpaceImage_ID = "danger_"+iconObjectCounter;
    loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"danger.png";  
  }
    
  if (n==9){
    loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"device_54.svg";
    loadSpaceImage_ID = "device_"+iconObjectCounter
    loadSpaceImage_Type = "Device";
  }
  
  if (n==5){
	loadSpaceImage_Type ="Wifi";
	loadSpaceImage_ID = "wifi_"+iconObjectCounter;
	loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"wifi_25.svg";  
  }
   
  if (n==2){
	loadSpaceImage_Type ="Boiler";
	loadSpaceImage_ID = "boiler_"+iconObjectCounter;
	loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"HVAC_01.svg";  
  }


  if (n==3){
	loadSpaceImage_Type ="Marker";
	loadSpaceImage_ID = "marker_"+iconObjectCounter;
	loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"pin_02.svg";  	
  }
  
  if (n==4){
	loadSpaceImage_Type ="AirCon";
	loadSpaceImage_ID = "aircon_"+iconObjectCounter;
	loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"HVAC_04.svg";  
  }

  
  if (n==6){
	loadSpaceImage_Type ="Ventilator";
	loadSpaceImage_ID = "vent_"+iconObjectCounter;
	loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"HVAC_02.svg";  
  }

  if (n==7){
	loadSpaceImage_Type ="Temp";
	loadSpaceImage_ID = "temp_"+iconObjectCounter;
	loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"HVAC_03.svg";  
  }

  if (n==8){
	loadSpaceImage_Type ="Assembly";
	loadSpaceImage_ID = "assembly_"+iconObjectCounter;
	loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"assembly_point.png";  
  }

  if (n==10){
	loadSpaceImage_Type ="Fire Alarm";
	loadSpaceImage_ID = "fire_alarm_"+iconObjectCounter;
	loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"fire_alarm_call_point.png";  
  }

  if (n==11){
	loadSpaceImage_Type ="Fire Exit";
	loadSpaceImage_ID = "exit_"+iconObjectCounter;
	loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"fire_exit.png";  
  }

  if (n==12){
	loadSpaceImage_Type ="Fire Extinguisher";
	loadSpaceImage_ID = "extinguisher_"+iconObjectCounter;
	loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"fire_extinguisher.png";  
  }

  if (n==13){
	loadSpaceImage_Type ="Refuge";
	loadSpaceImage_ID = "refuge_"+iconObjectCounter;
	loadSpaceImage_Location = "/cadviewer/content/drawings/svg/"+"refuge_point.png";  
  }

}

// Functions to drag elements
var lastXbeforeDrag =0;
var lastYbeforeDrag =0;

// locations of leftside device menu
var device_from_top_base = 250; 
var device_from_left_base = 100; 
var height = 42;


function setTextOnPopUp(event){

  if (lastYbeforeDrag>(device_from_top_base+height*8) && lastYbeforeDrag<(device_from_top_base+height*9)){
    jQuery('#icon_div_popup').html("Device");
    } 

    if (lastYbeforeDrag>device_from_top_base && lastYbeforeDrag< (device_from_top_base+height*1)){
    jQuery('#icon_div_popup').html("Danger");
        } 
        
    if (lastYbeforeDrag>(device_from_top_base+height*4) && lastYbeforeDrag<(device_from_top_base+height*5)){
    jQuery('#icon_div_popup').html("WiFi");
    } 
    if (lastYbeforeDrag>(device_from_top_base+height*1) && lastYbeforeDrag<(device_from_top_base+height*2)){
    jQuery('#icon_div_popup').html("Boiler");
        } 
        
    if (lastYbeforeDrag>(device_from_top_base+height*2) && lastYbeforeDrag<(device_from_top_base+height*3)){
    jQuery('#icon_div_popup').html("Marker");
        } 
        
    if (lastYbeforeDrag>(device_from_top_base+height*3) && lastYbeforeDrag<(device_from_top_base+height*4)){
    jQuery('#icon_div_popup').html("Aircon");
    } 


    if (lastYbeforeDrag>(device_from_top_base+height*5) && lastYbeforeDrag<(device_from_top_base+height*6)){
    jQuery('#icon_div_popup').html("Vent");
    } 
    
    if (lastYbeforeDrag>(device_from_top_base+height*6) && lastYbeforeDrag<(device_from_top_base+height*7)){
    jQuery('#icon_div_popup').html("Heater");
    } 

    if (lastYbeforeDrag>(device_from_top_base+height*7) && lastYbeforeDrag<(device_from_top_base+height*8)){
    jQuery('#icon_div_popup').html("Assembly Point");
    } 

        if (lastYbeforeDrag>(device_from_top_base+height*9) && lastYbeforeDrag<(device_from_top_base+height*10)){
    jQuery('#icon_div_popup').html("Alarm");
    } 
    if (lastYbeforeDrag>(device_from_top_base+height*10) && lastYbeforeDrag<(device_from_top_base+height*11)){
    jQuery('#icon_div_popup').html("Exit");
    } 
    if (lastYbeforeDrag>(device_from_top_base+height*11) && lastYbeforeDrag<(device_from_top_base+height*12)){
    jQuery('#icon_div_popup').html("Fire Extinguisher");
    } 
    if (lastYbeforeDrag>(device_from_top_base+height*12) && lastYbeforeDrag<(device_from_top_base+height*13)){
    jQuery('#icon_div_popup').html("Meet");
    } 
}

function insertCloneIcon(event){


  var insertposx = event.pageX +4 - device_from_left_base;  // take y location into consideration
  var containerheight = 0; // 544/2.0;    // the cloned object is inserted into 50% of table height
  var insertposy = event.pageY- device_from_top_base+20 - containerheight;


  console.log(insertposx+" "+insertposy);


  console.log("1b event xy  "+insertImageSelected+"  "+event.pageX+"  "+event.pageY+"  "+(insertposy));

  if (insertImageSelected == 1){
    jQuery("#danger_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }

  if (insertImageSelected == 9){
    jQuery("#device_drag_clone").css({"left" : (insertposx), "top" : (insertposy) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }
  if (insertImageSelected == 5){
    jQuery("#wifi_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }
  if (insertImageSelected == 2){
    jQuery("#boiler_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }
 if (insertImageSelected == 3){
    jQuery("#pin_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }
  if (insertImageSelected == 4){
    jQuery("#aircon_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }
  if (insertImageSelected == 6){
    jQuery("#vent_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }
  if (insertImageSelected == 7){
    jQuery("#temp_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }
  if (insertImageSelected == 8){
    jQuery("#assembly_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }
  if (insertImageSelected == 10){
    jQuery("#fire_alarm_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }
  if (insertImageSelected == 11){
    jQuery("#fire_exit_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }
  if (insertImageSelected == 12){
    jQuery("#fire_extinguisher_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }
  if (insertImageSelected == 13){
    jQuery("#refuge_point_drag_clone").css({"left" : (insertposx), "top" : (insertposy ) }).css({'z-index': 1000}).css({'border': '1px solid black'}).show();	  
  }

}


function handleDragImages(event){

  //console.log("myImagesToDrag: "+jQuery('#myImagesToDrag').offset().left+" "+jQuery('#myImagesToDrag').offset().top);
  //device_from_top_base = document.getElementById('myImagesToDrag').offsetTop;
  //device_from_left_base = document.getElementById('myImagesToDrag').offsetLeft;

  console.log("space_icon_table2: "+jQuery('#space_icon_table2').offset().left+" "+jQuery('#space_icon_table2').offset().top);
  device_from_top_base = jQuery('#space_icon_table2').offset().top;
  device_from_left_base = jQuery('#space_icon_table2').offset().left;

  console.log("in handleDragImages myImagesToDrag:"+device_from_top_base+ " left: "+device_from_left_base);

	// handle move 
	
	lastXbeforeDrag = event.pageX;
	lastYbeforeDrag = event.pageY;


	  if (insertImageSelected == 0){  // nothing selected , we show a popup
            
        setTextOnPopUp(event);

	      jQuery('#icon_div_popup').css({
			         left:  56,
               top:   event.pageY-20-device_from_top_base,
               "z-index" : 1000
		    });

			  jQuery('#icon_div_popup').show();
	  
	  }
	  else{
		  jQuery('#icon_div_popup').hide();
	  }

    if (insertImageSelected > 0)
        insertCloneIcon(event);
}



class CADViewerSpaceObjects extends Component {

    async componentDidMount () {

    		// here we clone icons to be able to move them into the canvas
            insertImageSelected = 0;


              // sunstitute #myImagesToDrag with #space_icon_table2
            jQuery("#device_drag").clone().appendTo("#space_icon_table2").prop('id', 'device_drag_clone').css('position', 'absolute').css('top', 0).css('left', 100).css('width','40px').hide(); 
            jQuery("#wifi_drag").clone().appendTo("#space_icon_table2").prop('id', 'wifi_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
            jQuery("#pin_drag").clone().appendTo("#space_icon_table2").prop('id', 'pin_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
            jQuery("#aircon_drag").clone().appendTo("#space_icon_table2").prop('id', 'aircon_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
            jQuery("#boiler_drag").clone().appendTo("#space_icon_table2").prop('id', 'boiler_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
            jQuery("#vent_drag").clone().appendTo("#space_icon_table2").prop('id', 'vent_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
            jQuery("#temp_drag").clone().appendTo("#space_icon_table2").prop('id', 'temp_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
            jQuery("#assembly_drag").clone().appendTo("#space_icon_table2").prop('id', 'assembly_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
            jQuery("#danger_drag").clone().appendTo("#space_icon_table2").prop('id', 'danger_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
            jQuery("#fire_alarm_drag").clone().appendTo("#space_icon_table2").prop('id', 'fire_alarm_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
            jQuery("#fire_exit_drag").clone().appendTo("#space_icon_table2").prop('id', 'fire_exit_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
            jQuery("#fire_extinguisher_drag").clone().appendTo("#space_icon_table2").prop('id', 'fire_extinguisher_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
            jQuery("#refuge_point_drag").clone().appendTo("#space_icon_table2").prop('id', 'refuge_point_drag_clone').css('position', 'absolute').css('width','40px').hide(); 
    
          

            jQuery("#space_icon_table2").mousemove(function(event) {
                // console.log(insertImageSelected);
              // console.log(event.pageX+"  "+event.pageY);
              handleDragImages(event);
            });
    
    
    /*
            jQuery("#space_icon_table2").mouseover(function(event) {
    
            });
    */
    
            // jQuery("#space_icon_table2").mouseup(function(event) {
              jQuery("#space_icon_table2").click(function(event) {
    
                console.log("insert image "+insertImageSelected);
              
                lastXbeforeDrag = event.pageX;
                lastYbeforeDrag = event.pageY;
//                var containerheight = 544/2.0;    // the cloned object is inserted into 50% of table height
//                lastYbeforeDrag = lastYbeforeDrag - containerheight;

                console.log(" lastYbeforeDrag:"+lastYbeforeDrag+"  (device_from_top_base+height*1):"+ (device_from_top_base+height*1));              

                for (var i =0; i<maxImages; i++){                              
                    if ( lastYbeforeDrag>device_from_top_base+(height*i) && lastYbeforeDrag <(device_from_top_base+height*(i+1)) ){                
                        insertImageSelected = i+1;
                        console.log("insertImageSelected:"+insertImageSelected);
                    }
                }

              handleDragImages(event);

            });
    


            
/*
            jQuery("#space_icon_table2").mouseout(function(event) {

                jQuery('#icon_div_popup').hide();

            });
            
            jQuery("#myImagesToDrag").mouseout(function(event) {
                        
                if (insertImageSelected == 1){
                    jQuery("#danger_drag_clone").hide();
                }
                if (insertImageSelected == 9){
                    jQuery("#device_drag_clone").hide();	  
                }
                if (insertImageSelected == 5){
                    jQuery("#wifi_drag_clone").hide();	  
                }
                if (insertImageSelected == 2){
                    jQuery("#boiler_drag_clone").hide();	  
                }
                if (insertImageSelected == 3){
                    jQuery("#pin_drag_clone").hide();	  
                }
                if (insertImageSelected == 4){
                    jQuery("#aircon_drag_clone").hide();	  
                }
                if (insertImageSelected == 6){
                    jQuery("#vent_drag_clone").hide();	  
                }
                if (insertImageSelected == 7){
                    jQuery("#temp_drag_clone").hide();	  
                }
                if (insertImageSelected == 8){
                    jQuery("#assembly_drag_clone").hide();
                }
                if (insertImageSelected == 10){
                    jQuery("#fire_alarm_drag_clone").hide();
                }
                if (insertImageSelected == 11){
                    jQuery("#fire_exit_drag_clone").hide();
                }
                if (insertImageSelected == 12){
                    jQuery("#fire_extinguisher_drag_clone").hide();
                }
                if (insertImageSelected == 13){
                    jQuery("#refuge_point_drag_clone").hide();
                }
    
                jQuery('#icon_div_popup').hide();

                console.log("imagestodrag.mouseout...."+insertImageSelected);
                // NOTE  - HERE WE CALL THE API COMMAND TO ADD A SPACE IMAGE OBJECT

                if (insertImageSelected>0){
                    // set variables for image
                    selectIconImage(insertImageSelected);
                    insertImageSelected = 0;		

                    // update the fields in the CADViewerHelperMethod container
                    myHelperMethods.setSpaceInputFields(loadSpaceImage_Location.substring(loadSpaceImage_Location.lastIndexOf("/")+1), loadSpaceImage_ID, loadSpaceImage_Type, loadSpaceImage_Layer);
                    
                    // place the icon on the canvas
                    cadviewer.cvjs_setImageSpaceObjectParameters(loadSpaceImage_Location, loadSpaceImage_ID, loadSpaceImage_Type, loadSpaceImage_Layer);
                    cadviewer.cvjs_addFixedSizeImageSpaceObject("floorPlan");
                }
            
            });
  
*/


    jQuery("#space_icon_table2").mouseout(function(event) {
              
      if (insertImageSelected == 1){
          jQuery("#danger_drag_clone").hide();
      }
      if (insertImageSelected == 9){
          jQuery("#device_drag_clone").hide();	  
      }
      if (insertImageSelected == 5){
          jQuery("#wifi_drag_clone").hide();	  
      }
      if (insertImageSelected == 2){
          jQuery("#boiler_drag_clone").hide();	  
      }
      if (insertImageSelected == 3){
          jQuery("#pin_drag_clone").hide();	  
      }
      if (insertImageSelected == 4){
          jQuery("#aircon_drag_clone").hide();	  
      }
      if (insertImageSelected == 6){
          jQuery("#vent_drag_clone").hide();	  
      }
      if (insertImageSelected == 7){
          jQuery("#temp_drag_clone").hide();	  
      }
      if (insertImageSelected == 8){
          jQuery("#assembly_drag_clone").hide();
      }
      if (insertImageSelected == 10){
          jQuery("#fire_alarm_drag_clone").hide();
      }
      if (insertImageSelected == 11){
          jQuery("#fire_exit_drag_clone").hide();
      }
      if (insertImageSelected == 12){
          jQuery("#fire_extinguisher_drag_clone").hide();
      }
      if (insertImageSelected == 13){
          jQuery("#refuge_point_drag_clone").hide();
      }

      jQuery('#icon_div_popup').hide();

      console.log("space_icon_table2.mouseout...."+insertImageSelected);
      // NOTE  - HERE WE CALL THE API COMMAND TO ADD A SPACE IMAGE OBJECT

      if (insertImageSelected>0){
          // set variables for image
          selectIconImage(insertImageSelected);
          insertImageSelected = 0;		

          // update the fields in the CADViewerHelperMethod container
          myHelperMethods.setSpaceInputFields(loadSpaceImage_Location.substring(loadSpaceImage_Location.lastIndexOf("/")+1), loadSpaceImage_ID, loadSpaceImage_Type, loadSpaceImage_Layer);
          
          // place the icon on the canvas
          cadviewer.cvjs_setImageSpaceObjectParameters(loadSpaceImage_Location, loadSpaceImage_ID, loadSpaceImage_Type, loadSpaceImage_Layer);
          cadviewer.cvjs_addFixedSizeImageSpaceObject("floorPlan");
      }

    });




    }  
    
        
  render(){
    return (
      <div className="CADViewerSpaceObjects">


    <div id="myImagesToDrag"></div>

    <table id="space_icon_table2" >	
    <tbody>
            <tr>
            <td>
                <div id="danger_drag">
                    <img src="/cadviewer/content/drawings/svg/danger.png" alt="CADViewer insert Object"  width="40px" onClick={selectIconImageDummy(9)}/>
                </div>
            </td>
            </tr>

            <tr>
            <td> 
                <div id="boiler_drag">
                <img src="/cadviewer/content/drawings/svg/HVAC_01.svg" alt="CADViewer insert Object"  width="40px" onClick={selectIconImageDummy(5)}/>
                </div>
            </td>
            </tr>

            <tr>
            <td>
                <div id="pin_drag">
                <img src="/cadviewer/content/drawings/svg/pin_01.svg" alt="CADViewer insert Object"  width="40px" height="40px" onClick={selectIconImageDummy(3)}/> 
                </div>
            </td>
            </tr>
            <tr>
            <td>
                <div id="aircon_drag">
            <img src="/cadviewer/content/drawings/svg/HVAC_04.svg" alt="CADViewer insert Object"  width="40px"  onClick={selectIconImageDummy(4)}/>
                </div>
            </td>
            </tr>

            <tr>
            <td>
                <div id="wifi_drag">
                <img src="/cadviewer/content/drawings/svg/wifi_25.svg" alt="CADViewer insert Object" width="40px"  onClick={selectIconImageDummy(2)}/>
                </div>
            </td>
            </tr>

            <tr>
            <td>
                <div id="vent_drag">
            <img src="/cadviewer/content/drawings/svg/HVAC_02.svg" alt="CADViewer insert Object"  width="40px" onClick={selectIconImageDummy(6)}/>
                </div>
            </td>
            </tr>

            <tr>
            <td>
                <div id="temp_drag">
            <img src="/cadviewer/content/drawings/svg/HVAC_03.svg" alt="CADViewer insert Object"  width="40px" onClick={selectIconImageDummy(7)}/>
                </div>
            </td>
            </tr>


            <tr>
            <td>
                <div id="assembly_drag">
                    <img src="/cadviewer/content/drawings/svg/assembly_point.png" alt="CADViewer insert Object"  width="40px" onClick={selectIconImageDummy(8)}/>
                </div>
            </td>
            </tr>

            <tr>
            <td>
                <div id="device_drag">
            <img src="/cadviewer/content/drawings/svg/device_54.svg" alt="CADViewer insert Object" width="40px" onClick={selectIconImageDummy(1)}/>
                </div>
            </td>


            </tr>

            <tr>
            <td>
                <div id="fire_alarm_drag">
                    <img src="/cadviewer/content/drawings/svg/fire_alarm_call_point.png" alt="CADViewer insert Object"  width="40px" onClick={selectIconImageDummy(10)}/>
                </div>
            </td>
            </tr>

            <tr>
            <td>
                <div id="fire_exit_drag">
                    <img src="/cadviewer/content/drawings/svg/fire_exit.png" alt="CADViewer insert Object"  width="40px" onClick={selectIconImageDummy(11)}/>
                </div>
            </td>
            </tr>

            <tr>
            <td>
                <div id="fire_extinguisher_drag">
                    <img src="/cadviewer/content/drawings/svg/fire_extinguisher.png" alt="CADViewer insert Object"  width="40px" onClick={selectIconImageDummy(12)}/>
                </div>
            </td>
            </tr>

            <tr>
            <td>
                <div id="refuge_point_drag">
                <img src="/cadviewer/content/drawings/svg/refuge_point.png" alt="CADViewer insert Object"  width="40px" onClick={selectIconImageDummy(13)}/>
                </div>
            </td>
            </tr>
    </tbody>
    </table>			  

    <div id="icon_div_popup"></div>


{/*
*/}

{/*
          <img id ="img1" src={logo} className="CADViewerSpaceObjects-logo" alt="logo" />
          <h4>CADViewerSpaceObjects</h4>
*/}
      </div>
    );
  }
}

export default CADViewerSpaceObjects;
