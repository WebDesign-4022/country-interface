import React from 'react';
import Button from '../Button';
import './AdminPanel.css';

const AdminPanel = ({ onBack }) => {
    return (
        <div className="panel">
            <h2>Admin Panel</h2>
            <Button label="Login for Admin" onClick={() => alert('Admin Login Clicked')}/>
            <Button label="User List" onClick={() => alert('User List Clicked')}/>
            <Button label="Back" onClick={onBack}/>
        </div>
    );
};

export default AdminPanel;
