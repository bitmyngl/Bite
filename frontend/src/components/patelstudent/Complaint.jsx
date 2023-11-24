import React, { useRef, useState , useEffect} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import  UserContext  from './../Usercontext';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./../../styles/complaint.css";
import Randomcomplaint from "./Randomcomplaint";

// import required modules
import { Pagination } from "swiper/modules";

export default function Complaint() {
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



  return (
    <div className="outermost-box-complaint">
      <div>
        <div className="upper-section1">
          <h1 className="heading1">Read the complaints</h1>
        </div>
      </div>
      <div className="swiper-complaint">
        <>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >

            {complaints.map((complaintObj, index) => (
              <div key={index} className="complaint-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
              <SwiperSlide>
              <Randomcomplaint complaint={complaintObj.complaint} username={complaintObj.username}/>
            </SwiperSlide>
            </div>
          ))}

            

            
          </Swiper>
        </>
      </div>

      <div className="upper-section1">
      <Link to="/patelallcomplaint">
        <a class="btn btn-secondary" href="#" role="button">
          See all complaints & Register your Complaint
        </a>
      </Link>
      </div>
    </div>
  );
}
