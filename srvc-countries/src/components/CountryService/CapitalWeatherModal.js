import React, { useState } from 'react';
import Modal from 'react-modal';
import './MyModals.css';

const CapitalWeatherModal = ({ isOpen, onRequestClose }) => {
    const [apiToken, setApiToken] = useState('');
    const [countryName, setCountryName] = useState('');
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [error, setError] = useState('');

    const fetchWeatherInfo = () => {
        if (countryName.trim().includes(" ")) {
            setError("Please enter a valid country name");
            setWeatherInfo(null)
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", apiToken);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`http://localhost:8081/countries/${countryName.trim()}/weather`, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    throw new Error("Invalid api token");
                } else {
                    throw new Error(`Error ${response.status}`);
                }
            })
            .then(result => {
                setError('');
                setWeatherInfo(result);
            })
            .catch(error => {
                setWeatherInfo(null);
                setError(error.message);
            });
    };

    const handleClose = () => {
        setCountryName('');
        setWeatherInfo(null);
        setError('');
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            className="modal-content"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            <h2>Capital Weather</h2>
            <input
                type="text"
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
                placeholder="Enter API Token"
            />
            <input
                type="text"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                placeholder="Enter Country Name"
            />
            <div className="modal-buttons">
                <button onClick={fetchWeatherInfo}>Fetch Weather</button>
                <button onClick={handleClose}>Close</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {weatherInfo && (
                <div className="weather-info">
                    <p><strong>Country Name:</strong> {weatherInfo.country_name}</p>
                    <p><strong>Capital:</strong> {weatherInfo.capital}</p>
                    <p><strong>Wind Speed:</strong> {weatherInfo.wind_speed}</p>
                    <p><strong>Wind Degrees:</strong> {weatherInfo.wind_degrees}</p>
                    <p><strong>Temperature:</strong> {weatherInfo.temp}</p>
                    <p><strong>Humidity:</strong> {weatherInfo.humidity}</p>
                </div>
            )}
        </Modal>
    );
};

export default CapitalWeatherModal;
