import React from 'react';
import Button from '../Button';
import './UserPanel.css';

const UserPanel = ({ onBack }) => {
    return (
        <div className="panel">
            <h2>User Panel</h2>
            <Button label="Login for User" onClick={() => alert('User Login Clicked')}/>
            <Button label="Register" onClick={() => alert('Register Clicked')}/>
            <Button label="API Token List" onClick={() => alert('API Token List Clicked')}/>
            <Button label="Create Token" onClick={() => alert('Create Token Clicked')}/>
            <Button label="Revoke API Token" onClick={() => alert('Revoke API Token Clicked')}/>
            <Button label="Back" onClick={onBack}/>
        </div>
    );
};

export default UserPanel;
