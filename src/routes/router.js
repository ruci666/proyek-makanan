const router = require('express').Router();
const kategoriMakanan = require('./kategori/kategoriMakanan');
const makanan = require('./makanan/makanan');

router.use('/', kategoriMakanan)
router.use('/', makanan);


module.exports = router;