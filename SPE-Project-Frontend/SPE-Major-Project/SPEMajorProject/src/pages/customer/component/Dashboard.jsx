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

const navitem = [
     { img: home, name: "Dashboard" },
     { img: gifticon, name: "Plan" },
     { img: iconthree, name: "Upcoming Trips" },
     { img: iconfour, name: "Past Trips" }
];
const cardinfo = [
     {
          title: "Total Profit",
          digit: "52,329",
     },
     {
          title: "Total Revenue",
          digit: "78,200",
     },
     {
          title: "Total Visitors",
          digit: "22,500",
     },
];
const historydata = [
     {
          img: "./assets/travelagency-admin/china.svg",
          country: "China",
          place: "The great wall of China",
          night: "5",
          departuredate: "10Jan, 2023",
          arrivaldate: "16Jan, 2023",
          people: "2",
          price: "$124",
     },
     {
          img: "/assets/travelagency-admin/tajmahal.svg",
          country: "India",
          place: "Taj Mahal",
          night: "4",
          departuredate: "8Dec, 2023",
          arrivaldate: "21 Dec, 2023",
          people: "2",
          price: "$140",
     },
     {
          img: "/assets/travelagency-admin/niagrafall.svg",
          country: "Canada",
          place: "Niagara Falls",
          night: "12",
          departuredate: "11 Dec, 2023",
          arrivaldate: "11 Dec, 2023",
          people: "5",
          price: "$560",
     },
     {
          img: "/assets/travelagency-admin/italy.svg",
          country: "Italy",
          place: "Greate Barrier Reef",
          night: "3",
          departuredate: "22 Dec, 2023",
          arrivaldate: "25 Dec, 2023",
          people: "2",
          price: "$200",
     },
     {
          img: "/assets/travelagency-admin/piramid.svg",
          country: "Greek",
          place: "Piramid",
          night: "4",
          departuredate: "24 Dec, 2023",
          arrivaldate: "28 Dec, 2023",
          people: "3",
          price: "$900",
     },
     // Pagination check
     {
          img: "/assets/travelagency-admin/china.svg",
          country: "China",
          place: "The great wall of China",
          night: "5",
          departuredate: "10Jan, 2023",
          arrivaldate: "16Jan, 2023",
          people: "2",
          price: "$124",
     },
     {
          img: "/assets/travelagency-admin/tajmahal.svg",
          country: "India",
          place: "Taj Mahal",
          night: "4",
          departuredate: "8Dec, 2023",
          arrivaldate: "21 Dec, 2023",
          people: "2",
          price: "$140",
     },
     {
          img: "/assets/travelagency-admin/niagrafall.svg",
          country: "Canada",
          place: "Niagara Falls",
          night: "12",
          departuredate: "11 Dec, 2023",
          arrivaldate: "11 Dec, 2023",
          people: "5",
          price: "$560",
     },
     {
          img: "/assets/travelagency-admin/italy.svg",
          country: "Italy",
          place: "Greate Barrier Reef",
          night: "3",
          departuredate: "22 Dec, 2023",
          arrivaldate: "25 Dec, 2023",
          people: "2",
          price: "$200",
     },
     {
          img: "/assets/travelagency-admin/piramid.svg",
          country: "Greek",
          place: "Piramid",
          night: "4",
          departuredate: "24 Dec, 2023",
          arrivaldate: "28 Dec, 2023",
          people: "3",
          price: "$900",
     },
     {
          img: "/assets/travelagency-admin/italy.svg",
          country: "Italy",
          place: "Greate Barrier Reef",
          night: "3",
          departuredate: "22 Dec, 2023",
          arrivaldate: "25 Dec, 2023",
          people: "2",
          price: "$200",
     },
     {
          img: "/assets/travelagency-admin/piramid.svg",
          country: "Greek",
          place: "Piramid",
          night: "4",
          departuredate: "24 Dec, 2023",
          arrivaldate: "28 Dec, 2023",
          people: "3",
          price: "$900",
     },
     {
          img: "/assets/travelagency-admin/china.svg",
          country: "China",
          place: "The great wall of China",
          night: "5",
          departuredate: "10Jan, 2023",
          arrivaldate: "16Jan, 2023",
          people: "2",
          price: "$124",
     },
     {
          img: "/assets/travelagency-admin/tajmahal.svg",
          country: "India",
          place: "Taj Mahal",
          night: "4",
          departuredate: "8Dec, 2023",
          arrivaldate: "21 Dec, 2023",
          people: "2",
          price: "$140",
     },
     {
          img: "/assets/travelagency-admin/niagrafall.svg",
          country: "Canada",
          place: "Niagara Falls",
          night: "12",
          departuredate: "11 Dec, 2023",
          arrivaldate: "11 Dec, 2023",
          people: "5",
          price: "$560",
     },
     {
          img: "/assets/travelagency-admin/italy.svg",
          country: "Italy",
          place: "Greate Barrier Reef",
          night: "3",
          departuredate: "22 Dec, 2023",
          arrivaldate: "25 Dec, 2023",
          people: "2",
          price: "$200",
     },
     {
          img: "/assets/travelagency-admin/piramid.svg",
          country: "Greek",
          place: "Piramid",
          night: "4",
          departuredate: "24 Dec, 2023",
          arrivaldate: "28 Dec, 2023",
          people: "3",
          price: "$900",
     },
     {
          img: "/assets/travelagency-admin/italy.svg",
          country: "Italy",
          place: "Greate Barrier Reef",
          night: "3",
          departuredate: "22 Dec, 2023",
          arrivaldate: "25 Dec, 2023",
          people: "2",
          price: "$200",
     },
     {
          img: "/assets/travelagency-admin/piramid.svg",
          country: "Greek",
          place: "Piramid",
          night: "4",
          departuredate: "24 Dec, 2023",
          arrivaldate: "28 Dec, 2023",
          people: "3",
          price: "$900",
     },
];
const tophotel = [
     {
          img: "/assets/travelagency-admin/billashotel.svg",
          hotelname: "Billas hotel&Motel",
          type: "Lux",
          beds: "2",
          adult: "3",
          perdayprice: "62",
          rating: "4.8",
     },
     {
          img: "/assets/travelagency-admin/tajhotel.svg",
          hotelname: "Taj Hotel",
          type: "Lux",
          beds: "2",
          adult: "2",
          perdayprice: "78",
          rating: "4.6",
     },
     {
          img: "/assets/travelagency-admin/greatwallhotel.svg",
          hotelname: "The great wall of China",
          type: "penthouse",
          beds: "3",
          adult: "6",
          perdayprice: "102",
          rating: "4.2",
     },
     {
          img: "/assets/travelagency-admin/elitehotel.svg",
          hotelname: "Elite Hotel",
          type: "Plus",
          beds: "1",
          adult: "2",
          perdayprice: "92",
          rating: "4.1",
     },
     {
          img: "/assets/travelagency-admin/elitehotel.svg",
          hotelname: "Elite Hotel",
          type: "Plus",
          beds: "1",
          adult: "2",
          perdayprice: "92",
          rating: "4.1",
     },
];
const options2 = {
     chart: {
          type: "areaspline",
          height: 250,
          // width: 500,
          backgroundColor: "transparent",
          spacingBottom: 0,
          spacingLeft: 0,
     },
     tooltip: {
          formatter: function () {
               return this.y;
          },
     },
     plotOptions: {
          areaspline: {
               color: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                         [0, "rgba(17, 232, 162, 1)"], // Start color
                         [1, "rgba(17, 232, 162, 0)"], // End color (transparent)
                    ],
               },
               marker: {
                    enabled: false,
               },
          },
     },
     xAxis: {
          lineColor: "transparent",
          lineWidth: 0,
          tickWidth: 0,
          categories: null,
          title: { text: null },
          labels: {
               enabled: false,
          },
          gridLineWidth: 0,
     },
     yAxis: {
          lineColor: "transparent",
          lineWidth: 0,
          categories: null,
          title: {
               text: null,
          },
          labels: {
               enabled: false,
          },
          gridLineWidth: 0,
     },
     title: false,
     series: [
          {
               data: [20, 12, 16, 7, 9, 3, 2],
          },
     ],
     exporting: {
          enabled: false,
     },
     credits: {
          enabled: false,
     },
     legend: {
          enabled: false,
     },
};
const DashBoard = () => {
     const [NavOpen, IsNavOpen] = useState(false);
     const [currentPage, setCurrentPage] = useState(0);
     const [ChangeOption, SetOptions] = useState(options2);
     useEffect(() => {
          SetOptions(options2);
     }, [ChangeOption]);
     const handlePageChange = (selectedPage) => {
          setCurrentPage(selectedPage.selected);
     };
     // Items per page
     const itemsPerPage = 5;
     // const pageCount = Math.ceil(historydata.length / itemsPerPage);
     // Slice data for current page
     const paginatedData = historydata.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage
     );
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
                                             <div className="hover:bg-[#D8FFFF] transition-colors duration-300 w-[42px] h-[42px] flex items-center justify-center rounded-sm">
                                                  <Link to={`/customer/${data.name.toLowerCase()}`}>
                                                       <img src={data.img} alt="logo" />

                                                  </Link>
                                             </div>
                                             <span
                                                  className={` ${NavOpen ? "block delay-1000 delayed-text" : "hidden"
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
                    <div className="transition-all duration-1000 ease-in-out">
                         <div
                              className={`flex flex-col w-full justify-between gap-5 p-5 mt-20 ${NavOpen
                                   ? "md:max-w-[calc(100vw_-_100px)] sm:max-w-[calc(100vw_-_160px)] md:pl-36 transition-all duration-500"
                                   : "md:max-w-[calc(100vw_-_100px)] transition-all duration-500"
                                   } `}
                         >
                              <div className="flex flex-col md:flex-col xl:flex-row w-full gap-5">
                                   <div className="w-full bg-[#FDFDFD] rounded-md shadow-md pt-5 pb-2 flex flex-col gap-5">
                                        <div className="flex flex-col gap-7 mb-6 px-5 ">
                                             <div className="flex justify-between">
                                                  <h1 className="font-bold text-2xl">Your Travel History</h1>
                                                  <img
                                                       src={searchIcon}
                                                       alt="searchicon"
                                                       className="hidden md:block cursor-pointer"
                                                  />
                                             </div>
                                        </div>
                                        <div className="overflow-x-auto flex flex-col min-h-[300px]">
                                             <div className="w-full overflow-x-scroll md:overflow-auto max-w-xl xs:max-w-xl sm:max-w-xl md:max-w-7xl 2xl:max-w-none mt-1">
                                                  <table className="table-auto overflow-scroll md:overflow-auto w-full text-left border-separate border-spacing-y-1">
                                                       <tbody>
                                                            {paginatedData.map((data, index) => {
                                                                 return (
                                                                      <tr
                                                                           key={index}
                                                                           className="cursor-pointer border-gray-100 hover:bg-[#D8FFFF] transition-colors duration-300 whitespace-nowrap border-t border-b flex px-5 justify-between items-center w-full h-[80px] text-[#637381] font-semibold text-sm"
                                                                      >
                                                                           <td className="flex gap-5">
                                                                                <div className="w-8">
                                                                                     <img src={data.img} alt="" />
                                                                                </div>
                                                                                <div className="whitespace-nowrap min-w-[200px]">
                                                                                     <h1 className="text-black font-normal">
                                                                                          {data.place}
                                                                                     </h1>
                                                                                     <h2>{data.country}</h2>
                                                                                </div>
                                                                           </td>
                                                                           <td className="whitespace-nowrap px-4">
                                                                                {data.night} Night
                                                                           </td>
                                                                           <td className="flex gap-1 whitespace-nowrap px-4">
                                                                                <div className="flex items-center w-5">
                                                                                     <img
                                                                                          src="/assets/travelagency-admin/plane.svg"
                                                                                          alt=""
                                                                                     />
                                                                                </div>
                                                                                <h3>{data.departuredate}</h3>
                                                                           </td>
                                                                           <td className="flex gap-1 px-4">
                                                                                <div className="flex items-center w-5">
                                                                                     <img
                                                                                          src="/assets/travelagency-admin/plane.svg"
                                                                                          alt=""
                                                                                     />
                                                                                </div>
                                                                                <h3>{data.arrivaldate}</h3>
                                                                           </td>
                                                                           <td className="px-2">{data.people} Adult</td>
                                                                           <td className="px-2 ">{data.price}</td>
                                                                      </tr>
                                                                 );
                                                            })}
                                                       </tbody>
                                                  </table>
                                             </div>
                                             <div className="flex justify-between px-5 items-end text-[#637381] mt-3 text-sm">
                                                  <div>1-10 Of 10 Entries</div>
                                                  <ReactPaginate
                                                       className="flex gap-3 items-center"
                                                       previousLabel={<LeftArrow />}
                                                       nextLabel={<RightArrow />}
                                                       breakLabel={"..."}
                                                       pageCount={10}
                                                       pageLinkClassName="w-5 h-5 text-center"
                                                       pageClassName="hover:bg-gray-200 rounded-[2px] w-5 h-5 flex items-center justify-center"
                                                       marginPagesDisplayed={1}
                                                       pageRangeDisplayed={3}
                                                       onPageChange={handlePageChange}
                                                       containerClassName={"pagination"}
                                                       activeClassName={
                                                            "bg-[#D8FFFF] rounded-[2px] w-5 h-5 flex justify-center items-center border-[#12ECA1] border"
                                                       }
                                                  />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};
export default DashBoard;
const LeftArrow = () => {
     return <img src="/assets/travelagency-admin/leftarrow.svg" />
};
const RightArrow = () => {
     return <img src="/assets/travelagency-admin/rightarrow.svg" />
};