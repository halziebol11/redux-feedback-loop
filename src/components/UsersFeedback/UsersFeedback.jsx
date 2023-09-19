import React, {useEffect, useState} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

//code from Ania Kubow To Do App Demo

function UsersFeedback() {

    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;

    const [feedback, setFeedback] = useState([]);
    console.log(feedback)


    //fetch feedback list
    const fetchData = () => {
        axios.get(`/feedback/${userEmail}`)
        .then((response) =>{
        console.log(response.data);
        setFeedback(response.data);
        })
        .catch((error) => {
        console.log(error)
        })
    }

    useEffect ( () => {
        if (authToken) {
            fetchData();
        }}
        , [])

    return(

        <div>

            {(feedback == null)
            ? <p>no feedback entered</p>
            : <div>
                <div className="table-header">
                    <h1>Feedback</h1>
                </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Feeling</th>
                                <th>Understanding</th>
                                <th>Support</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedback.map((feedback) => {
                                return (
                                    <tr key={feedback.id}>
                                        <td >{feedback.feeling}</td>
                                        <td >{feedback.understanding}</td>
                                        <td >{feedback.support}</td>
                                        <td>{feedback.comments}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                 </div>
            }
        </div>
    )
}

export default UsersFeedback;