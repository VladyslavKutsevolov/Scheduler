import React from 'react';
import ReactDOM from 'react-dom';

import 'index.scss';
import axios from 'axios';

import Application from 'components/Application';

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(<Application />, document.getElementById('root'));
