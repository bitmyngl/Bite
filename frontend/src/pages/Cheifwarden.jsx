import React from "react";
import Navbar from "./../components/Navbar.jsx";
import Gallary from "../components/Gallery.jsx";
import Comment from "../components/Currentmessmenu.jsx"
import Currentmenu from "./../components/Currentmessmenu.jsx"
import Review from "../components/Review.jsx";
import Feedback from "../components/Comment.jsx";
import Cheifwardenintro from "./../components/Cheifwardenintro.jsx";

function Cheifwarden(){
    return(
        <div>
        <Navbar />
        <Cheifwardenintro />
        {/* <Review /> */}
        <Feedback />

        <Currentmenu />
        {/* <Comment /> */}
        <Gallary />
        {/* <Complaint /> */}
    </div>
    );
}
export default Cheifwarden;