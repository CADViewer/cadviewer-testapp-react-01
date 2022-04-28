import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Standard test case  -  uncomment all "STANDARD"
//*
import CADViewer from './CADViewer';
import CADViewerHelperMethods from './CADViewerHelperMethods';
//*/

// import CADViewerSpaceObjects from './CADViewerSpaceObjects';   - moved inside CADViewer 6.9.11



// Blocks case - uncomment all "BLOCKS"
/*
import CADViewerBlocks01 from './CADViewerBlocks01';
import CADViewerHelperMethodsBlocks01 from './CADViewerHelperMethodsBlocks01';
//*/


import * as serviceWorker from './serviceWorker';

// STANDARD case
//*
ReactDOM.render(
  <React.StrictMode>
    <CADViewer />
  </React.StrictMode>,
  document.getElementById('CADViewerCanvas')
);

ReactDOM.render(
  <React.StrictMode>
    <CADViewerHelperMethods />
  </React.StrictMode>,
  document.getElementById('CADViewerHelperMethods')
);
//*/

/*   moved inside CADViewer 6.9.11

ReactDOM.render(
  <React.StrictMode>
    <CADViewerSpaceObjects />
  </React.StrictMode>,
  document.getElementById('CADViewerSpaceObjects')
);



*/






// BLOCKS case
/*
ReactDOM.render(
  <React.StrictMode>
    <CADViewerBlocks01 />
  </React.StrictMode>,
  document.getElementById('CADViewerCanvas')
);


ReactDOM.render(
  <React.StrictMode>
    <CADViewerHelperMethodsBlocks01 />
  </React.StrictMode>,
  document.getElementById('CADViewerHelperMethods')
);
//*/



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
