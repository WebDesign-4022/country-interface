import React, { useState } from 'react';
import Button from '../Button';
import RegisterModal from './Register/RegisterModal';
import LoginModal from './Login/LoginModal';
import './UserPanel.css';

const UserPanel = ({ onBack }) => {
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const getToken = () => {
        return localStorage.getItem('loginToken');
    };

    const renderPanel = () => {
        const isLoggedIn = !!getToken();
        return (
            <div className="button-container">
                <Button label="Register" hidden={isLoggedIn} onClick={() => setRegisterModalOpen(true)} />
                <Button label="Login" hidden={isLoggedIn} onClick={() => setLoginModalOpen(true)} />
                <Button label="API Token List" hidden={!isLoggedIn} onClick={() => alert('API Token List Clicked')} />
                <Button label="Create Token" hidden={!isLoggedIn} onClick={() => alert('Create Token Clicked')} />
                <Button label="Revoke API Token" hidden={!isLoggedIn} onClick={() => alert('Revoke API Token Clicked')} />
                <Button label="Logout" hidden={!isLoggedIn} onClick={() => alert('Logout')} />
                <Button label="Back" hidden={false} onClick={onBack} />
            </div>
        );
    };

    return (
        <div className="panel">
            <h2>User Panel</h2>
            {renderPanel()}
            <RegisterModal isOpen={isRegisterModalOpen} onRequestClose={() => setRegisterModalOpen(false)} />
            <LoginModal isOpen={isLoginModalOpen} onRequestClose={() => setLoginModalOpen(false)} />
        </div>
    );
};

export default UserPanel;
