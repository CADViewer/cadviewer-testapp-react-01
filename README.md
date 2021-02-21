# Installing CADViewer

## CADViewer Install instructions - React JS

Install CADViewer from: *npm i cadviewer* , see: https://www.npmjs.com/package/cadviewer

There are some general image and XML configuration files that CADViewer needs during execution, please download [react_public_folder_cadviewer_6_4.zip](https://cadviewer.com/downloads/handlers/reactjs/react_public_folder_cadviewer_6_4.zip) and place in your React /public/ project folder. (These files are included in this download)   

Download the Node JS CAD Conversion server (or alternatively PHP, .NET or Servlet implementations):  Go to:  https://cadviewer.com/download/, register and receive email and then download from **CADViewer Handler/Connector Scripts**.

Download the CAD Converter AutoXchange 2020:  Go to: https://cadviewer.com/download/, register and receive email and then download from **AutoXchange 2020 Downloads**.

Use the Github [CADViewer 6.4 ReactJS ](https://github.com/CADViewer/CADViewer6.4_ReactJSDemo_v01) as reference sample. This sample illustrates initialization and loading of CADViewer as well as illustrates the functional interface for highlight and adding interactive image content to the CAD canvas. 

Note that the path book-keeping is important for proper initialization, where the ServerBackEndUrl and ServerLocation is the location and Url of the CAD Server and ServerUrl is the Url of the React application encapulating CADViewer. 


		var ServerBackEndUrl = "http://localhost:3000/";
		var ServerUrl = "http://localhost:8000/";
		var ServerLocation = "c:/nodejs/cadviewerServer/";


Use the [CADViewer API](https://cadviewer.com/cadviewerproapi/global.html) to open and manipulate drawings in your application. 

The CADViewer React JS general install instructions are at: https://cadviewer.com/cadviewertechdocs/handlers/reactjs/

Read the Guide on how to **[create hotspots](https://cadviewer.com/highlight/main/)** (Space Objects), it outlines how spaces can be processed on a drawing to create interactive objects. 

Read the Guide on how to **[modify hotspots](https://cadviewer.com/highlight2/main/)**  (Space Objects), this will help you work with the code in this sample. 

Read the general documentation on **CADViewer** is found at: https://cadviewer.com/cadviewertechdocs/.

The general documentation on **AutoXchange 2020** is found at: https://tailormade.com/ax2020techdocs/.

The CADViewer API is found at: https://cadviewer.com/cadviewerproapi/global.html.
