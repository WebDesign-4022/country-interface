import React, { useState } from 'react';
import AdminPanel from './components/AdminPanel/AdminPanel';
import UserPanel from './components/UserPanel/UserPanel';
import './App.css';

function App() {
    const [selectedPanel, setSelectedPanel] = useState(null);

    const renderPanel = () => {
        if (selectedPanel === 'admin') {
            return <AdminPanel onBack={() => setSelectedPanel(null)} />;
        } else if (selectedPanel === 'user') {
            return <UserPanel onBack={() => setSelectedPanel(null)} />;
        } else {
            return (
                <div className="selection">
                    <h2>Lets Begin!</h2>
                    <button className="button" onClick={() => setSelectedPanel('admin')}>Admin Panel</button>
                    <button className="button" onClick={() => setSelectedPanel('user')}>User Panel</button>
                </div>
            );
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>API Management Panel</h1>
            </header>
            <div className="content">
                {renderPanel()}
            </div>
        </div>
    );
}

export default App;
