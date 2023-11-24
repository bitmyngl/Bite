import React, { useState, useEffect } from "react";
import "./../../styles/complaintlist.css";
import Randomcomplaintchiefwarden from "./Randomcomplaintchiefwarden";
import axios from 'axios';
import { useContext } from 'react';
import  UserContext  from './../Usercontext';

function Complaintlist() {
  const [complaintText, setComplaintText] = useState("");
  const [complaints, setComplaints] = useState([]);

    // Example using context
    const { username, setUsername } = useContext(UserContext);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = () => {
    axios.get("http://localhost:5000/api/patelcomplaint")
      .then(response => {
        console.log(response.data);
        setComplaints(response.data);
      })
      .catch(error => {
        console.error('Error fetching complaints:', error);
      });
  };
  const handleComplaintChange = (event) => {
    setComplaintText(event.target.value);
  };

  const handleComplaintSubmit = () => {
    if (complaintText.trim() !== "") {
      axios.post("http://localhost:5000/api/patelcomplaint", {
        // Include other fields as needed (username, email, regno, time)
        username : username,
        complaint: complaintText,
      })
        .then(() => {
          // If the complaint is successfully saved, fetch the updated complaints
          console.log(complaintText);
          fetchComplaints();
          // Clear the input field
          setComplaintText("");
        })
        .catch(error => {
          console.error('Error adding complaint:', error);
        });
    }
  };

  return (
    <div className="complaintlist-outer">
      <div className="complaintlist-second-outer container">
        <h1>Complaint List</h1>
        <div className="row">
          {complaints.map((complaintObj, index) => (
            <div key={index} className="complaint-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
              <Randomcomplaintchiefwarden complaint={complaintObj.complaint} username={complaintObj.username}/>
            </div>
          ))}
        </div>
      </div>

      <div className="add-complaint-section">
        <h1 className="add-new-complaint-heading">Register Your Complaint here</h1>
        <div className="form-group">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            value={complaintText}
            onChange={handleComplaintChange}
          ></textarea>
        </div>
        <div className="submit-section">
          <button className="btn btn-primary" onClick={handleComplaintSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Complaintlist;
