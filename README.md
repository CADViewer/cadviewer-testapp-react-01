# CADViewer React Application (Legacy Functional Components Demo)

This project is a React web application demonstrating **CADViewer** integration utilizing legacy React functional components. It serves as an API testbed and interactive sample for loading, browsing, and manipulating CAD files (DWG, DGN, PDF, SVG, etc.) dynamically via the CADViewer JS API.

## 🚀 Technologies Used

- **Framework:** [React](https://reactjs.org/) (Functional Components)
- **Styling:** [Bootstrap 5](https://getbootstrap.com/)
- **CAD Engine:** [CADViewer API](https://cadviewer.com/) & AutoXchange Conversion Server

## ✨ Features Demonstrated

* **Integrated CADViewer Canvas:** Deep integration with CADViewer JS library to dynamically display engineered CAD drawings.
* **Interactive API Testbed:** A top-navigation header with categorized test buttons (Highlights, Spaces, Custom Canvas Methods, Door Objects) styled via Bootstrap 5.
* **Space Object Highlighting:** Demonstrations on dynamically selecting, highlighting, and interacting with specific hotspots/rooms.

## 🛠️ Project Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed, and the corresponding CADViewer conversion server running locally on `http://localhost:3000`.

### Install Dependencies
```bash
npm install
```

### Development Server
Run the project locally. Open [http://localhost:8005](http://localhost:8005) to view it in your browser. (The port is set in `package.json`).
```bash
npm start
```

## Documentation & Guides

For a deep dive into the available configuration parameters, API calls, and workflows, please reference the official CADViewer developer documentation:

* Use the **[CADViewer API](https://cadviewer.com/cadviewerproapi/global.html)** to open and manipulate drawings in your application.
* Read the Guide on how to **[create hotspots](https://cadviewer.com/highlight/main/)** (Space Objects).
* Read the Guide on how to **[modify hotspots](https://cadviewer.com/highlight2/main/)** (Space Objects).
* The general documentation on **CADViewer** is found at: [https://cadviewer.com/cadviewertechdocs/](https://cadviewer.com/cadviewertechdocs/).
* The general documentation on **AutoXchange** is found at: [https://cadviewer.com/autoxchangetechdocs/](https://cadviewer.com/autoxchangetechdocs/).





## cadviewer-testapp-react-01

1: cadviewer-testapp-react-01/src/index.js invokes helper script documents for two samples:

simply comment/uncomment relevant parts of this script file ***index.js*** to run either sample 4a or 4b below:

1a: General sample:

		CADViewer.js: - CADViewer canvas initialization 
		CADViewerHelperMethods.js: script document with helper methods for testing the CADViewer API
		CADViewerSpaceObjects.js: drag-place div to add objects to the canvas

1b: Block substitution sample: 

		CADViewerBlocks01.js: - CADViewer canvas initialization 
		CADViewerHelperMethodsBlocks01.js: script document with helper methods for testing the CADViewer API for block image substitution



1a: The general sample ***1a*** , loads in a sample pre-converted drawing from the CADViewer server. Comment out the line:

	var FileName = "https://onlinedemo.cadviewer.com/cadviewer_7_0/php/load-demo-file-npm-install.php?file=base_xref_json_Mar_15_H11_8.svg";

once the [cadviewer-conversion-server](https://github.com/CADViewer/cadviewer-conversion-server), see below, is installed.

1b:  The general sample ***1a*** , also loads in Space Objects and overlay them into the drawing from the call-back method ***cvjs_OnLoadEnd()***. Once [cadviewer-conversion-server](https://github.com/CADViewer/cadviewer-conversion-server) is installed and working, then uncomment the line: 

	cadviewer.cvjs_loadSpaceObjectsDirect("floorPlan", "https://onlinedemo.cadviewer.com/cadviewer_7_0/php/load-demo-file-npm-install.php?file=spaceobject-npm-demo-01.json")



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


## This package contains

1: [CADViewer script library](https://www.npmjs.com/package/cadviewer)  - [npm](https://www.npmjs.com/package/cadviewer) installed into ClientApp as part of React JS front-end.



## This package does not contains

1: The [back-end AutoXchange](https://github.com/CADViewer/cadviewer-conversion-server) conversion server and connecting scripts. Install these separately!

**NOTE:** With this download, use the NodeJS CAD conversion server: https://github.com/CADViewer/cadviewer-conversion-server

2: The converter folder structure contains a larger set of fonts, installed in /cadviewer/converters/autoxchange/fonts/, but a fuller set of fonts can be installed, found on our [download](https://cadviewer.com/download) site. 

Read the sections on installing and handling [Fonts](https://cadviewer.com/autoxchangetechdocs/installation/fonts/) in [AutoXchange TechDocs](https://cadviewer.com/autoxchangetechdocs/) and [TroubleShooting](https://cadviewer.com/autoxchangetechdocs/troubleshooting/).




## License

**TMS 1.0**: Use freely on localhost. Commercial use requires licensing, both using entirely or in parts. Forbidden to remove license key check. Contact Tailor Made Software/CADViewer VizQuery Technologies, [https://cadviewer.com/contact](https://cadviewer.com/contact), for more information.

