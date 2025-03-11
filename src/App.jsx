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
    return (
        <div className="container">
            <h1>🎯 Congratulations! You have found the final clue. 🎯</h1>
            <p>Final task is to find X man and take a selfie.</p>
            <h2 className="warning">⚠️ WARNING: You need at least 8 clue answers to win. ⚠️</h2>
            <Link to="/winner">
                <button className="primary-btn">Next</button>
            </Link>
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

            {image && (
                <div>
                    <h2 className="winner">🏆 Winner! 🏆</h2>
                    <img src={image} alt="Uploaded Selfie" className="winner-image" />
                </div>
            )}
        </div>
    );
}

function RemoveImagePage() {
    const navigate = useNavigate();

    const handleRemoveImage = () => {
        localStorage.removeItem('uploadedImage');
        navigate('/winner');
    };

    return (
        <div className="container">
            <h1>Admin Panel</h1>
            <button onClick={handleRemoveImage} className="danger-btn">Remove Image</button>
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
