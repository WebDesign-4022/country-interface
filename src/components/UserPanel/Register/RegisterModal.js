import React, { useState } from 'react';
import Modal from 'react-modal';
import './RegisterModal.css';

const RegisterModal = ({ isOpen, onRequestClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": username,
            "password": password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/users/register", requestOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(`Error ${response.status}: Username Already Registered`);
                }
            })
            .then(() => {
                setError('')
                setResult("User Created Successfully")
            })
            .catch(error => {
                setResult('')
                setError(error.message);
            });
    };

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setResult('');
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
            <h2>Register</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <div className="modal-buttons">
                <button onClick={handleRegister}>Register</button>
                <button onClick={handleClose}>Close</button>
            </div>
            {result && <p className="result-message">{result}</p>}
            {error && <p className="error-message">{error}</p>}
        </Modal>
    );
};

export default RegisterModal;
