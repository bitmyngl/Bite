import React, { useRef, useState , useEffect} from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Review from "./Review";
import axios from 'axios';
import { useContext } from 'react';
import  UserContext  from './Usercontext';

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./../styles/comment.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function App() {


  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios.get("http://localhost:5000/api/patelcomment")
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  };


  return (
    <div className="outer-feedback">
      <div className="upper-section">
        <h1 className="heading">Comments</h1>
        <p>Read all thoughts about our mess and food</p>
        <Link to="/patelcomment">
          <a class="btn btn-outline-secondary" href="#" role="button">
            See all comments
          </a>
        </Link>
      </div>
      <div className="feedback">
        <>
          <Swiper
            className="swiper-container"
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
          >
            
            {console.log(comments)}

            {comments.map((comment, index) => (
            <SwiperSlide key={index}>
              <Review comment={comment.comment} username = {comment.username}/>
            </SwiperSlide>
          ))}

          </Swiper>
        </>
      </div>
    </div>
  );
}
