import React, {useState} from 'react';
import './App.css';

import Button from './components/Button';
import ListOfCountriesModal from './components/CountryService/ListOfCountriesModal';
import CountryInformationModal from './components/CountryService/CountryInformationModal';
import CapitalWeatherModal from './components/CountryService/CapitalWeatherModal';


function App() {
    const [isListOfCountriesModalOpen, setListOfCountriesModalOpen] = useState(false);
    const [isCountryInformationModalOpen, setCountryInformationModalOpen] = useState(false);
    const [isCapitalWeatherModalOpen, setCapitalWeatherModalOpen] = useState(false);

    const renderPanel = () => {
        return (
            <div className="button-container">
                <Button label="List of Countries" onClick={() => setListOfCountriesModalOpen(true)} />
                <Button label="Country Information" onClick={() => setCountryInformationModalOpen(true)} />
                <Button label="Capital Weather" onClick={() => setCapitalWeatherModalOpen(true)} />
            </div>
        );
    };


    return (
        <div className="App">
            <header className="App-header">
                <h1>Country Service System</h1>
            </header>
            <div className="panel">
                <h2>Choose You Service</h2>
                {renderPanel()}

                <ListOfCountriesModal isOpen={isListOfCountriesModalOpen}
                                      onRequestClose={() => setListOfCountriesModalOpen(false)}/>
                <CountryInformationModal isOpen={isCountryInformationModalOpen}
                                         onRequestClose={() => setCountryInformationModalOpen(false)}/>
                <CapitalWeatherModal isOpen={isCapitalWeatherModalOpen}
                                     onRequestClose={() => setCapitalWeatherModalOpen(false)}/>
            </div>
        </div>
    );
}

export default App;
