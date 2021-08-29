import React, { useState,useEffect }  from 'react';
import axios from "axios";
import { useHistory,useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {SERVER_URL} from "../../constants";

import Header from "../common/header";
import Footer from "../common/footer";
import setAuthToken from "../../utils/setAuthToken";

//UpdateEFRTicket
const UpdateEFRTicket = (props) => {

    const history = useHistory();
    
    //Manage token user login or not
	  if (localStorage.getItem("token") === null) {
	    history.push("/");
	  }
	  if (localStorage.getItem("user_type") === "ADMIN3" || localStorage.getItem("user_type") === "ADMIN1" || localStorage.getItem("user_type") === "ADMIN2") {
        history.push("/");
	  }
    const [email_thread, setEmailThread] = useState("");
    const [priority_level, setPriorityLevel] = useState("");

    const { register, handleSubmit, errors } = useForm();
    const [passErr, setPassErr] = useState();
    const [passSuccess, setPassSucess] = useState();
    const [efrTicket, setData] = useState({});

    
    var {id} = useParams();
    id  = id == undefined ? "" : id;
    useEffect(()=>{        
        const getOne = () =>{
             try {
                setAuthToken(); //  Important set token  from res.data to get token
                 axios.get(SERVER_URL + `/api/efrticket/getOneEFRTicket/${id}`).then((res)=>{
 
                     console.log("res", res.data);
                     if (res.data.status === true) {
                         setData(res.data.data);
                     }
                 })
             } catch (e) {
                 let passErr = e.response.data.message;
                 setPassErr(passErr);
                 console.log(passErr);
                 setTimeout(function () {
                     setPassErr("");
                 }, 3000);
             }
        }
        getOne();
     },[]);
 

    const onSubmit = async (e) =>{
        // e.preventDefault();
        
        let res = "";
        console.log(efrTicket);
        
        try {
            setAuthToken(); //  Important set token  from res.data to get token
            res = await axios.post(SERVER_URL + "/api/efrticket/updateEFRTicket", {
                id:efrTicket._id,
                email_thread: efrTicket.email_thread,
                priority_level: efrTicket.priority_level,
                status:"OPEN"
            });
            console.log("res", res.data);

            if (res.data.status === true) {
                setPassSucess(res.data.message);
                setTimeout(function () {
                    setPassSucess("");
                    history.push("/efrTicketResponse");
                }, 3000);
            }
        } catch (e) {
            let passErr = e.response.data.message;
            setPassErr(passErr);
            console.log(passErr);
            setTimeout(function () {
                setPassErr("");
            }, 3000);

            //console.log("pass", e.response.data.message);
        }
        console.log("submit")
    }

    return(
        <div>
            <Header/>
            <div className="container">
            		<div className="_vertical-center">
            			<div className="main-div">
                        <p style={{color:'green'}}>{passSuccess}</p>
                        <p style={{color:'red'}}>{passErr}</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                                
                                <div className="cut-box">
                                    <label htmlFor="email_thread">Email Thread</label>
                                    <textarea className="text-box-cust" id="email_thread" name="email_thread" placeholder="Email Thread"
                                     value={efrTicket.email_thread}
                                     onChange={(e) => setData({...efrTicket,email_thread:e.target.value})}
                                     ref={register({ required: true })}
                                     rows={10}
                                    ></textarea>
                                    {errors.email_thread && <p className="error-msg"> Email Thread is required. </p>}
                                </div>
                                <div className="more-select cut-box" onChange={(e)=> setData({...efrTicket,priority_level:e.target.value})} >
                                    <label htmlFor="priority_level">Priority Level</label>
                                    <div className="input-box-web">
                                        <input type="radio" value="NORMAL" name="priority_level" checked={efrTicket.priority_level=="NORMAL"} ref={register({ required: true })} /> <span > Normal</span >
                                        <input type="radio" value="ELEVATED" name="priority_level" checked={efrTicket.priority_level=="ELEVATED"} ref={register({ required: true })} /><span > Elevated</span >
                                        <input type="radio" value="URGENT" name="priority_level" checked={efrTicket.priority_level=="URGENT"} ref={register({ required: true })} /><span > Urgent</span >
                                    </div>
                                    {errors.priority_level && <p className="error-msg"> Priority Level is required. </p>}
                                </div>
                                <div className="more-select button-section">
                                    <div className="input-box-web">
                                    <button type="submit" className="btn btn-success">Update</button>
                                    <button className="btn btn-primary" onClick={()=>history.push('/efrTicketResponse')}>cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>
            <Footer/>
        </div>
    )
}

export default UpdateEFRTicket;