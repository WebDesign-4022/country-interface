import React, { useState } from 'react';
import Button from '../Button';
import RegisterModal from './Register/RegisterModal';
import LoginModal from './Login/LoginModal';
import ApiTokenListModal from './TokensList/ApiTokenListModal';
import CreateApiTokenModal from "./CreateToken/CreateApiTokenModal";
import './UserPanel.css';

const UserPanel = ({ onBack }) => {
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isApiTokenListModalOpen, setApiTokenListModalOpen] = useState(false);
    const [isCreateApiTokenModalOpen, setCreateApiTokenModalOpen] = useState(false);
    const [state, setNewState] = useState(0);

    const getToken = () => {
        return localStorage.getItem('loginToken');
    };

    const handleLogout = () => {
        localStorage.removeItem('loginToken');
        setNewState(state + 1)
        alert('You have been logged out');
    };

    const renderPanel = () => {
        const isLoggedOut = !!getToken();
        return (
            <div className="button-container">
                <Button label="Register" hidden={isLoggedOut} onClick={() => setRegisterModalOpen(true)} />
                <Button label="Login" hidden={isLoggedOut} onClick={() => setLoginModalOpen(true)} />
                <Button label="API Token List" hidden={!isLoggedOut} onClick={() => setApiTokenListModalOpen(true)} />
                <Button label="Create Token" hidden={!isLoggedOut} onClick={() => setCreateApiTokenModalOpen(true)} />
                <Button label="Logout" hidden={!isLoggedOut} onClick={handleLogout} />
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
            <ApiTokenListModal isOpen={isApiTokenListModalOpen} onRequestClose={() => setApiTokenListModalOpen(false)} />
            <CreateApiTokenModal isOpen={isCreateApiTokenModalOpen} onRequestClose={() => setCreateApiTokenModalOpen(false)} />
        </div>
    );
};

export default UserPanel;
