import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CryptoJS from 'crypto-js';
import UserListTable from './UserListTable';
import './UserListModal.css';

const ENCRYPTED_API_KEY = 'U2FsdGVkX19ABvpmwBMZz7MPPjuRyGMAqWxS36cZE7RZUH61NFITYZpJfKt2yTAHyCYYHuYEQ5H4I8xmypceiA==';

const UserListModal = ({ isOpen, onRequestClose }) => {
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [decryptedApiKey, setDecryptedApiKey] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (decryptedApiKey) {
            fetchUsers();
        }
    }, [decryptedApiKey]);

    const fetchUsers = () => {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', decryptedApiKey);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include' // Ensure credentials are included if needed
        };

        fetch('http://localhost:8080/admin/users', requestOptions)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((result) => {
                setUsers(result);
                setError('');
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };

    const handleStatusChange = (username, active) => {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', decryptedApiKey);

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include' // Ensure credentials are included if needed
        };

        fetch(`http://localhost:8080/admin/users?username=${username}&active=${active}`, requestOptions)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(() => fetchUsers())
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };

    const getList = () => {
        try {
            const bytes = CryptoJS.AES.decrypt(ENCRYPTED_API_KEY, password);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            setDecryptedApiKey(decrypted);
        } catch (error) {
            console.error('Invalid password');
            setError('Invalid password');
        }
    };

    const handleClose = () => {
        setPassword('');
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
            <h2>Users List</h2>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Admin Password"
            />
            <div className="modal-buttons">
                <button onClick={getList}>Show List</button>
                <button onClick={handleClose}>Close</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {users.length > 0 ? (
                <UserListTable users={users} onChangeStatus={handleStatusChange} />
            ) : (
                <table className="user-list-table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan="3">No users found</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </Modal>
    );
};

export default UserListModal;
