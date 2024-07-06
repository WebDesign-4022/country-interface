import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import CryptoJS from 'crypto-js';
import UserListTable from './UserListTable';
import './UserListModal.css';

const ENCRYPTED_API_KEY = 'U2FsdGVkX19ABvpmwBMZz7MPPjuRyGMAqWxS36cZE7RZUH61NFITYZpJfKt2yTAHyCYYHuYEQ5H4I8xmypceiA==';

const UserListModal = ({isOpen, onRequestClose}) => {
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [decryptedApiKey, setDecryptedApiKey] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (password.length > 0) {
            decryptPassword()
        } else {
            setDecryptedApiKey('')
        }
    }, [password]);


    const fetchUsers = () => {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', decryptedApiKey);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include'
        };

        fetch('http://localhost:8080/admin/users', requestOptions)
            .then((response) => {
                if (response.status !== 200)
                    throw new Error(`Error ${response.status}`);
                return response.json();
            })
            .then((users) => {
                setUsers(users);
                setError('');
            })
            .catch((error) => {
                setError("Wrong Password: " + error.message);
            });
    };

    const handleStatusChange = (username, active) => {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', decryptedApiKey);

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include'
        };

        fetch(`http://localhost:8080/admin/users?username=${username}&active=${active}`, requestOptions)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(`Error ${response.status}`);
                }
            })
            .then(() => fetchUsers())
            .catch((error) => {
                setError("Wrong Password: " + error.message);
            });
    };

    const decryptPassword = () => {
        try {
            const bytes = CryptoJS.AES.decrypt(ENCRYPTED_API_KEY, password);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            setDecryptedApiKey(decrypted);
        } catch (error) {
            setError('Wrong Password');
        }
    };

    const handleClose = () => {
        setPassword('');
        setUsers([])
        setDecryptedApiKey('')
        setError('')
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
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                placeholder="Enter Admin Password"
            />
            <div className="modal-buttons">
                <button onClick={fetchUsers}>Show List</button>
                <button onClick={handleClose}>Close</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {users.length > 0 ? (
                <UserListTable users={users} onChangeStatus={handleStatusChange}/>
            ) : (
                <div className="table-container">
                    <table className="user-list-table">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Registered On</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan="4">No Data</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </Modal>
    );
};

export default UserListModal;
