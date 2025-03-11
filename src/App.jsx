import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

function HomePage() {
    return (
        <div className="container">
            <h1>Welcome to the Final Clue Challenge</h1>
            <Link to="/final-clue">
                <button className="primary-btn">Start</button>
            </Link>
        </div>
    );
}

function FinalCluePage() {
    const [image, setImage] = useState(localStorage.getItem('uploadedImage'));

    useEffect(() => {
        const checkImage = () => setImage(localStorage.getItem('uploadedImage'));
        window.addEventListener('storage', checkImage);
        return () => window.removeEventListener('storage', checkImage);
    }, []);

    return (
        <div className="container">
            {image ? (
                <div>
                    <h2 className="winner">🏆 Winner! 🏆</h2>
                    <img src={image} alt="Uploaded Selfie" className="winner-image" />
                </div>
            ) : (
                <div>
                    <h1>🎯 Congratulations! You have found the final clue. 🎯</h1>
                    <p className="highlight">Final task is to find <b>Saifaz (Main Techyuva Coordinator)</b> and take a selfie.</p>
                    <h2 className="warning">⚠️ WARNING: You need at least 8 clue answers to win. ⚠️</h2>
                    <Link to="/winner"><button className="primary-btn">Next</button></Link>
                </div>
            )}
        </div>
    );
}

function WinnerPage() {
    const [image, setImage] = useState(localStorage.getItem('uploadedImage'));

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                setImage(imageUrl);
                localStorage.setItem('uploadedImage', imageUrl);
                window.dispatchEvent(new Event('storage')); // Trigger refresh in other components
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container">
            {!image && (
                <div className="upload-section">
                    <label htmlFor="upload" className="primary-btn">Add Picture</label>
                    <input
                        id="upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                </div>
            )}
        </div>
    );
}

function RemoveImagePage() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handlePasswordSubmit = () => {
        if (password === 'GOJO') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password!');
        }
    };

    const handleRemoveImage = () => {
        localStorage.removeItem('uploadedImage');
        window.dispatchEvent(new Event('storage')); // Trigger refresh in other components
        navigate('/final-clue');
    };

    return (
        <div className="container">
            <h1>Admin Panel</h1>
            {!isAuthenticated ? (
                <div>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password-input"
                    />
                    <button onClick={handlePasswordSubmit} className="primary-btn">Submit</button>
                </div>
            ) : (
                <button onClick={handleRemoveImage} className="danger-btn">Remove Image</button>
            )}
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/final-clue" element={<FinalCluePage />} />
                <Route path="/winner" element={<WinnerPage />} />
                <Route path="/remove" element={<RemoveImagePage />} />
            </Routes>
        </Router>
    );
}