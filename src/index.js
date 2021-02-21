import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CADViewer from './CADViewer';
import CADViewerSpaceObjects from './CADViewerSpaceObjects';
import CADViewerHelperMethods from './CADViewerHelperMethods';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    <CADViewerSpaceObjects />
  </React.StrictMode>,
  document.getElementById('CADViewerSpaceObjects')
);

ReactDOM.render(
  <React.StrictMode>
    <CADViewerHelperMethods />
  </React.StrictMode>,
  document.getElementById('CADViewerHelperMethods')
);


ReactDOM.render(
  <React.StrictMode>
    <CADViewer />
  </React.StrictMode>,
  document.getElementById('CADViewerCanvas')
);






// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
