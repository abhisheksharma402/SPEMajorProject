import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Packages.css';

const Packages = () => {
    const [agents, setAgents] = useState([]);
    const [selectedAgentEmail, setSelectedAgentEmail] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        destination: '',
        numberOfDays: '',
        price: '',
        numberOfNights: '',
        placesToVisit: '',
        packageDescription: '',
        agencyEmail: '',
        agentEmail: '',
        itinerary: [],
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleItineraryChange = (index, e) => {
        const newItineraries = formData.itinerary.map((itinerary, i) => {
            if (i === index) {
                return { ...itinerary, [e.target.name]: e.target.value };
            }
            return itinerary;
        });
        setFormData({ ...formData, itinerary: newItineraries });
    };

    const addItinerary = () => {
        setFormData({
            ...formData,
            itinerary: [...formData.itinerary, { dateTime: '', description: '' }],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9094/agency/makePackage', formData);
            console.log('Package created successfully:', response.data);
            setFormData({
                name: '',
                destination: '',
                numberOfDays: '',
                price: '',
                numberOfNights: '',
                placesToVisit: '',
                packageDescription: '',
                agencyEmail: '',
                agentEmail: '',
                itinerary: [],
            });
        } catch (error) {
            console.error('Error creating package:', error);
        }
    };

    const handleAgentChange = (event) => {
        const selectedAgent = agents.find(agent => agent.name === event.target.value);
        if (selectedAgent) {
            setSelectedAgentEmail(selectedAgent.email);
            setFormData({
                ...formData,
                agentEmail: selectedAgent.email
            });
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

    useEffect(() => {
        const agencyEmail = "support@xyz.com";
        async function fetchAgents() {
            try {
                const response = await axios.get(`http://localhost:9094/agency/agents?agencyEmail=${agencyEmail}`);
                console.log(response);
                setAgents(response.data);
            } catch (error) {
                console.error('Error fetching agents data:', error);
            }
        }

        fetchAgents();
    }, []);

    return (
        <div className="package-main flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url("${backgroundImage}")` }}>
            <div className="main-form p-6 bg-white bg-opacity-80 rounded-lg shadow-md p-20">
                <h2 className="text-3xl font-bold mb-6 text-center">Create New Package</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Package Name
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">
                            Destination
                        </label>
                        <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfDays">
                            Number of Days
                        </label>
                        <input
                            type="number"
                            name="numberOfDays"
                            value={formData.numberOfDays}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfNights">
                            Number of Nights
                        </label>
                        <input
                            type="number"
                            name="numberOfNights"
                            value={formData.numberOfNights}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="placesToVisit">
                            Places to Visit
                        </label>
                        <input
                            type="text"
                            name="placesToVisit"
                            value={formData.placesToVisit}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="packageDescription">
                            Description
                        </label>
                        <textarea
                            name="packageDescription"
                            value={formData.packageDescription}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        ></textarea>
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
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="agentEmail">
                            Agent
                        </label>
                        <select
                            name="agentEmail"
                            value={selectedAgentEmail}
                            onChange={handleAgentChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="" disabled>Select an agent</option>
                            {agents.map(agent => (
                                <option key={agent.email} value={agent.name}>
                                    {agent.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-4">
                        <h3 className="text-xl font-bold mb-4 text-blue-800">Itinerary Items</h3>
                        {formData.itinerary.map((itineraryItem, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`dateTime-${index}`}>
                                        Date and Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="dateTime"
                                        value={itineraryItem.dateTime}
                                        onChange={(e) => handleItineraryChange(index, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`description-${index}`}>
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={itineraryItem.description}
                                        onChange={(e) => handleItineraryChange(index, e)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addItinerary}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        >
                            Add Itinerary Item
                        </button>
                    </div>
                    <div className="col-span-2 flex items-center justify-between mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        >
                            Create Package
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Packages;
