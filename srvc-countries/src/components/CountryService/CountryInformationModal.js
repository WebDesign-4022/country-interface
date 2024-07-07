import React, { useState } from 'react';
import Modal from 'react-modal';
import './MyModals.css';

const CountryInformationModal = ({ isOpen, onRequestClose }) => {
    const [apiToken, setApiToken] = useState('');
    const [countryName, setCountryName] = useState('');
    const [countryInfo, setCountryInfo] = useState(null);
    const [error, setError] = useState('');

    const fetchCountryInfo = () => {
        if (countryName.trim().includes(" ")) {
            setError("Please enter a valid country name");
            setCountryInfo(null)
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", apiToken);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`http://localhost:8081/countries/${countryName.trim()}`, requestOptions)
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
                setCountryInfo(result);
            })
            .catch(error => {
                setCountryInfo(null);
                setError(error.message);
            });
    };

    const handleClose = () => {
        setCountryName('');
        setCountryInfo(null);
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
            <h2>Country Information</h2>
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
                <button onClick={fetchCountryInfo}>Fetch Info</button>
                <button onClick={handleClose}>Close</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {countryInfo && (
                <div className="country-info">
                    <p><strong>Name:</strong> {countryInfo.name}</p>
                    <p><strong>Capital:</strong> {countryInfo.capital}</p>
                    <p><strong>ISO2:</strong> {countryInfo.iso2}</p>
                    <p><strong>Population:</strong> {countryInfo.population}</p>
                    <p><strong>Population Growth:</strong> {countryInfo.pop_growth}</p>
                    <p><strong>Currency Code:</strong> {countryInfo.currency.code}</p>
                    <p><strong>Currency Name:</strong> {countryInfo.currency.name}</p>
                </div>
            )}
        </Modal>
    );
};

export default CountryInformationModal;
