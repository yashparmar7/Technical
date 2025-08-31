# Record CRUD Operation

A **React + MUI CRUD application** to manage records with **validation**, **cascading selects**, and **real-time updates**.

---

## 🚀 Features

- Create, Read, Update, Delete records  
- Material UI DataGrid for table management  
- Pagination support  
- Real-time updates after CRUD operations  
- Form validation:
  - Phone → 10 digits, auto format `(123)-456-7890`
  - Email → must include `@` and `.`
  - Mandatory fields: Phone, Email  
- Cascading selects: **State → District **
- Responsive & user-friendly UI  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Material UI, Tailwind CSS
- **Backend/API:** Node.js + Express (with Axios for calls)  
- **Database:** MongoDB  

---
   
## 📌 Usage
- Fill the form → Save to create/update record.
- Edit records directly from the table.
- Navigate pages with pagination controls.

## 📡 API Endpoints
- GET /record/listsrecord → fetch all records
- POST /record/addrecord → add record
- PUT /record/updaterecord/:id → update record

## ⚙️ Installation & Setup

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   
2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   node server.js
   
3. **Frontend Setup**
   ```bash
   cd frontend
   npm run dev

4. Open in browser → http://localhost:5173 (Vite default)
   
5. Backend runs on → http://localhost:5000
   
