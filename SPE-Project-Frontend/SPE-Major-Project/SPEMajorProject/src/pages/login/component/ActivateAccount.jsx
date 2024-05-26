import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import otpImage from "../assets/otp.jpeg";
// import { useDispatch, useSelector } from "react-redux";
// import {
//      handleOTPverification,
//      handleLogin,
//      handleSignUp,
// } from "../../Store/loginSlice";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import axios from "axios";
const notyf = new Notyf({
     position: {
          x: "right",
          y: "top",
     },
});

const ActivateAccount = () => {
     const navigate = useNavigate();
     const location = useLocation();
     const [otp, setOtp] = useState(new Array(6).fill(""));
     const inputRefs = useRef([]);
     const isFirstRender = useRef(true);
     const [error, setError] = useState(false);
     const data = location.state.data;
     let role = location.state.role;
     // const isAuthenticated = useSelector(
     //      (state) => state.login.user.isAuthenticated
     // );

     console.log(data,role);

     useEffect(() => {
          if (inputRefs.current[0]) {
               inputRefs.current[0].focus();
          }
     }, []);

     const handleChange = (index, e) => {
          const value = e.target.value;
          if (isNaN(value)) return;

          const newOtp = [...otp];
          newOtp[index] = value.substring(value.length - 1);
          setOtp(newOtp);

          if (value && index < 5 && inputRefs.current[index + 1]) {
               inputRefs.current[index + 1].focus();
          }
     };

     const handleClick = (index) => {
          inputRefs.current[index].setSelectionRange(1, 1);

          if (index > 0 && !otp[index - 1]) {
               inputRefs.current[otp.indexOf("")].focus();
          }
     };

     const handleResendOtp = async () => {
          if (location.state.type == "login") {
               const loginSuccess = await dispatch(handleLogin(data));
          } else {
               const signInSucess = await dispatch(handleSignUp(data));
          }
     };

     const handleKeyDown = (index, e) => {
          if (
               e.key === "Backspace" &&
               !otp[index] &&
               index > 0 &&
               inputRefs.current[index - 1]
          ) {
               inputRefs.current[index - 1].focus();
          }
     };

     const handleOTPverification = async (otpData) => {
          console.log("otp: ",otpData.otp);
          const otp = otpData.otp;
          console.log(otp);
          try {
               let response;
               console.log(otpData);
               const reqData = {
                    email: data.email,
                    activationToken: otp
               }

               response = await axios.post(
                    `http://localhost:9092/${role}/activate-account`,
                    reqData
               );

               console.log("User Verification:", response);
               return response.data;

          } catch (error) {
               notyf.error(
                    "Error While Activating Account"
               );
               console.error("Error signing up:", error);
          }
     }

     const fetchData = async () => {
          console.log(role);
          const res = handleOTPverification({otp: otp.join("")})
          if(res){
               if(role==="user")role="customer";
               navigate(`/${role}/dashboard`,{replace:true});
          }
          
          setError(res);
          if (res) {
               if (role === "user") {
                    // navigate("/login");
               }
          } else {
               return;
          }
     };
     // useEffect(() => {
     //      if (isFirstRender.current) {
     //           isFirstRender.current = false;
     //           return;
     //      }
     //      if (!error && firstTimeLogin === false) {
     //           if (role === "patient") {
     //                if (location.state.type === "signup") {
     //                     notyf.success("Signup Successful");
     //                     navigate("/login");
     //                } else if (location.state.type === "login") {
     //                     navigate("/patient/details");
     //                }
     //           } else {
     //                navigate(`/${role}/changepwd`);
     //           }
     //      } else if (!error && firstTimeLogin === true) {
     //           navigate(`/${role}/dashboard`);
     //      }
     // }, [location.state.type, navigate, statePatient, stateDoctor, stateHospital, firstTimeLogin]);

     return (
          <div
               style={{
                    textAlign: "center",
                    boxSizing: "border-box",
                    paddingTop: "110px",
               }}
          >
               <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                    <img
                         src={otpImage}
                         alt="otp"
                         style={{ width: "200px", marginLeft: "80px", marginBottom: "2%" }}
                    />
               </div>
               <h2>Enter 6 Digit OTP</h2>
               <div>
                    {otp.map((value, index) => {
                         return (
                              <input
                                   key={index}
                                   type="text"
                                   ref={(input) => (inputRefs.current[index] = input)}
                                   value={value}
                                   onChange={(e) => handleChange(index, e)}
                                   onClick={() => handleClick(index)}
                                   onKeyDown={(e) => handleKeyDown(index, e)}
                                   style={{
                                        width: "40px",
                                        height: "40px",
                                        margin: "5px",
                                        textAlign: "center",
                                        fontSize: "1.2em",
                                   }}
                              />
                         );
                    })}
               </div>
               <Button
                    variant="contained"
                    onClick={fetchData}
                    style={{
                         marginTop: "10px",
                         backgroundColor: "#3F776B",
                         color: "white",
                    }}
               >
                    Verify OTP
               </Button>
               <p style={{ marginTop: "20px" }}>
                    <span>
                         Didn't Received OTP{" "}
                         <span
                              onClick={handleResendOtp}
                              style={{
                                   textDecoration: "underline",
                                   color: "blue",
                                   cursor: "pointer",
                              }}
                         >
                              Resend OTP
                         </span>
                    </span>
               </p>
          </div>
     );
};

export default ActivateAccount;