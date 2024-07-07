import React, {useState} from 'react';
import Modal from 'react-modal';
import './LoginModal.css';

const LoginModal = ({isOpen, onRequestClose}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (username.length < 1 || password.length < 1) {
            setResult('')
            setError("Username and password are required");
            return;
        }

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

        fetch("http://localhost:8080/users/login", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    throw new Error("Invalid username or password");
                } else {
                    throw new Error(`Error ${response.status}`);
                }
            })
            .then(result => {
                setError('');
                setResult("Login successful");
                localStorage.setItem('loginToken', result.loginToken);
                alert('You have been logged in');
                handleClose();
            })
            .catch(error => {
                setResult('');
                setError(error.message);
            });
    };

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setResult('');
        setError('');
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
            <h2>Login</h2>
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
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleClose}>Close</button>
            </div>
            {result && <p className="result-message">{result}</p>}
            {error && <p className="error-message">{error}</p>}
        </Modal>
    );
};

export default LoginModal;
