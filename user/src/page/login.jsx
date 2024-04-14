import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:3000/user/${id}`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                },

            );

            if (response.ok) {
                const userData = await response.json();
                console.log("User data:", userData);

                if (userData.password === password) {
                    alert("Login successful. Welcome!");
                    setIsLoggedIn(true);
                    localStorage.setItem("userId", userData.id);
                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                    setEmail(userData.email);
                    navigate("/");
                } else {
                    alert("Login failed. Invalid password.");
                }
            } else {
                alert("Login failed. User not found or server error.");
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert("Login failed. Please try again later.");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("User deleted successfully.");
                handleLogout();
            } else {
                alert("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert("Failed to delete user. Please try again later.");
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, firstName, lastName, email, role })
            });

            if (response.ok) {
                alert("User updated successfully.");
            } else {
                alert("Failed to update user.");
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert("Failed to update user. Please try again later.");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Id:
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </label>
                <br />
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <br />
                <button type="submit">Login</button>
            </form>
            {isLoggedIn && (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
        </div>
    );
}

export default Login;