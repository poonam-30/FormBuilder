import React, {useEffect,useState }  from 'react';
import Header from "../common/header";
import Footer from "../common/footer";
import Table from 'react-bootstrap/Table';
import { Link, useHistory} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

const Forms = () => {

    const forms = useSelector(({forms}) => forms.formsList);    
    const [formsList,setFormsList] = useState([]);

    useEffect(() => {
         
        setFormsList(forms.length > 0 ? JSON.parse(forms) : []);
        
    },[])
   
    return(
        <div>
            <Header/>
            <div className="container">
            		<div className="_vertical-center">
            			<div className="main-div">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Form Name</th>
                                    <th>Form URL</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                formsList.length > 0 ? (
                                    formsList.map(( item, index ) => {
                                        return (
                                            <tr key={index}>
                                            <td>{item.formName}</td>
                                            <td><Link to={`/${item.formURL}`}>{window.location.origin.toString() + "/" + item.formURL}</Link></td>
                                            <td>{item.createdAt}</td>
                                            </tr>
                                        );
                                        })
                                ):(
                                    <tr>
                                        <td colSpan={3}> No Records Found </td>
                                    </tr>
                                )
                            }
                            </tbody>
                            </Table>
                        </div>
                    </div>    
                </div>
            <Footer/>
        </div>
    )
}

export default Forms;