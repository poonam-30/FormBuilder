import React, { useState }  from 'react';

import Header from "./common/header";
import Footer from "./common/footer";
import { useHistory } from 'react-router-dom';

//Dashboard
const Dashboard = () => {

    const History =  useHistory();
    return(
        <div>
            <Header/>
            <div className="container">
            		<div className="_vertical-center">
            			<div className="main-div">
                        </div>
                    </div>    
                </div>
            <Footer/>
        </div>
    )
}

export default Dashboard;