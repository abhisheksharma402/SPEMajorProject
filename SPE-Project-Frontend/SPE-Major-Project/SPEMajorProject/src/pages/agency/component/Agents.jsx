import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Packages.css';

const Agents = () => {
     const [agents, setAgents] = useState([]);
     const [selectedAgentEmail, setSelectedAgentEmail] = useState('');
     const [formData, setFormData] = useState({
          name: '',
          phoneNumber: '',
          email: '',
          password: '',
          agencyEmail: '',
     });

     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          });
     };


     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post('http://localhost:9092/agent/register', formData);
               console.log('Package created successfully:', response.data);
               setFormData({
                    name: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    agencyEmail: '',
               });
          } catch (error) {
               console.error('Error creating package:', error);
          }
     };



     const [backgroundImage, setBackgroundImage] = useState('');

     useEffect(() => {
          async function fetchRandomImage() {
               try {
                    const response = await axios.get('https://source.unsplash.com/random/1080x720/?travel');
                    setBackgroundImage(response.request.responseURL);
               } catch (error) {
                    console.error('Error fetching random image:', error);
               }
          }

          fetchRandomImage();
     }, []);


     return (
          <div className="package-main flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url("${backgroundImage}")` }}>
               <div className="main-form p-6 bg-white bg-opacity-80 rounded-lg shadow-md p-20">
                    <h2 className="text-3xl font-bold mb-6 text-center">Add an Agent to the Team</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                   Agent Name
                              </label>
                              <input
                                   type="text"
                                   name="name"
                                   value={formData.name}
                                   onChange={handleChange}
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                   required
                              />
                         </div>
                         <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                                   Phone Number
                              </label>
                              <input
                                   type="text"
                                   name="phoneNumber"
                                   value={formData.phoneNumber}
                                   onChange={handleChange}
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                   required
                              />
                         </div>
                         <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                   Agent Email
                              </label>
                              <input
                                   type="email"
                                   name="email"
                                   value={formData.email}
                                   onChange={handleChange}
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                   required
                              />
                         </div>
                         <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                   Password
                              </label>
                              <input
                                   type="password"
                                   name="password"
                                   value={formData.password}
                                   onChange={handleChange}
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                   required
                              />
                         </div>
                         <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="agencyEmail">
                                   Agency Email
                              </label>
                              <input
                                   type="email"
                                   name="agencyEmail"
                                   value={formData.agencyEmail}
                                   onChange={handleChange}
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                   required
                              />
                         </div>
                         
                         <div className="col-span-2 flex items-center justify-between mt-4">
                              <button
                                   type="submit"
                                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                              >
                                   Register Agent
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     );
};

export default Agents;
