function drawPathsGeneric(paper, cvjs_active_floorplan_div_nr, vqRooms, buildings){ 


 var buildings = {
 	 BUILDING_NAME_GOES_HERE: {
		name: "",
		company: "",
		address: "",
		city: "",
		state: "Test1",
		zipcode: "",
		country: "",
		FacMgr: "Hello 2!",
		FacMgr_title: "",
		FacMgr_email: "",
		FacMgr_phone: "",
		floors: {
			space_objects_01 : {
				name: "space_objects_01",
				file: "space_objects_01.js",
				rooms: {
					NODE_1: {
						name: "myspace_1",
						id: "myspace_1",
						layer: "cvjs_Data_Layer",
						group: "",
						occupancy: "",
						type: "Space",
						tags:  {  }, 
						attributes: [],
						linked: true,
					}
						,
					NODE_2: {
						name: "2_x",
						id: "2_x",
						layer: "cvjs_Data_Layer",
						group: "",
						occupancy: "",
						type: "Space",
						tags:  {  }, 
						attributes: [],
						linked: true,
					}
					}
				}
			}
		}
	}


var uItem1= paper.path("M369.5786262715181,333.94657179186225h641.9555457746478v768.4013350938967h-641.9555457746478v-768.4013350938967 Z ")
.data("node","NODE_1");
vqRooms[cvjs_active_floorplan_div_nr].push(uItem1);

var uItem2= paper.path("M1280.6367493153366,350.1575704225352L1630.7943197378718,210.74298219874802L1828.5685030320815,654.9243446791862L1514.0751295970267,742.46373728482L1611.341121381064,483.0877591940532L1351.9651432902974,982.3865170187793L1371.4183416471049,690.5885416666666L1150.948760269953,651.6821449530516L1329.2697452073553,557.6583528951486L1128.253362187011,450.6657619327073L1128.253362187011,450.6657619327073L1128.253362187011,450.6657619327073L1280.6367493153366,350.1575704225352 ")
.data("node","NODE_2");
vqRooms[cvjs_active_floorplan_div_nr].push(uItem2);

return (buildings);
}

jQuery(document).ready(function() { 
	setUpVqRoomsGeneric(); 
}); 
