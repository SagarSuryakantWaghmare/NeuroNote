# 🧠 NeuroNote

**Your Second Brain for Smarter Note-Taking**

NeuroNote is a full-stack productivity web application that allows users to store, organize, and retrieve important **notes and links** in a clean and responsive interface. Built using the **MERN Stack with TypeScript** and styled with **Tailwind CSS**, it offers a seamless experience across devices and a strong focus on performance, structure, and user-friendliness.

---

## 🚀 Features

- ✍️ Create, edit, and delete notes
- 🔗 Store important links with optional titles/tags
- 🏷️ Tag-based filtering and categorization
- 🔐 JWT-based authentication system
- 🔍 Instant search functionality
- 📱 Fully responsive UI using Tailwind CSS
- 🌙 Dark mode (coming soon)

---

## 🛠️ Tech Stack

### Frontend:
- React.js (with TypeScript)
- Tailwind CSS
- Axios (for API calls)
- React Router

### Backend:
- Node.js + Express.js (with TypeScript)
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for Auth
- bcrypt for password hashing

---

## 📁 Folder Structure (Simplified)

```

NeuroNote/
│
├── client/              # Frontend - React + TS + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.tsx
│
├── server/              # Backend - Node + Express + TS
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.ts
│
├── .env
├── README.md
└── package.json

````

---

## 🌐 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/NeuroNote.git
cd NeuroNote
````

### 2. Set up environment variables

Create a `.env` file in both the `server/` and `client/` folders with appropriate values:

**Backend (`server/.env`)**

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Frontend (`client/.env`)**

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Install dependencies

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd client
npm install
```

### 4. Run the app

**Backend:**

```bash
npm run dev
```

**Frontend:**

```bash
npm run dev
```

Now, open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

---


## 🤝 Contributing

Contributions are welcome! Feel free to open issues, submit pull requests, or suggest improvements.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👤 Author

**Sagar Suryakant Waghmare**

> [Portfolio](#) | [LinkedIn](#) | [GitHub](https://github.com/your-username)

```

Let me know if you'd like help generating a GitHub repository README with badges, deployment instructions, or demo links!
```
