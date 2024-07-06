import React from 'react';
import './UserListTable.css';

const UserListTable = ({ users, onChangeStatus }) => {
    return (
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
                {users.map((user) => (
                    <tr key={user.username}>
                        <td>{user.username}</td>
                        <td>{user.registrationDate}</td>
                        <td>{user.active ? 'Active' : 'Inactive'}</td>
                        <td>
                            <button
                                className={user.active ? 'deactivate-button' : 'activate-button'}
                                onClick={() => onChangeStatus(user.username, !user.active)}
                            >
                                {user.active ? 'Deactivate' : 'Activate'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserListTable;
