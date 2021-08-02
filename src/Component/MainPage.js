import React, { Component } from 'react';
import {Link} from 'react-router-dom';

function MainPage({ location, history }) {
    return ( 
        <div id="Main" className="MainPage">
            <p>Welcome to Visualizer!</p>
            <button>logout</button>
            <Link to='/Create'>제작</Link>
        </div>
    );
}

export default MainPage;