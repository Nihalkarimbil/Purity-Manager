
# Purity Management App

A full-stack **Purity Management Application** built using the **MERN** (MongoDB, Express, React, Node.js) stack. This app allows to manage metals urity and Rate efficiently with a modern UI and API-driven backend.

---

##  Live Demo

👉 [View Deployed App](https://product-management-app-blush.vercel.app)

---

##  How to Run Locally

Follow the steps below to set up and run the application locally on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Nihalkarimbil/Product-Management-app.git
cd client
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

> 🔒 **Note**: Replace `the configuration string` with your actual configuaration URI.

Start the backend server:

```bash
npm run dev
```

The backend will run by default at: [http://localhost:3000](http://localhost:3000)

---

### 3. Setup Frontend

Open a new terminal window/tab and run:

```bash
npm install
```

Create a `.env` file in the `client` directory and add the following:

```
VITE_BACKEND_API=your_Backend_Api
```

Start the React application:

```bash
npm run dev
```

The frontend will run by default at: [http://localhost:5173](http://localhost:5173)

