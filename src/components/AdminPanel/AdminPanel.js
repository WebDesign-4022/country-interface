import React, {useState} from 'react';
import Button from '../Button';
import UserListModal from './UserListModal';
import './AdminPanel.css';

const AdminPanel = ({onBack}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="panel">
            <h2>Admin Panel</h2>
            <div className="button-container">
                <Button label="Users List" onClick={() => setIsModalOpen(true)}/>
                <Button label="Back" onClick={onBack}/>
            </div>
            <UserListModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default AdminPanel;
