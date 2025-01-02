import React, { useState } from 'react';
import './UploaderStyle.css';

function ModelUploader({ onModelSelect }) {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('model', file);
    formData.append('name', file.name);

    setLoading(true);
    try {
      const res = await fetch('https://qr-recogniser.onrender.com/upload/', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResponse(data);
      onModelSelect(data.model_url); // Pass the model URL to the parent component
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="model-uploader">
      <h2 className="uploader-title">Upload a 3D Model</h2>
      <form className="upload-form" onSubmit={handleUpload}>
        <input
          className="file-input"
          type="file"
          accept=".glb"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="upload-button" type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {response && (
        <div className="response">
          <div className="buttons-container">
            <button
              className="secondary-button"
              onClick={() => window.open(response.qr_image, '_blank')}
            >
              Show QR
            </button>
            <button
              className="secondary-button"
              onClick={() => window.open(response.qr_value, '_blank')}
            >
              Model Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelUploader;
