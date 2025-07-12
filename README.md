# 🏥 QuickClinic – MERN Stack Healthcare App

**QuickClinic** is a full-stack healthcare web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to book appointments, view clinic information, and interact with healthcare services in real time.

---

## 🌐 Live URLs

| Project Part | URL |
|--------------|-----|
| 🚀 Frontend (React) | [https://quickclinic-six.vercel.app](https://quickclinic-six.vercel.app) |
| 🔙 Backend (Express API) | [https://quickclinic-backend.onrender.com](https://quickclinic-backend.onrender.com) |

---

## 📦 Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Deployment:** Vercel (frontend), Render (backend)
- **Monitoring:** UptimeRobot, Render Logs

---

## 📁 Folder Structure

```
QuickClinic/
│
├── client/        → React frontend
├── server/        → Express backend
├── README.md
├── .env.example
└── .gitignore
```

---

## ⚙️ Environment Variables

### 🔐 Backend `.env.example`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=production
```

### 🌐 Frontend `.env.example`
```env
REACT_APP_API_URL=https://quickclinic-backend.onrender.com
```

---

## 🚀 How to Run Locally

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/quickclinic.git
cd quickclinic
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

4. **Add Environment Variables**
- Create `.env` files in `client/` and `server/` using `.env.example` as reference.

5. **Start the Development Servers**
```bash
# In server/
npm run dev

# In client/ (new terminal)
npm start
```

---

## 🔄 Deployment Details

- **Frontend:** Deployed on [Vercel](https://vercel.com/)
- **Backend:** Deployed on [Render](https://render.com/)
- **MongoDB:** Hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---



## 📖 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

Thanks to the development and DevOps mentors who guided the QuickClinic build process.

