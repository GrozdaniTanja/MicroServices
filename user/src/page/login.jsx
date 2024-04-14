import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedId = localStorage.getItem("id");
        const savedPassword = localStorage.getItem("password");

        if (savedId) setId(savedId);
        if (savedPassword) setPassword(savedPassword);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // we are using the web gateway to make the request to the user service
        try {
            const response = await fetch(
                `http://localhost:3000/user/${id}`,
                {
                    method: "GET",
                }
            );

            if (response.ok) {
                const user = await response.json();

                if (user.password === password) {
                    alert("Login successful. User data:", user);
                    localStorage.setItem("user", JSON.stringify(user));
                    console.log("Login successful. User data:", user);
                    navigate("/");
                } else {
                    alert("Login failed. Invalid email or password.");
                }
            } else {
                alert("Login failed. User not found.");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;