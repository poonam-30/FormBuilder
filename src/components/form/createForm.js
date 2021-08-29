import React, { useState }  from 'react';
import { useForm } from "react-hook-form";

import Header from "../common/header";
import Footer from "../common/footer";
import { useHistory } from 'react-router-dom';
import { Button,Modal} from 'react-bootstrap'; 
import { useDispatch } from 'react-redux';
import { createForm } from "../../appRedux/actions/forms";
import slugify from 'react-slugify';

//CreateForm
const CreateForm = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const History =  useHistory();
    const dispatch = useDispatch();
    
    const [formName, setFormName] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [answerType, setAnswerType] = useState("Text");
    const [questionsList, setQuestionsList] = useState([]);
    
    const { register: registerForm, handleSubmit: handleFormSubmit, errors: formErrors } = useForm();
    const { register:registerQuestionForm,handleSubmit: handleQuestionFormSubmit, errors: questionFormErrors } = useForm();

    const [passErr, setPassErr] = useState();
    const [passSuccess, setPassSucess] = useState();

    const onSubmit = async (e) =>{
        
        try {
            let url = formName + "_" + new Date().toLocaleString()
            let form = {
                formName:formName,
                questions:questionsList,
                formURL:slugify( url, {
                    delimiter: '_',
                    prefix: 'form-content',
                    
                  }),
                createdAt:new Date().toLocaleString() 
            }
            dispatch(createForm(form));
            History.push("/");
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

    const onQuestionAdd = async (e) =>{
        
        try {
            let questionObj = {
                question: question,
                answerType: answerType,
                answer:(answerType === "Text" ? answer: answer.split("\n"))
            }
            setQuestionsList([...questionsList,questionObj]);
            setQuestion('');
            setAnswerType('Text');
            setAnswer('');
            handleClose();
        } catch (e) {
            let passErr = e.response.data.message;
            setPassErr(passErr);
            console.log(passErr);
            setTimeout(function () {
                setPassErr("");
            }, 3000);

            //console.log("pass", e.response.data.message);
        }
    }

    return(
        <div>
            <Header/>
            <div className="container">
            		<div className="_vertical-center">
            			<div className="main-div">
                        <p style={{color:'green'}}>{passSuccess}</p>
                        <p style={{color:'red'}}>{passErr}</p>
                        <form onSubmit={handleFormSubmit(onSubmit)}>
                                <div className="cut-box">
                                    <label htmlFor="formName">Form Name</label>
                                    <input className="text-box-cust" 
                                     value={formName}
                                     onChange={(e) => setFormName(e.target.value)}
                                     ref={registerForm({
                                       required: true
                                     })}
                                    type="text" id="formName" name="formName" placeholder="Form Name"/>
                                    
                                    {formErrors.formName && <p className="error-msg"> Form Name is required.</p>}
                                </div>
                                {
                                    questionsList.length > 0 ?
                                    questionsList.map(( item, index ) => {
                                        return (
                                            <div className="cut-box mb-2" key={index}>
                                                <p><strong>Question {index+1}: {item.question}</strong> </p>
                                                <p><strong>Answer: </strong></p>
                                                 {
                                                 Array.isArray(item.answer) ?
                                                 item.answer.length > 0 ?
                                                    <ul>   
                                                        {
                                                            item.answer.map(( answerItem, i ) => {
                                                                return <li key={i}>{answerItem}</li>
                                                            })
                                                        }
                                                    </ul>
                                                    : null
                                                 : 
                                                 <span>{item.answer}</span>
                                                 }
                                            </div>            
                                        )
                                    })
                                    :null
                                }
                                <div className="cut-box">

                                </div>
                                <div className="cut-box mb-2">
                                    <Button variant="primary" onClick={handleShow}>
                                        Add Question
                                    </Button>
                                </div>
                                <div className="more-select">
                                    <div className="input-box-web">
                                    <button type="submit" className="btn btn-success">Save Form</button>
                                    </div>
                                </div>
                            </form>
                      
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Add Question</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <form onSubmit={handleQuestionFormSubmit(onQuestionAdd)}>
                                <div className="cut-box">
                                    <label htmlFor="question">Question</label>
                                    <input className="text-box-cust" 
                                     value={question}
                                     onChange={(e) => setQuestion(e.target.value)}
                                     ref={registerQuestionForm({
                                       required: true
                                     })}
                                    type="text" id="question" name="question" placeholder="Enter Question"/>
                                    
                                    {questionFormErrors.question && <p className="error-msg"> Question is required.</p>}
                                </div>
                              
                                <div className="more-select cut-box">
                                    <label htmlFor="answerType">Answer Type</label>
                                    <div className="input-box-web">
                                        <select className="text-box-cust" onChange={(e)=>setAnswerType(e.target.value)} value={answerType}>
                                            <option value="Text">Text</option>
                                            <option value="MultichoiceCheckbox">Multichoice Checkbox</option>
                                            <option value="SingleSelectRadio">Single Select radio</option>
                                        </select>
                                    </div>
                                    {questionFormErrors.answerType && <p className="error-msg"> Answer Type is required. </p>}
                                </div>
                                {
                                    answerType !== "" && answerType !== null ?  
                                
                                <div className="cut-box">
                                    <label htmlFor="answer">Answer</label>
                                    {
                                        answerType === "Text" ? 
                                        <input className="text-box-cust" 
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        ref={registerQuestionForm({
                                          required: true
                                        })}
                                       type="text" id="answer" name="answer" placeholder="Enter Answer"/>
                                       
                                        : 
                                        <textarea className="text-box-cust"  name="answer" placeholder="Enter Answer"
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            ref={registerQuestionForm({ required: true })}
                                            rows={10}
                                            ></textarea>
                                        
                                    }
                                   
                                    {questionFormErrors.answer && <p className="error-msg"> Answer is required.</p>}
                                </div>
                            : null }
                                <div className="more-select">
                                    <div className="input-box-web">
                                    <button type="submit" className="btn btn-success">Add</button>
                                    </div>
                                </div>
                            </form>
                      
                                    </Modal.Body>
                            </Modal>
                        </div>
                    </div>    
                </div>
            <Footer/>
        </div>
    )
}

export default CreateForm;