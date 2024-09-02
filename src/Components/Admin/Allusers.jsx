import React, { useEffect, useState } from 'react';
import './Allusers.css';

function AllUsers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('https://fooddeliverybackend-tglk.onrender.com/allusers');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result.users); // Assuming the response has a 'users' field
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="all-users-container">
            <h2>All Users</h2>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Admin Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name || 'N/A'}</td>
                            <td>{user.email || 'N/A'}</td>
                            <td>{user.phone || 'N/A'}</td>
                            <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllUsers;
