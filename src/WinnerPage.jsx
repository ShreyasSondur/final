import React, { useState, useRef } from 'react';
const Button = ({ children, ...props }) => (
    <button {...props} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
      {children}
    </button>
  );
;

export default function WinnerPage() {
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('Error accessing camera:', err));
  };

  const takePicture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setImage(canvas.toDataURL('image/png'));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <h1 className="text-3xl font-bold mb-4">🎉 Congratulations! You found the final clue! 🎉</h1>
      <div className="mb-4">
        <video ref={videoRef} autoPlay className="w-64 h-48 bg-black"></video>
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
      <div className="flex gap-4">
        <Button onClick={startCamera}>Start Camera</Button>
        <Button onClick={takePicture}>Take Picture</Button>
      </div>
      {image && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold mb-2">🏆 Winner</h2>
          <img src={image} alt="Winner" className="w-64 h-48 rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}
