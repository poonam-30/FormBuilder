import React from 'react';
import { Link, useHistory } from "react-router-dom";

//common header for appliction
const Header = () => {

    return(
        <div  className="nax-bar-main ">
            <p>Form Builder</p>
                <nav>
                <ul>
                    <li>
                    <Link to={`/createForm`}>Create Form</Link>
                    </li>
                    <li>
                    <Link to={`/`}>Forms</Link>
                    </li>
                </ul>
            </nav>
            
        </div>
    )
}

export default Header;