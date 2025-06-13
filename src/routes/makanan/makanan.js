const express = require('express');
const makanan = express.Router();

const MakananController = require('../../controllers/MakananController');

const makananController = new MakananController();

makanan.post('/makanan', makananController.postMakananHandler);
makanan.get('/makanan', makananController.getAllMakananHandler);
makanan.get('/makanan/:id', makananController.getMakananByIdHandler);
makanan.put('/makanan/:id', makananController.putMakananByIdHandler);
makanan.delete('/makanan/:id', makananController.deleteMakananByIdHandler);

// makanan.get('/makanankategori', makananController.getAllMakananAndKategoriHandler)
makanan.get('/makanankategori', makananController.getAllMakananKategoriHandler)
makanan.get('/:kategori', makananController.getMakananByKategoriHandler);

makanan.delete('/makanan-kategori/:namaKategori', makananController.deleteMakananByKategoriNamaHandler);

module.exports = makanan;