import React, { useState } from 'react';
import Modal from 'react-modal';
import './CreateApiTokenModal.css';

const CreateApiTokenModal = ({ isOpen, onRequestClose }) => {
    const [tokenName, setTokenName] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [newToken, setNewToken] = useState('');

    const handleCreateToken = () => {
        if (tokenName.length < 1 || expireDate.length < 1) {
            setResult('');
            setError('Name and expire date are required');
            return;
        }

        const loginToken = localStorage.getItem('loginToken');
        if (!loginToken) {
            setError('You must login first');
            return;
        }

        const formattedExpireDate = new Date(expireDate).toISOString();

        const myHeaders = new Headers();
        myHeaders.append('Authorization', loginToken);
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            name: tokenName,
            expire_date: formattedExpireDate
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch('http://localhost:8080/user/api-tokens', requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    throw new Error('Invalid login token');
                } else if (response.status === 409) {
                    throw new Error('API token already exists');
                } else {
                    throw new Error(`Error ${response.status}`);
                }
            })
            .then(result => {
                setError('');
                setResult('Token created successfully');
                setNewToken(result.token);
                localStorage.setItem(tokenName, result.token);
            })
            .catch(error => {
                setResult('');
                setNewToken('')
                setError(error.message);
            });
    };

    const handleClose = () => {
        setTokenName('');
        setExpireDate('');
        setResult('');
        setError('');
        setNewToken('');
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
            <h2>Create API Token</h2>
            <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="Enter Token Name"
            />
            <input
                type="datetime-local"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
                placeholder="Enter Expire Date"
            />
            <div className="modal-buttons">
                <button onClick={handleCreateToken}>Create Token</button>
                <button onClick={handleClose}>Close</button>
            </div>
            {result && <p className="result-message">{result}</p>}
            {error && <p className="error-message">{error}</p>}
            {newToken && (
                <div className="new-token">
                    <p>New Token: {newToken}</p>
                    <button onClick={() => navigator.clipboard.writeText(newToken)}>Copy Token</button>
                </div>
            )}
        </Modal>
    );
};

export default CreateApiTokenModal;
