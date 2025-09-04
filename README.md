# QR Recognition & AR Model Loader + QR Maker Web Application

A **web-based mobile & PC application** that recognizes QR codes and loads **3D models (glTF/.glb)** in augmented reality using **React, AR.js, and Three.js**.  
Teachers/Users can also **upload 3D models**, generate QR codes for them, and share them with others.  

🔗 **Live Demo:** [QR Recognizer & Loader](https://qr-recognizer-loader.vercel.app/) 

---

## 🎯 Project Objectives
- Develop a **mobile & PC-friendly web app** to recognize QR codes and load 3D models (`.glb`) in AR.  
- Implement **QR recognition, REST API, and AR model rendering**.  
- Support **real-time interaction**: models animate when touched.  
- Allow users to **upload their own 3D models**, generate QR codes, and access models via URLs.  

---

## 📦 Technology Stack

### Frontend
- React, HTML, CSS, JavaScript  
- AR.js, Three.js (3D/AR rendering)  
- RESTful API integration  
- Responsive design for **Android, iOS Safari, Windows, Mac**  

### Backend
- RDBMS: MariaDB / PostgreSQL  
- Python, Django, Django Rest Framework  
- Docker, AWS (deployment support)  

---

## 🗂️ Data Model

| Table   | Field    | Type      | Description                       |
|---------|----------|----------|------------------------------------|
| ARModel | modelId  | Unique ID | Primary key, unique model ID      |
|         | name     | String    | Name of the 3D model              |
|         | qrurl    | String    | QR image storage URL              |
|         | url      | String    | 3D model storage URL              |

---

## ⚙️ Functional Requirements
- Supported **3D Model Format**: glTF (`.glb`)  
- Max file size: **20 MB**  
- QR value format:  


- Generate QR dynamically based on uploaded model.  

---

## 🔑 Features

### QR Recognition View
- Accesses mobile camera for **QR scanning**.  
- Recognizes QR and fetches **3D model info** from backend.  
- Error toast popup if request fails.  
- On success → loads 3D model via provided URL.  
- Supports **Android Web** and **iOS Safari Web**.  
- 3D models trigger animations when touched.  

### QR Maker Using 3D Models
- Upload `.glb` models through the web UI.  
- Backend stores the model, generates a **unique modelId**, and creates a QR.  
- Users get a shareable QR code + URL to view the model.  

---

## 📡 API Specifications

| Feature          | Method | Endpoint            | Request Body          | Response                           |
|------------------|--------|---------------------|----------------------|------------------------------------|
| 3D Model Info    | GET    | `/arinfo/{modelId}` | –                    | 3D model metadata + storage URL    |
| 3D Model Upload  | POST   | `/upload`           | Multipart (3D model) | QR value + QR image URL            |

---

## 🚀 How to Run Locally

### Clone Repository
```bash
git clone https://github.com/your-username/qr-recognition-ar-loader.git
cd qr-recognition-ar-loader
```

### Backend Setup
```bash
cd backend
npm install
# Or if using Python/Django backend
# pip install -r requirements.txt
# python manage.py migrate
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
App runs at:
👉 Frontend: http://localhost:3000
👉 Backend: http://localhost:5000


###📂 Project Structure
```bash
qr-recognition-ar-loader/
│── frontend/         # React + AR.js + Three.js
│── backend/          # Django Rest API + DB models
│── README.md
```
