const express = require('express');
const kategoriMakanan = express.Router();

const KategoriMakananController = require('../../controllers/KategoriMakananController');

const kategoriMakananController = new KategoriMakananController();

kategoriMakanan.post('/kategori', kategoriMakananController.postKategoriMakananHandler);
kategoriMakanan.get('/kategori', kategoriMakananController.getAllKategoriMakananHandler);

module.exports = kategoriMakanan;