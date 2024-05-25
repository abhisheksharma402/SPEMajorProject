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
import { Link } from "react-router-dom";
import axios from "axios";
import PackageCard from "./PackageCard";


const navitem = [
     { img: home, name: "Home" },
     { img: gifticon, name: "Plan a Trip" },
     { img: iconthree, name: "Upcoming Trips" },
     { img: iconfour, name: "Past Trips" }
];


const PlanTrip = () => {
     const [NavOpen, IsNavOpen] = useState(false);
     const [destination, setDestination] = useState("");
     const [packages, setPackages] = useState([]);
     const [isSetPackage, setIsSetPackage] = useState(false);

     const handleDestinationChange = (e) => {
          setDestination(e.target.value);
     }

     // useEffect(() => {
     //      async function fetchPackagesByDestination() {
     //           try {
     //                const response = await axios.get(`localhost:9094/user/packages?destination=${destination}`);
     //                console.log(response);
     //                setPackages(response.data);
     //           } catch (error) {
     //                console.error('Error fetching packages data:', error);
     //           }
     //      }

     //      fetchPackagesByDestination();
     // }, []);

     const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixid=MnwxfDB8MXxyYW5kb218MHx8dHJhdmVsfHx8fHx8MTcxNjU2MTM3NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080');

     // useEffect(() => {
     //      async function fetchRandomImage() {
     //           try {
     //                const response = await axios.get('https://source.unsplash.com/random/1080x720/?travel');
     //                setBackgroundImage(response.request.responseURL);
     //           } catch (error) {
     //                console.error('Error fetching random image:', error);
     //           }
     //      }

     //      fetchRandomImage();
     // }, []);


     async function fetchPackagesByDestination(e) {
          e.preventDefault();

          try {
               const response = await axios.get(`http://localhost:9094/user/packages?destination=${destination}`);
               console.log(response);
               setPackages(response.data);
               setIsSetPackage(true);
          } catch (error) {
               console.error('Error fetching packages data:', error);
          }

     }

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
                              <h1 className="font-semibold text-lg">Salefynno</h1>
                         </div>
                         <div className="hidden sm:block z-50">
                              <a href="#_" onClick={() => IsNavOpen(!NavOpen)}>
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
                    <div className="transition-all duration-1000 ease-in-out items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url("${backgroundImage}")` }}>
                         <div
                              className={`flex justify-center flex-col items-center p-5 mt-20 ${NavOpen
                                   ? "md:max-w-[calc(100vw_-_100px)] sm:max-w-[calc(100vw_-_160px)] md:pl-36 transition-all duration-500"
                                   : "md:max-w-[calc(100vw_-_100px)] transition-all duration-500"
                                   } `}
                         >
                              <h3 className="font-bold text-2xl">Hey! What's on Your Mind Today?</h3>

                              <div className="mt-10">
                                   <div className="md:flex w-full items-center justify-center bg-[#EFF7FF] rounded-3xl px-3 py-2.5 hidden border-transparent border-2 group focus-within:border-[#09D7C9]">
                                        <img
                                             src={searchIcon}
                                             alt="search"
                                        />
                                        <input
                                             type="text"
                                             placeholder="Where do you want to fly to?"
                                             className="bg-transparent px-4 focus:outline-none group"
                                             onChange={handleDestinationChange}
                                        ></input>

                                        <button onClick={(e) => fetchPackagesByDestination(e)} type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Hit and Fly</button>
                                   </div>
                              </div>
                              {
                                   isSetPackage &&
                                   // <div className="flex justify-center items-center bg-gray-100">
                                   // {
                                   packages.map((pack, key) => {
                                        return (<PackageCard key={key} packageData={pack} />)
                                   })
                                   // }
                                   // </div>
                              }

                         </div>
                    </div>
               </div>
          </div>
     );
};
export default PlanTrip;

