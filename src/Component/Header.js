import React, { Component } from 'react';
import {Link} from 'react-router-dom';

//fontawsome설치해야함
//npm i @fortawesome/fontawesome-svg-core
//npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
//npm i @fortawesome/react-fontawesome
import { faBook, faAddressCard, faEnvelope, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
class Header extends Component {
    render() {
        return (
            <div>
                <Link to='/main' className="Linktitle"><button className="title">Visualizer</button></Link>
                {/* <ul className="iconlist">
                    <li><FontAwesomeIcon className="icon" icon={faAddressCard} /> </li>
                    <li><FontAwesomeIcon className="icon" icon={faBook} /></li>
                    <li><FontAwesomeIcon className="icon" icon={faEnvelope} /></li>
                    <li><FontAwesomeIcon className="icon" icon={faUserPlus} /></li>
                </ul> */}
            </div>
        );
    }
}

export default Header;