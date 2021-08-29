import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import setAuthToken from "../utils/setAuthToken";
import {SERVER_URL} from "../constants";

const Login = () => {
    
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { register, handleSubmit, errors } = useForm();
    const [passErr, setPassErr] = useState();

    const onSubmit = async (e) =>{
        // e.preventDefault();
        
    let res = "";

    try {
        res = await axios.post(SERVER_URL + "/api/users/login", {
            email: email,
            password: password
        });
        console.log("res", res.data);
        
        if (res.data.success === true && res.data.user.user_type === "AGENT") {
            const token = res.data.token;
            const user = res.data.user;
            const user_type = res.data.user.user_type;
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", JSON.stringify(user));
            window.localStorage.setItem("user_type", user_type);
            setAuthToken(); //  Important set token  from res.data to get token

            history.push("/createEFRTicket");
        } else if(res.data.success === true && res.data.user.user_type === "ADMIN1"){
             const token = res.data.token;
            const user = res.data.user;
            const user_type = res.data.user.user_type;
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", JSON.stringify(user));
            window.localStorage.setItem("user_type", user_type);
            setAuthToken(); //  Important set token  from res.data to get token

            history.push("/admin1/urgentEFRTicket");
        }
        else if(res.data.success === true && res.data.user.user_type === "ADMIN2"){
            const token = res.data.token;
           const user = res.data.user;
           const user_type = res.data.user.user_type;
           window.localStorage.setItem("token", token);
           window.localStorage.setItem("user", JSON.stringify(user));
           window.localStorage.setItem("user_type", user_type);
          setAuthToken(); //  Important set token  from res.data to get token

           history.push("/admin2/urgentEFRTicket");
       }
       else if(res.data.success === true && res.data.user.user_type === "ADMIN3"){
                const token = res.data.token;
            const user = res.data.user;
            const user_type = res.data.user.user_type;
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", JSON.stringify(user));
            window.localStorage.setItem("user_type", user_type);
            setAuthToken(); //  Important set token  from res.data to get token

            history.push("/admin3/urgentEFRTicket");
        } else {
            setPassErr(
            "User can not login into User portal. Please try with User login credentials."
            );
            setTimeout(function () {
            setPassErr();
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
    return (
        <>
            <div className="container">
            		<div className="_vertical-center">
            			<div className="main-div">
                        <p style={{color:'red'}}>{passErr}</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="cut-box">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="text-box-cust" placeholder="Email"
                                     name="email"
                                     value={email}
                                     onChange={(e) => setEmail(e.target.value)}
                                     ref={register({
                                       required: true,
                                       pattern: {
                                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                         message: "invalid email address",
                                       },
                                     })}
                                      />
                                    {errors.email && <p> Email is required.</p>}
                                </div>
                                
                                <div className="cut-box">
                                    <label htmlFor="email_thread">Password</label>
                                    <input type="text" className="text-box-cust" placeholder="Password" 
                                    name="password"
                                     value={password}
                                     onChange={(e) => setPassword(e.target.value)}
                                     ref={register({ required: true })}
                                    />
                                    {errors.password && <p> Password is required. </p>}
                                </div>
                               
                                <div className="more-select">
                                    <div className="input-box-web">
                                        <button type="submit" className="btn btn-success">LOGIN</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>
        </>
    )

}
export default Login;