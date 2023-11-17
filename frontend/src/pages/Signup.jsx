// Import React and other necessary libraries
import React, { useState, useEffect } from 'react';
import "./../styles/signup.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit';

function Signup() {
  // State to store user inputs
  const [dob, setDob] = useState('');
  const [clgMail, setClgMail] = useState('');
  const [otp, setOtp] = useState(''); // Corrected state declaration


  // Function to handle sending OTP
  const sendOTP = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dob: dob,
          email: clgMail,
        }),
      });

      const result = await response.json();

      // Handle the result as needed
      console.log(result);

      if (response.ok) {
        // If the response is OK, show a success message or take further actions
        console.log('OTP sent successfully');
      } else {
        // Handle other scenarios, e.g., display an error message
        console.error('Error sending OTP');
      }
    } catch (error) {
      console.error('Error during OTP request:', error);
    }
  };

  // Function to handle going to the next step after OTP verification
  const goToNextStep = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: otp,
          email: clgMail,
        }),
      });

      const result = await response.json();

      // Handle the result as needed
      console.log(result);

      if (response.ok && result.success) {
        // If the response is OK and OTP is verified, proceed to the next step
        console.log('OTP verified successfully');
        // Example: Redirect to a desired path
        // navigate('/desired-path');
      } else {
        // Handle other scenarios, e.g., display an error message
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
    }
  };

  // useEffect to handle component mounting and unmounting
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dob: dob,
            email: clgMail,
          }),
          signal: abortController.signal,
        });

        const result = await response.json();

        if (isMounted) {
          // Handle the result as needed
          console.log(result);

          if (response.ok) {
            // If the response is OK, show a success message or take further actions
            console.log('OTP sent successfully');
          } else {
            // Handle other scenarios, e.g., display an error message
            console.error('Error sending OTP');
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error during OTP request:', error);
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup: Abort ongoing fetch requests when the component unmounts
      isMounted = false;
      abortController.abort();
    };
  }, [dob, clgMail]);

  return (
    <div>
        <div className='signup-otpform-outermostbox'>
      <MDBContainer fluid>
        <MDBCard className='text-black m-5 signup-otpform-secondouterbox' style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput
                    label='Your DOB'
                    id='form1'
                    type='text'
                    className='w-100'
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput
                    label='Your clg mail'
                    id='form2'
                    type='email'
                    value={clgMail}
                    onChange={(e) => setClgMail(e.target.value)}
                  />
                </div>

                <MDBBtn className='mb-4' size='lg' onClick={sendOTP}>
                  Send OTP
                </MDBBtn>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput
                    label='Enter the Otp'
                    id='form4'
                    type='password'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <MDBBtn className='mb-4' size='lg' onClick={goToNextStep}>
                  Go to next Step
                </MDBBtn>

              </MDBCol>

              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
    </div>
  );
}

export default Signup;
