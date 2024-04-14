import React from "react";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>Follow us on social media:</p>
                        <ul>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <p>Contact us:</p>
                        <ul>
                            <li>Email: info@example.com</li>
                            <li>Phone: +1234567890</li>
                            <li>Address: 123 Main St, City</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
