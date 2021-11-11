# Installing CADViewer

## CADViewer for ReactJS, Angular and VueJS

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

