import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-card">
                <h1 className="home-title">Welcome to My App</h1>
                <p className="home-description">
                    Join us and explore amazing features. Register or login to get started.
                </p>
                <div className="home-buttons">
                  <button>  <Link to="/register" className="home-button">
                        Register
                    </Link></button>
                  <button>  <Link to="/login" className="home-button">
                        Login
                    </Link></button>
                </div>
            </div>
        </div>
    );
};

export default Home;