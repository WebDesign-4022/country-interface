import React from 'react';
import './UserListTable.css';

const UserListTable = ({ users, onChangeStatus }) => {
    return (
        <table className="user-list-table">
            <thead>
            <tr>
                <th>Username</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{user.active ? 'Active' : 'Inactive'}</td>
                    <td>
                        <button onClick={() => onChangeStatus(user.username, !user.active)}>
                            {user.active ? 'Deactivate' : 'Activate'}
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UserListTable;
