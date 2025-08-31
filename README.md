# Record CRUD Operation

A **React + MUI CRUD application** to manage records with **validation**, **cascading selects**, and **real-time updates**.

---

## 🚀 Features

- Create, Read, Update, Delete records  
- Material UI DataGrid for table management  
- Search & Pagination support  
- Real-time updates after CRUD operations  
- Form validation:
  - Phone → 10 digits, auto format `(123)-456-7890`
  - Email → must include `@` and `.`
  - Mandatory fields: Phone, Email  
- Cascading selects: **State → District → City**  
- Responsive & user-friendly UI  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Material UI, Tailwind CSS, Framer Motion  
- **Backend/API:** Node.js + Express (with Axios for calls)  
- **Database:** MongoDB  

---

## ⚙️ Installation & Setup

1. **Clone the repo**  
```bash
git clone <your-repo-url>
cd record-crud


Install dependencies

npm install


Run the app

npm start


Open in browser → http://localhost:3000

📌 Usage

Fill the form → Save to create/update record.

Edit/Delete records directly from the table.

Use search bar to filter records.

Navigate pages with pagination controls.

✅ Form Validation Rules

Phone: 10 digits, auto format (123)-456-7890

Email: Must contain @ and .

Required: Phone & Email

🌍 Cascading Selects

Selecting a State filters the District dropdown.

Selecting a District filters the City dropdown.

📊 DataGrid Features

Pagination with prev/next

Searchable across columns

Inline edit/update

Instant refresh after CRUD

📡 API Endpoints

GET /records → fetch all records

POST /records → add record

PUT /records/:id → update record

DELETE /records/:id → delete record

🤝 Contributing

Fork this repo

Create a branch → git checkout -b feature-name

Commit changes → git commit -m "Added feature"

Push → git push origin feature-name

Open a Pull Request

📜 License

This project is licensed under the MIT License.
