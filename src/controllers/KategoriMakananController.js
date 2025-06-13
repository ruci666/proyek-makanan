const autoBind = require("auto-bind");
const KategoriMakananService = require("../services/postgres/KategoriMakananService");
const ClientError = require("../exceptions/ClientError");

const kategoriMakananService = new KategoriMakananService();

class KategoriMakananController {
  constructor() {
    this._service = kategoriMakananService;
    autoBind(this);
  }

  async postKategoriMakananHandler(req, res) {
    const {nama} = req.body;

    try {
      const kategoriMakananId = await this._service.addKategoriMakanan({nama});

      return res.status(201).json({
        status: 'success',
        message: 'Kategori Makanan berhasil ditambahkan',
        data: { kategoriMakananId }
      })
    } catch (error) {
      if (error instanceof ClientError) {
        return res.status(error.statusCode).json({
          status: 'fail',
          message: error.message,
        });
      }

      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
    }
  }

  async getAllKategoriMakananHandler(req, res) {
    try {
      const kategoriMakanan = await this._service.getAllKategoriMakanan();

      return res.status(200).json({
        status: 'success',
        data: { kategoriMakanan },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
    }
  }
}

module.exports = KategoriMakananController