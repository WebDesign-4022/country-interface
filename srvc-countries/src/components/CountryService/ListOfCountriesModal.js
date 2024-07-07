import React, {useState} from 'react';
import Modal from 'react-modal';
import './MyModals.css';

const ListOfCountriesModal = ({isOpen, onRequestClose}) => {
    const [apiToken, setApiToken] = useState('');
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchCountries = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", apiToken);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8081/countries", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    throw new Error("Invalid api token");
                } else {
                    throw new Error(`Error ${response.status} ${response.text()}`);
                }
            })
            .then(result => {
                setError('');
                setCountries(result.countries);
            })
            .catch(error => {
                setCountries([]);
                setError(error.message);
            });
    };

    const handleClose = () => {
        setCountries([]);
        setError('');
        setSearchTerm('')
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
            <h2>List of Countries</h2>
            <input
                type="text"
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
                placeholder="Enter API Token"
            />
            <div className="modal-buttons">
                <button onClick={fetchCountries}>Fetch Countries</button>
                <button onClick={handleClose}>Close</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {countries.length > 0 && (
                <div>
                    <input
                        type="text"
                        placeholder="Search countries..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-box"
                    />
                    <ul className="country-list">
                        {filteredCountries.map((country, index) => (
                            <li key={index}>{country.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Modal>
    );
};

export default ListOfCountriesModal;
