import React from 'react';
import ReactDOM from 'react-dom';

import Application from './Application';
import './style.scss';

window.env = "development";

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);

if (module.hot){
  module.hot.accept();
}