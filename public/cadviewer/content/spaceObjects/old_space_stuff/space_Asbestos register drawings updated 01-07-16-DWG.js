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
						name: "arch_01",
						id: "arch_01",
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
						name: "myspace_01",
						id: "myspace_01",
						layer: "cvjs_Data_Layer",
						group: "",
						occupancy: "",
						type: "TestRoom",
						tags:  {  }, 
						attributes: [],
						linked: true,
					}
					}
				}
			}
		}
	}


var uItem1= paper.path("M297.6107314480655,368.2833755697822h140.3697912786739v165.66164556311963h-140.3697912786739v-165.66164556311963 Z ")
.data("node","NODE_1");
vqRooms[cvjs_active_floorplan_div_nr].push(uItem1);

var uItem2= paper.path("M575.8211285769687,361.96041199867074h140.3697912786739v173.24920184845337h-140.3697912786739v-173.24920184845337 Z ")
.data("node","NODE_2");
vqRooms[cvjs_active_floorplan_div_nr].push(uItem2);

return (buildings);
}

jQuery(document).ready(function() { 
	setUpVqRoomsGeneric(); 
}); 
