import React from 'react';
import '../style/PackageCard.css'
import { useNavigate } from 'react-router-dom';

const PackageCard = ({ packageData }) => {
     const navigate = useNavigate()
     const { name, numberOfDays, numberOfNights, price, agency, destination, description } = packageData;
     const tempDestination = destination.replace(' ', '');
     console.log(tempDestination)
     const backgroundUrl = `https://source.unsplash.com/random/1080x720/?travel`;
     console.log(backgroundUrl)

     console.log(description)

     const handleClick = (e) => {
          e.preventDefault();

          navigate('/customer/review-package', {state: packageData});

     }

     return (
          <div className="rounded-lg shadow-lg bg-white mt-20 bg-opacity-80">
               {/* <div
                    className="rounded-lg bgimg bg-cover bg-center"
                    style={{ backgroundImage: `url(https://source.unsplash.com/random/1080x720/?touristattractions)` }}
               ></div> */}
               <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-4">{name}</div>
                    <p className="text-gray-700 text-base font-bold mb-4">
                         {numberOfDays} days / {numberOfNights} nights
                    </p>
                    <p className="text-gray-700 text-base mb-4">
                         <b> Price </b>: Rs. {price}
                    </p>
                    <p className="text-gray-700 text-base mb-4">
                         <b> Agency </b>: {agency.name}
                    </p>
                    <p className='desc text-gray-700 text-base mb-4'>{description}</p>
               </div>

               <div className='flex justify-center mb-5'>
                    <button onClick={(e)=>handleClick(e)} type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Fly Me Here!</button>
               </div>
          </div>
     );
};

export default PackageCard;
