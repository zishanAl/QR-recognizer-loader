import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import ModelViewer from '../modelViewer/Viewer';
import './ScannerStyle.css';

function QRScanner() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async (result, error) => {
    if (result) {
      const qrCodeUrl = result.text; // Extract the text field from the scanned result

      try {
        // Fetch the associated model URL from the backend using the scanned URL
        const response = await fetch(qrCodeUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch model URL');
        }
        const data = await response.json();

        // Assuming the backend returns the model URL as `model_url`
        if (data.url) {
          console.log(data.url);
          setModelUrl(data.url); // Update state with the model URL
          setError(null); // Clear any previous errors
          setIsCameraActive(false); // Stop the camera after fetching the model URL
        } else {
          throw new Error('Invalid data format from backend');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch the model associated with the QR code.');
      }
    }

    if (error) {
      console.error(error);
    }
  };

  const toggleCamera = () => {
    setIsCameraActive((prevState) => !prevState);
  };

  return (
    <div className="qr-scanner">
      <h2>Scan a QR Code</h2>
      <button onClick={toggleCamera}>
        {isCameraActive ? 'Stop Camera' : 'Start Camera'}
      </button>

      {isCameraActive && (
        <div className="camera-preview">
          <QrReader
            onResult={handleScan}
            constraints={{ facingMode: 'environment' }} // Use 'user' for the front camera
            style={{ width: '100%' }}
          />
        </div>
      )}

      {/* Display errors if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Show ModelViewer if a valid model URL is available */}
      {modelUrl ? (
        <div>
          <h3>Scanned Model</h3>
          <ModelViewer modelUrl={modelUrl} />
        </div>
      ) : (
        <p>Please scan a QR code to load a model.</p>
      )}
    </div>
  );
}

export default QRScanner;
