import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './ApiTokenListModal.css';

const ApiTokenListModal = ({ isOpen, onRequestClose }) => {
    const [tokens, setTokens] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchTokens();
        }
    }, [isOpen]);

    const fetchTokens = () => {
        const loginToken = localStorage.getItem('loginToken');

        if (!loginToken) {
            setError("You must login first");
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", loginToken);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/user/api-tokens", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    throw new Error("Invalid login token");
                } else {
                    throw new Error(`Error ${response.status}`);
                }
            })
            .then(result => {
                setError('');
                setTokens(result.tokens);
            })
            .catch(error => {
                setTokens([]);
                setError(error.message);
            });
    };

    const revokeToken = (tokenName) => {
        const apiToken = localStorage.getItem(tokenName);

        if (!apiToken) {
            setError("Token not found in local storage");
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", apiToken);

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/user/api-tokens", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    localStorage.removeItem(tokenName);
                    fetchTokens();
                } else if (response.status === 401) {
                    throw new Error("Invalid token");
                } else {
                    throw new Error(`Error ${response.status}`);
                }
            })
            .catch(error => {
                setError(error.message);
            });
    };

    const handleClose = () => {
        setTokens([]);
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
            <h2>API Tokens</h2>
            <div className="modal-buttons">
                <button onClick={fetchTokens}>Refresh</button>
                <button onClick={handleClose}>Close</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {tokens.length > 0 ? (
                <table className="token-list-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Expire Date</th>
                        <th>Token</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tokens.map((token, index) => (
                        <tr key={index}>
                            <td>{token.name}</td>
                            <td>{token.expire_date}</td>
                            <td>{token.token}</td>
                            <td>
                                <button onClick={() => revokeToken(token.name)}>Revoke</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No tokens found</p>
            )}
        </Modal>
    );
};

export default ApiTokenListModal;
