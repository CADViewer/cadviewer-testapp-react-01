# cadviewer-testapp-react-01

ReactJS CADViewer front-end sample

The repository contains a full setup of CADViewer with React.

Download and from the install folder (cadviewer-testapp-react-01) run:

		sudo npm install
		
***Note:*** If getting an error "Global install: Permission denied in wd dependency" , please use:

		sudo npm install --unsafe-perm
		


## This package contains

1: [CADViewer script library](https://www.npmjs.com/package/cadviewer)  - [npm](https://www.npmjs.com/package/cadviewer) installed into ClientApp as part of React JS front-end.

2: cadviewer-testapp-react-01/src/index.js invokes helper script documents for two samples:

simply comment/uncomment relevant parts of this script file ***index.js*** to run either sample 4a or 4b below:

2a: General sample:

		CADViewer.js: - CADViewer canvas initialization 
		CADViewerHelperMethods.js: script document with helper methods for testing the CADViewer API
		CADViewerSpaceObjects.js: drag-place div to add objects to the canvas

2b: Block substitution sample: 

		CADViewerBlocks01.js: - CADViewer canvas initialization 
		CADViewerHelperMethodsBlocks01.js: script document with helper methods for testing the CADViewer API for block image substitution



3a: The general sample ***2a*** , loads in a sample pre-converted drawing from the CADViewer server. Comment out the line:

	var FileName = "https://onlinedemo.cadviewer.com/cadviewer_7_0/php/load-demo-file-npm-install.php?file=base_xref_json_Mar_15_H11_8.svg";

once the [cadviewer-conversion-server](https://github.com/CADViewer/cadviewer-conversion-server), see below, is installed.

3b:  The general sample ***2a*** , also loads in Space Objects and overlay them into the drawing from the call-back method ***cvjs_OnLoadEnd()***. Once [cadviewer-conversion-server](https://github.com/CADViewer/cadviewer-conversion-server) is installed and working, then uncomment the line: 

	cadviewer.cvjs_loadSpaceObjectsDirect("floorPlan", "https://onlinedemo.cadviewer.com/cadviewer_7_0/php/load-demo-file-npm-install.php?file=spaceobject-npm-demo-01.json")




## This package does not contains

1: The [back-end AutoXchange 2025](https://github.com/CADViewer/cadviewer-conversion-server) conversion server and connecting scripts. Install these separately!

**NOTE:** With this download, use the NodeJS CAD conversion server: https://github.com/CADViewer/cadviewer-conversion-server

2: The converter folder structure contains a larger set of fonts, installed in /cadviewer/converters/ax2022/windows/fonts/, but a fuller set of fonts can be installed, found on our [download](https://cadviewer.com/download) site. 

Read the sections on installing and handling [Fonts](https://tailormade.com/ax2020techdocs/installation/fonts/) in [AutoXchange 2025 TechDocs](https://tailormade.com/ax2020techdocs/) and [TroubleShooting](https://tailormade.com/ax2020techdocs/troubleshooting/).


## How to Use

1: Install the package.

2: In the files ***/src/CADViewer.js*** or ***src/CADViewerBlocks01.js*** ensure that the front-end and back-end server locations are correctly defined. 

		//
		var ServerBackEndUrl = "http://localhost:3000/";
		var ServerLocation = "";    // leave blank
		
		// Standard Front-end
		var ServerUrl = "http://localhost:8000/";

3: Make sure the back-end CAD conversion server is installed. If using [CADViewer Node JS](https://github.com/CADViewer/cadviewer-conversion-server) conversion server, make sure the CADViewer_config.json is properly configured with the various server settings, their Urls and other parameters 

4:  Run npm start to start the ReactJS server. Use http://localhost:8000 as a starting point in your browser, (assuming that your have installed under http://localhost:8000).



## General Documentation 

-   [CADViewer Techdocs and Installation Guide](https://cadviewer.com/cadviewertechdocs/download)



## Updating CAD Converters

This repository should contain the latest converters, but in case you need to update any of the back-end converters please follow: 

* [Download **AutoXchange**](https://cadviewer.com/download/) (and other converters), install (unzip) AX2024/AX2025 in **/converters/ax2024/windows** or **/converters/ax2024/linux** or in the designated folder structure.

* Read the sections on installing and handling [Fonts](https://tailormade.com/ax2020techdocs/installation/fonts/) in [AutoXchange 2025 TechDocs](https://tailormade.com/ax2020techdocs/) and [TroubleShooting](https://tailormade.com/ax2020techdocs/troubleshooting/).

* Try out the samples and build your own application!


<br>
<br>
<br>

# Installing CADViewer 

General instructions for CADViewer for ReactJS, Angular and VueJS
 
Install CADViewer via *npm i cadviewer* on all platforms, see specifics below for each platform on how to add auxillary files and connect with back-end conversion server.


## Install Instructions for ReactJS and VueJS

1: Install CADViewer from: *npm i cadviewer* 


To see how a CAD Canvas is set up with callback methods and initialization of CADViewer use the following samples as a template:

2A: ReactJS - download the CADViewer [React](https://github.com/CADViewer/cadviewer-testapp-react-01) implementation sample from the [Github](https://github.com/CADViewer/cadviewer-testapp-react-01) repository [cadviewer-testapp-react-01](https://github.com/CADViewer/cadviewer-testapp-react-01).

2B: VueJS - download the CADViewer [VueJS](https://github.com/CADViewer/cadviewer-testapp-vue-01) implementation sample from [Github](https://github.com/CADViewer/cadviewer-testapp-vue-v01) repository [cadviewer-testapp-vue-01](https://github.com/CADViewer/cadviewer-testapp-vue-01).

These samples illustrates initialization and loading of CADViewer as well as illustrates the functional interface for highlight and adding interactive image content to the CAD canvas. 


3: Install a back-end CAD Conversion server to process CAD files and communicate with CADViewer.

Download the Node JS CAD Conversion server (or alternatively the PHP, .NET or Servlet Server implementations):  Go to:  https://cadviewer.com/download/, register and receive email and then download from **CADViewer Handler/Connector Scripts**.

The [CADViewer](https://github.com/CADViewer/cadviewer-conversion-server) NodeJS CAD Conversion Server can be downloaded from [Github](https://github.com/CADViewer/cadviewer-conversion-server) from the repository [cadviewer-conversion-server](https://github.com/CADViewer/cadviewer-conversion-server).

You can always update the CAD Converter AutoXchange 2022 in the server structure:  Go to: https://cadviewer.com/download/, register and receive email and then download from **AutoXchange 2022 Downloads**.


Note that the path book-keeping is important for proper initialization, where the ServerBackEndUrl and ServerLocation is the location and Url of the CAD Server and ServerUrl is the Url of the React/VueJS application encapulating CADViewer. 

		var ServerBackEndUrl = "http://localhost:3000/";
		var ServerUrl = "http://localhost:8000/";
		var ServerLocation = "";  // leave blank, for devopment purposes can be set: c:/nodejs/cadviewer-conversion-server/

The CADViewer React JS general install instructions are at: https://cadviewer.com/cadviewertechdocs/handlers/reactjs/

**LICENSE: TMS 1.0:** Use freely on localhost. Commercial use requires licensing, both using entirely or in parts. Forbidden to remove license key check.  Contact Tailor Made Software, https://cadviewer.com/contact, for more information. 

Use the [CADViewer API](https://cadviewer.com/cadviewerproapi/global.html) to open and manipulate drawings in your application. 

Read the Guide on how to **[create hotspots](https://cadviewer.com/highlight/main/)** (Space Objects), it outlines how spaces can be processed on a drawing to create interactive objects. 

Read the Guide on how to **[modify hotspots](https://cadviewer.com/highlight2/main/)**  (Space Objects), this will help you work with the code in this sample. 

Read the general documentation on **CADViewer** is found at: https://cadviewer.com/cadviewertechdocs/.

The general documentation on **AutoXchange 2022** is found at: https://tailormade.com/ax2020techdocs/.

The CADViewer API is found at: https://cadviewer.com/cadviewerproapi/global.html.



## Install Instruction for Angular

1A: Install CADViewer: *npm i cadviewer* 

1B: There are some general image, style and XML configuration files that CADViewer needs during execution, please download [angular_src_asset_folder_cadviewer_6_7.zip](https://cadviewer.com/downloads/handlers/angular/angular_src_asset_folder_cadviewer_6_7.zip) and place in your Angular /src/assets/ project folder.   

1C: In *angular.json* , reference the cadviewer related stylesheets from /src/assets/:

            "styles": [
              "src/styles.css",
              "src/assets/cadviewer/app/css/bootstrap.min.css",              
              "src/assets/cadviewer/app/css/jquery.qtip.min.css",
              "src/assets/cadviewer/app/css/jquery-ui-1.11.4.min.css",
              "src/assets/cadviewer/app/css/bootstrap-multiselect.css",
              "src/assets/cadviewer/app/css/cvjs_6.5.css"
            ],

As an alternative:

2: Download a CADViewer [Angular](https://github.com/CADViewer/cadviewer-testapp-angular-v01) implementation sample from [Github](https://github.com/CADViewer/cadviewer-testapp-angular-v01) repository [cadviewer-testapp-angular-v01](https://github.com/CADViewer/cadviewer-testapp-angular-v01).


For both methods 1: and 2: , then do the following:


Download the Node JS CAD Conversion server (or alternatively the PHP, .NET or Servlet Server implementations):  Go to:  https://cadviewer.com/download/, register and receive email and then download from **CADViewer Handler/Connector Scripts**.

The [CADViewer](https://github.com/CADViewer/cadviewer-conversion-server) NodeJS CAD Conversion Server can be downloaded from [Github](https://github.com/CADViewer/cadviewer-conversion-server) from the repository [cadviewer-conversion-server](https://github.com/CADViewer/cadviewer-conversion-server).

Download the CAD Converter AutoXchange 2022:  Go to: https://cadviewer.com/download/, register and receive email and then download from **AutoXchange 2022 Downloads**.

Use the Github [cadviewer-testapp-angular-v01](https://github.com/CADViewer/cadviewer-testapp-angular-v01) as reference sample. This sample illustrates initialization and loading of CADViewer as well as illustrates the functional interface for highlight and adding interactive image content to the CAD canvas. 

Note that the path book-keeping is important for proper initialization, where the ServerBackEndUrl and ServerLocation is the location and Url of the CAD Server and ServerUrl is the Url of the Angular application encapulating CADViewer. 


		var ServerBackEndUrl = "http://localhost:3000/";
		var ServerUrl = "http://localhost:4200/";
		var ServerLocation = "c:/nodejs/cadviewer-conversion-server/";

The CADViewer Angular JS general install instructions are at: https://cadviewer.com/cadviewertechdocs/handlers/angular/

**LICENSE: TMS 1.0:** Use freely on localhost. Commercial use requires licensing, both using entirely or in parts. Forbidden to remove license key check.  Contact Tailor Made Software, https://cadviewer.com/contact, for more information. 

Use the [CADViewer API](https://cadviewer.com/cadviewerproapi/global.html) to open and manipulate drawings in your application. 

Read the Guide on how to **[create hotspots](https://cadviewer.com/highlight/main/)** (Space Objects), it outlines how spaces can be processed on a drawing to create interactive objects. 

Read the Guide on how to **[modify hotspots](https://cadviewer.com/highlight2/main/)**  (Space Objects), this will help you work with the code in this sample. 

Read the general documentation on **CADViewer** is found at: https://cadviewer.com/cadviewertechdocs/.

The general documentation on **AutoXchange 2022** is found at: https://tailormade.com/ax2020techdocs/.

The CADViewer API is found at: https://cadviewer.com/cadviewerproapi/global.html.

