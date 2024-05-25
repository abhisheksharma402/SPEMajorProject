import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import '/home/abhisheksharma/abhishek/SPE-Major-Project/SPE-Project-Frontend/SPE-Major-Project/SPEMajorProject/src/pages/login/style/Login.css'
import axios from 'axios';
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
     position: {
          x: "right",
          y: "top",
     },
});

const Login = () => {
     const navigate = useNavigate();
     // const dispatch = useDispatch();
     // const data = useSelector((state) => state.login.user);
     const [data, setData] = useState({})
     const [containerClass, setContainerClass] = useState("sign-in");
     // const role = useSelector((state) => state.login.user.role);
     // const firstTimeLogin = useSelector((state) => state[role].firstTimeLogin)
     // const isAuthenticated = useSelector(
     // 	(state) => state.login.user.isAuthenticated
     // );
     // const password = useSelector((state) => state.login.user.password);
     // const [confirmPassword, setConfirmPassword] = useState("");
     // const handleConfirmChange = (e) => {
     // 	setConfirmPassword(e.target.value);
     // };
     // const errorMsg = useSelector((state) => state.login.errorMsg);

     const handleSignInChange = (e) => {
          const { name, value } = e.target;
          setData((prevState) => ({
               ...data,
               [name]: value
          }));
          // console.log(data);
          // dispatch(loginActions.updateDetails({ name, value }));
          const { id } = e.target;
          const buttons = ["customer", "agency", "agent"];
          if (id) {
               buttons.forEach((button) => {
                    document.getElementById(button).style.backgroundColor =
                         button === id ? "#4FA786" : "#efefef";
               });
          }
     };

     const handleLogin = async (loginData) => {
          try {
               let response;
               console.log(data);
               if (data.role === "customer") {
                    response = await axios.post(
                         "http://localhost:9094/user/login",
                         loginData
                    );
               }
               else if (data.role === "agency") {
                    response = await axios.post(
                         "http://localhost:9094/agency/login",
                         loginData,
                         {
                              headers: {
                                   "Access-Control-Allow-Origin": "*",
                                   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                                   "Content-Type": "application/json",
                              },
                         }
                    );
               }
               else {
                    response = await axios.post(
                         "http://localhost:9094/agent/login",
                         loginData,
                         {
                              headers: {
                                   "Access-Control-Allow-Origin": "*",
                                   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                                   "Content-Type": "application/json",
                              },
                         }
                    );
               }
               console.log("User Verification:", response);
               return response.data;
               // const data = JSON.parse(response.config.data);
               // navigate("/verify-otp", {
               //      state: { email: loginData.email, type: "login" },
               // });
          } catch (error) {
               notyf.error(
				"Error while Signing Up"
			);
               console.error("Error signing up:", error);
          }
     }

     const handleSignIn = async (e) => {
          e.preventDefault();
          console.log("hello from handle signin");
          const loginData = {
               email: `${data.email}`,
               password: `${data.password}`
          }
          console.log("zxczxczxczxc");
          if (data.role !== "") {
               const loginSuccess = await handleLogin(loginData);
               if (loginSuccess) {
                    navigate("/agency-dashboard", {
                         state: { type: "login", data: loginData },
                    });
               }
          }
     };

     // const handleSignUpChange = (e) => {
     // 	const { name, value } = e.target;
     // 	dispatch(loginActions.updateDetails({ name, value }));
     // };

     // const handlingSignUp = async (e) => {
     // 	e.preventDefault();
     // 	if (isValidPassword(password) === false) {
     // 		notyf.error(
     // 			"Password should contain a specaial character, a number and an uppercase letter and should be atleast 8 characters long"
     // 		);
     // 		return;
     // 	}
     // 	if (password !== confirmPassword) {
     // 		notyf.error("Password and Confirm Password do not match");
     // 		return;
     // 	}

     // 	const signInSucess = await dispatch(handleSignUp(data));
     // 	if (signInSucess) {
     // 		navigate("/verify-otp", {
     // 			state: { type: "signup", data: data },
     // 		});
     // 	}
     // };

     const handleForgotPassword = () => {
          navigate("/forgot-password");
     };

     const toggle = () => {
          setContainerClass(containerClass === "sign-in" ? "sign-up" : "sign-in");
     };

     useEffect(() => {
          // Set 'sign-in' class after 200 milliseconds

          const timeoutId = setTimeout(() => {
               setContainerClass("sign-in");
          }, 200);

          // Clean up the timeout
          return () => clearTimeout(timeoutId);
     }, []); // Run this effect only once after the component mounts

     // useEffect(() => {
     // 	if (isAuthenticated) {
     // 		if(!firstTimeLogin){
     // 			if(role == 'patient'){
     // 				navigate('/patient/details')
     // 			}else{
     // 				navigate(`/${role}/changepwd`)
     // 			}
     // 		}
     // 		else{
     // 			navigate(`/${role}/dashboard`);
     // 		}
     // 	}
     // }, [isAuthenticated, navigate]);

     return (
          <div id="container" className={`container ${containerClass}`}>
               {/* <!-- FORM SECTION --> */}
               <div className="row">
                    {/* <!-- SIGN UP --> */}
                    <div className="col align-items-center flex-col sign-up">
                         <div className="form-wrapper align-items-center">
                              <div className="form sign-up">
                                   <div className="input-group">
                                        <i className="bx bxs-user"></i>
                                        <input
                                             name="firstName"
                                             type="text"
                                             // onChange={handleSignUpChange}
                                             placeholder="First Name"
                                        />
                                   </div>
                                   <div className="input-group">
                                        <i className="bx bxs-user"></i>
                                        <input
                                             name="lastName"
                                             type="text"
                                             // onChange={handleSignUpChange}
                                             placeholder="Last Name"
                                        />
                                   </div>
                                   <div className="input-group">
                                        <i className="bx bx-mail-send"></i>
                                        <input
                                             name="email"
                                             type="email"
                                             // onChange={handleSignUpChange}
                                             placeholder="Email"
                                        />
                                   </div>
                                   <div className="input-group">
                                        <i className="bx bxs-lock-alt"></i>
                                        <input
                                             name="password"
                                             type="password"
                                             // onChange={handleSignUpChange}
                                             placeholder="Password"
                                        />
                                   </div>
                                   <div className="input-group">
                                        <i className="bx bxs-lock-alt"></i>
                                        <input
                                             // onChange={handleConfirmChange}
                                             type="password"
                                             placeholder="Confirm password"
                                        />
                                   </div>
                                   <button
                                   // onClick={handlingSignUp}
                                   >Sign up</button>
                                   <p>
                                        <span>Already have an account?</span>
                                        <b onClick={toggle} className="pointer">
                                             Sign in here
                                        </b>
                                   </p>
                              </div>
                         </div>
                    </div>
                    {/* <!-- END SIGN UP -->
                <!-- SIGN IN --> */}
                    <div className="col align-items-center sign-in">
                         <div className="form-wrapper align-items-center">
                              <div className="form sign-in">
                                   <div className="role-group">
                                        <button
                                             id="customer"
                                             className="roles"
                                             name="role"
                                             value="customer"
                                             variant="contained"
                                             onClick={handleSignInChange}
                                        // style={{ backgroundColor: "#4FA786" }}
                                        >
                                             Customer
                                        </button>
                                        <button
                                             id="agency"
                                             className="roles"
                                             name="role"
                                             value="agency"
                                             variant="contained"
                                             onClick={handleSignInChange}
                                        >
                                             Agency
                                        </button>
                                        <button
                                             id="agent"
                                             className="roles"
                                             name="role"
                                             value="agent"
                                             variant="contained"
                                             onClick={handleSignInChange}
                                        >
                                             Agent
                                        </button>
                                   </div>
                                   <div className="input-group">
                                        <i className="bx bxs-user"></i>
                                        <input
                                             data-testid="signin-username"
                                             name="email"
                                             type="text"
                                             placeholder="Username"
                                             onChange={handleSignInChange}
                                        />
                                   </div>
                                   <div className="input-group">
                                        <i className="bx bxs-lock-alt"></i>
                                        <input
                                             data-testid="signin-password"
                                             name="password"
                                             type="password"
                                             placeholder="Password"
                                             onChange={handleSignInChange}
                                        />
                                   </div>
                                   <button
                                        data-testid="signin-btn"
                                        onClick={(e) => handleSignIn(e)}
                                   >Sign in</button>
                                   <p style={{ cursor: "pointer" }}
                                   // onClick={handleForgotPassword}
                                   >
                                        <b>Forgot password?</b>
                                   </p>
                                   <p>
                                        <span>Don't have an account?</span>
                                        <b onClick={toggle} className="pointer">
                                             Sign up here
                                        </b>
                                   </p>
                              </div>
                         </div>
                         <div className="form-wrapper"></div>
                    </div>
                    {/* <!-- END SIGN IN --> */}
               </div>
               {/* <!-- END FORM SECTION -->
             <!-- CONTENT SECTION --> */}
               <div className="row content-row">
                    {/* <!-- SIGN IN CONTENT --> */}
                    <div className="col align-items-center flex-col">
                         {containerClass === "sign-in" && (
                              <div className="text sign-in">Welcome to TravelGuide</div>
                         )}
                         <div className="img sign-in"></div>
                    </div>
                    {/* <!-- END SIGN IN CONTENT -->
                <!-- SIGN UP CONTENT --> */}
                    <div className="col align-items-center flex-col">
                         <div className="img sign-up"></div>
                         <div className="text sign-up">
                              <h2>Join with Us</h2>
                         </div>
                    </div>
                    {/* <!-- END SIGN UP CONTENT --> */}
               </div>
               {/* <!-- END CONTENT SECTION --> */}
          </div>
     );
}

export default Login;