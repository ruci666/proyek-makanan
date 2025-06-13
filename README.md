# Backend - Menu Makanan API

A simple RESTful API built using **Node.js**, **Express**, and **PostgreSQL**, which manages a list of foods (`makanan`) and their categories (`kategori_makanan`).

---

## 🚀 Tech Stack

| Tool         | Description                          |
|--------------|--------------------------------------|
| Node.js      | JavaScript runtime                   |
| Express.js   | Web framework for Node.js            |
| PostgreSQL   | Relational database                  |
| node-postgres (`pg`) | PostgreSQL client for Node.js |
| node-pg-migrate | Migration tool for PostgreSQL     |
| Joi          | Schema validation                    |
| dotenv       | Environment variable loader          |
| Nodemon      | Auto-restart server in dev mode      |
| ESLint       | Code linter                          |

---

## 🛠️ Installation & Setup

1. **Clone this repo**

git clone https://github.com/ruci666/proyek-makanan
cd internship-backend


2.	Install dependencies
npm install

3.	Configure environment
PGUSER=your_pg_user
PGHOST=localhost
PGDATABASE=MenuMakanan
PGPASSWORD=your_password
PGPORT=5432

4. Run migrations
npm run migrate up

5. Run server
npm run dev

Server runs at: http://localhost:3000

Available API Endpoints

✅ Kategori Makanan
Method         Endpoint           Description
POST        /kategori           Tambah kategori
GET         /kategori Ambil     semua kategori


✅ Makanan
Method         Endpoint                        Description
POST          /makanan                    Tambah makanan baru
GET           /makanan                    Ambil semua makanan
GET          /makanan/:id               Ambil makanan berdasarkan ID
PUT          /makanan/:id               Ubah makanan berdasarkan ID
DELETE      /makanan/:id                Hapus makanan berdasarkan ID
GET     /makanan-kategori/:kategori  Ambil makanan berdasarkan nama kategori
DELETE  /makanan-kategori/:kategori   Hapus semua makanan dalam kategori

POST /makanan
{
  "makanan": "Sate Ayam",
  "kategori_id": 1
}

PUT /makanan/2
{
  "makanan": "Puding",
  "kategori_id": 3
}