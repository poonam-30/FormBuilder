import React, { useState, useEffect }  from 'react';

import Header from "../common/header";
import Footer from "../common/footer";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Form
const Form = () => {
    
    const {formURL} = useParams();
    
    const [form, setForm] = useState({});
    const forms = useSelector(({forms}) => forms.formsList);  
    
    useEffect(() => {
        let formList = forms.length > 0 ? JSON.parse(forms) : []
        let obj = formURL ? formList.find(form => form.formURL === formURL) : {};
        setForm(obj);
        console.log(obj)
    },[])
   
   
    return(
        <div>
            <Header/>
            <div className="container">
            		<div className="_vertical-center">
            			<div className="main-div">
                            <h2>{form.formName}</h2>
                            {
                                form.questions ?
                                    form.questions.length > 0 ?
                                        <form>
                                            {
                                                form.questions.map(( item, index ) => {
                                                    return (
                                                        <div className="more-select cut-box" key={index}>
                                                            <p><strong>Q{index+1}: {item.question}</strong> </p>
                                                            {
                                                            Array.isArray(item.answer) ?
                                                            item.answer.length > 0 ?
                                                                <div className="input-box-web">
                                                                    {
                                                                        item.answerType === "MultichoiceCheckbox" ?
                                                                                item.answer.map(( answerItem, i ) => {
                                                                                    return (
                                                                                        <React.Fragment key={i}>
                                                                                            <input type="checkbox" name="answer" />
                                                                                            <span>{answerItem} </span >
                                                                                        </React.Fragment>
                                                                                    )
                                                                                })
                                                                        :
                                                                        item.answer.map(( answerItem, i ) => {
                                                                            return  (
                                                                                <React.Fragment key={i}>
                                                                                    <input type="radio" value="NORMAL" name="priority_level" /> <span>{answerItem} </span >
                                                                                </React.Fragment>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                                    
                                                                : null
                                                            : 

                                                            <input className="text-box-cust" 
                                                                type="text" id="answer" name="answer" placeholder="Enter Answer"/>
                                                            }
                                                        </div>            
                                                    )
                                                })
                                            }
                                            <div className="more-select mt-4">
                                                <div className="input-box-web">
                                                <button type="button" className="btn btn-success">Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                    :
                                    <p> No Question Added</p>                                        
                                :<p> No Question Added</p>                                        
                                }
                        </div>
                    </div>    
                </div>
            <Footer/>
        </div>
    )
}

export default Form;