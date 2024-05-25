import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import logo from './assets/travelagency-admin/logo.svg';
import home from './assets/travelagency-admin/home.svg';
import gifticon from './assets/travelagency-admin/iconthree.svg';
import iconthree from './assets/travelagency-admin/iconthree.svg';
import iconfour from './assets/travelagency-admin/iconfour.svg';
import lasticon from './assets/travelagency-admin/lasticon.svg';
import settingicon from './assets/travelagency-admin/settingicon.svg';
import profileicon from './assets/travelagency-admin/profile.svg';
import searchIcon from './/assets/travelagency-admin/searchicon.svg';
import hamburger from './assets/travelagency-admin/hamburger.svg';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import PackageCard from "./PackageCard";
import "../style/Package.css"



const navitem = [
     { img: home, name: "Home" },
     { img: gifticon, name: "Plan a Trip" },
     { img: iconthree, name: "Upcoming Trips" },
     { img: iconfour, name: "Past Trips" }
];


const Package = () => {

     const location = useLocation();

     const [NavOpen, IsNavOpen] = useState(false);

     const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixid=MnwxfDB8MXxyYW5kb218MHx8dHJhdmVsfHx8fHx8MTcxNjU2MTM3NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080');


     const pkg = location.state;

     console.log(pkg.placesToVisit.split(','))

     console.log(pkg);

     return (
          <div className="flex">
               <div
                    className={`bg-white transition-all duration-500 ease-in-out h-dvh gap-12 pl-4 rounded-br-lg shadow-md flex-col fixed z-10 sm:flex ${NavOpen ? "w-[200px] top-0 left-0" : "w-[78px] -left-52 sm:left-0"
                         } `}
               >
                    <div className="flex pl-2.5 pt-8 px-5 justify-between items-center">
                         <Link href="#_">
                              <img src={logo} alt="logo" />
                         </Link>
                    </div>
                    <div className="flex flex-col items-start gap-14 justify-between pr-5 py-5 h-screen mt-5 md:mt-0">
                         <div className="flex flex-col gap-10 h-screen">
                              {navitem.map((data, index) => {
                                   return (
                                        <div
                                             key={index}
                                             className={`flex gap-3 items-center ${NavOpen ? "hover:bg-[#D8FFFF] px-1 rounded-sm mb-8" : ""
                                                  }`}
                                        >
                                             <div className="">
                                                  <Link to="/agency/packages" className="hover:bg-[#D8FFFF] transition-colors duration-300 w-[42px] h-[42px] flex items-center justify-center rounded-sm">
                                                       <img src={data.img} alt="logo" />

                                                  </Link>
                                             </div>
                                             <span
                                                  className={` ${NavOpen ? "block delay-700 delayed-text" : "hidden"
                                                       }`}
                                             >
                                                  {data.name}
                                             </span>
                                        </div>
                                   );
                              })}
                         </div>
                    </div>
               </div>
               <div className="w-full flex flex-col md:ml-20">
                    <div className="px-5 md:px-10 py-5 bg-white flex items-center justify-between w-full fixed z-20">
                         <div className="flex items-center gap-2 sm:hidden">
                              <img src="/assets/travelagency-admin/logo.svg" alt="logo" />
                              <h1 className="font-semibold text-lg text-black">Salefynno</h1>
                         </div>
                         <div className="hidden sm:block z-50">
                              <a onClick={() => IsNavOpen(!NavOpen)}>
                                   <img src={hamburger} alt="" />
                              </a>
                         </div>
                         <div className="flex gap-12 md:mr-16">
                              <div>
                                   <div className="md:flex items-center bg-[#EFF7FF] rounded-3xl px-3 py-2.5 hidden border-transparent border-2 group focus-within:border-[#09D7C9]">
                                        <img
                                             src={searchIcon}
                                             alt="search"
                                        />
                                        <input
                                             type="text"
                                             placeholder="Search.."
                                             className="bg-transparent px-4 focus:outline-none group "
                                        ></input>
                                   </div>
                              </div>
                              <div className="flex items-center gap-2.5">
                                   <a href="#_" className="md:hidden">
                                        <img
                                             src={searchIcon}
                                             alt="searchicon"
                                        />
                                   </a>
                                   <a href="#_">
                                        <img src="/assets/travelagency-admin/sun.svg" alt="" />
                                   </a>
                                   <a href="#_">
                                        <img src="/assets/travelagency-admin/color.svg" alt="" />
                                   </a>
                                   <a href="#_">
                                        <img src="/assets/travelagency-admin/bell.svg" alt="" />
                                   </a>
                                   <a href="#_">
                                        <img src="/assets/travelagency-admin/gridmenu.svg" alt="" />
                                   </a>
                                   <a href="#_">
                                        <img
                                             src={profileicon}
                                             alt="profileicon"
                                        />
                                   </a>
                                   <a href="#_" onClick={() => IsNavOpen(!NavOpen)}>
                                        <img
                                             src={hamburger}
                                             alt="hamburger"
                                             className="sm:hidden"
                                        />
                                   </a>
                              </div>
                         </div>
                    </div>
                    <div className="main-body bg-cover bg-center" style={{ backgroundImage: `url("${backgroundImage}")` }}>

                         {/* <div className="flex flex-wrap justify-center"> */}
                         <div className="p-10 bg-white rounded-lg shadow-lg w-full bg-opacity-70">
                              <div className="text-center">
                                   <h1 className="font-extrabold text-4xl mb-10">Package Details</h1>
                              </div>
                              <div className="flex flex-col items-center">
                                   <h1 className="text-3xl text-gray-700 font-bold mb-8">Description</h1>
                                   <p>{pkg.description}</p>
                              </div>
                              <div className="flex justify-center">
                                   <div className="m-10">
                                        <div>
                                             <h2 className="text-3xl text-gray-700 font-bold mb-8">{pkg.name}</h2>
                                        </div>
                                        <div className="mb-6">
                                             <p className="text-xl text-gray-600 mb-6"><strong>Destination:</strong> {pkg.destination}</p>
                                             <p className="text-xl text-gray-600 mb-6"><strong>Number of Days:</strong> {pkg.numberOfDays}</p>
                                             <p className="text-xl text-gray-600 mb-6"><strong>Number of Nights:</strong> {pkg.numberOfNights}</p>
                                        </div>
                                        <div className="mb-6">
                                             <p className="text-xl text-gray-600 mb-6"><strong>Price:</strong> Rs. {pkg.price}</p>
                                             <p className="text-xl text-gray-600 mb-2"><strong>Places to Visit:</strong></p>
                                             <ul className="list-disc pl-5 mb-6">
                                                  {pkg.placesToVisit.split(',').map((place, key) =>
                                                       // {console.log(place)}
                                                       (<li key={key} className="mb-2">{place}</li>)
                                                  )}
                                             </ul>
                                             <p className="text-xl text-gray-600 mb-2"><strong>Description</strong></p>
                                             <p>{pkg.description}</p>
                                        </div>

                                   </div>
                                   <div className="m-10">
                                        <h1 className="text-3xl text-gray-700 font-bold mb-8">Agency Details</h1>
                                        <p className="text-xl text-gray-600 mb-6"><strong>Name:</strong> {pkg.agency.name}</p>
                                        <p className="text-xl text-gray-600 mb-6"><strong>Email:</strong> {pkg.agency.email}</p>
                                        <p className="text-xl text-gray-600 mb-6"><strong>Phone Number:</strong> {pkg.agency.phoneNumber}</p>
                                        <p className="text-xl text-gray-600 mb-6"><strong>Address:</strong> {pkg.agency.address}</p>
                                        <p className="text-xl text-gray-600 mb-6"><strong>License Number:</strong> {pkg.agency.licenseNumber}</p>
                                   </div>
                                   <div className="m-10">
                                        <h1 className="text-3xl text-gray-700 font-bold mb-8">Agent Details</h1>
                                        <p className="text-xl text-gray-600 mb-6"><strong>Name:</strong> {pkg.agent.name}</p>
                                        <p className="text-xl text-gray-600 mb-6"><strong>Email:</strong> {pkg.agent.email}</p>
                                        <p className="text-xl text-gray-600 mb-6"><strong>Phone Number:</strong> {pkg.agent.phoneNumber}</p>
                                   </div>
                              </div>

                              <div className="flex flex-col items-center mb-8">
                                   <h1 className="text-3xl text-gray-700 font-bold mb-8">Itinerary</h1>
                                   {/* <ul className="list-disc pl-5"> */}
                                   <div className="flex ">


                                        {pkg.itinerary.map((item, index) => (
                                             // <li key={item.id} className="mb-5">
                                             <div className="mx-10 rounded-lg shadow-lg p-5">
                                                  <p className="text-xl text-gray-600 mb-6"><strong>Day {index + 1}</strong></p>
                                                  <p className="text-xl text-gray-600 mb-6"><strong>Date:</strong> {new Date(item.dateTime).toLocaleDateString()}</p>
                                                  <p className="text-xl text-gray-600 mb-6"><strong>Time:</strong> {new Date(item.dateTime).toLocaleTimeString()}</p>
                                                  <p className="text-xl text-gray-600 mb-6">Description</p>
                                                  <p>{item.description}</p>
                                             </div>
                                             // </li>
                                        ))}
                                   </div>
                                   {/* </ul> */}
                              </div>

                              <div className="flex justify-center">
                                   <button onClick={(e) => fetchPackagesByDestination(e)} type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 text-xl rounded-lg text-sm px-5 py-2.5 text-center my-10">Book Package</button>
                              </div>


                         </div>

                         {/* </div> */}
                    </div>
               </div>
          </div>
     );
};
export default Package;

