import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';



function test(){
    document.getElementById("test").style.display = "none";
}



ReactDOM.render(<App />, document.getElementById('root'));
