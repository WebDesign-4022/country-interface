import React, { useState } from 'react';
import Modal from 'react-modal';
import CryptoJS from 'crypto-js';
import './UserListModal.css';

const ENCRYPTED_API_KEY = 'U2FsdGVkX19ABvpmwBMZz7MPPjuRyGMAqWxS36cZE7RZUH61NFITYZpJfKt2yTAHyCYYHuYEQ5H4I8xmypceiA==';

const UserListModal = ({ isOpen, onRequestClose }) => {
    const [password, setPassword] = useState(null);

    const getList = () => {
        const bytes = CryptoJS.AES.decrypt(ENCRYPTED_API_KEY, password);
        const decryptedApiKey = bytes.toString(CryptoJS.enc.Utf8);
        console.log(decryptedApiKey)
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            <h2>Users List</h2>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Admin Password"
            />
            <div className="modal-buttons">
                <button onClick={getList}>Show List</button>
                <button onClick={onRequestClose}>Close</button>
            </div>
        </Modal>
    );
};

export default UserListModal;
