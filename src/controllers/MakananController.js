const autoBind = require("auto-bind");
const ClientError = require("../exceptions/ClientError");
const MakananService = require("../services/postgres/MakananService");

const makananService = new MakananService();

class MakananController {
    constructor(service) {
        this._service = makananService;
        autoBind(this);
    }

    async postMakananHandler(req, res) {
        const { makanan, kategori_id } = req.body;

        try {
            const makananId = await this._service.addMakanan({ makanan, kategori_id });

            return res.status(201).json({
                status: 'success',
                message: 'Makanan berhasil ditambahkan',
                data: { makananId },
            });
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

    async getAllMakananHandler(req, res) {
        try {
            const makanan = await this._service.getAllMakanan();

            return res.status(200).json({
                status: 'success',
                data: { makanan },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami',
            });
        }
    }

    async getAllMakananAndKategoriHandler(req, res) {
        try {
            const makanan = await this._service.getAllDataMakananDanKategori();

            return res.status(200).json({
                status: 'success',
                data: { makanan },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami',
            });
        }
    }



    async getMakananByKategoriHandler(req, res) {
        try {
            const kategoriSlug = req.params.kategori; 
            
            const kategoriNama = kategoriSlug.replace(/-/g, ' ');

            const data = await this._service.getMakananByKategoriNama(kategoriNama);

            return res.status(200).json({
                status: 'success',
                data,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 'error',
                message: 'Terjadi kesalahan pada server',
            });
        }
    }

    async getMakananByIdHandler(req, res) {
        const { id } = req.params;

        try {
            const makanan = await this._service.getMakananById(id);

            return res.status(200).json({
                status: 'success',
                data: { makanan },
            });
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

    async getAllMakananKategoriHandler(req, res) {
        try {
            const makanan = await this._service.getAllDataMakananKategori();

            return res.status(200).json({
                status: 'success',
                data: { makanan },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami',
            });
        }
    }

    async putMakananByIdHandler(req, res) {
        const { id } = req.params;
        const { makanan, kategori_id } = req.body;

        try {
            await this._service.editMakananById(id, { makanan, kategori_id });

            return res.status(200).json({
                status: 'success',
                message: 'Makanan berhasil diperbarui',
            });
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

    async deleteMakananByIdHandler(req, res) {
        const { id } = req.params;

        try {
            await this._service.deleteMakananById(id);

            return res.status(200).json({
                status: 'success',
                message: 'Makanan berhasil dihapus',
            });
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


    async deleteMakananByKategoriNamaHandler(req, res) {
        const { namaKategori } = req.params;

        try {
            await this._service.deleteMakananByKategoriNama(namaKategori);
            return res.status(200).json({
                status: 'success',
                message: `Semua makanan dari kategori "${namaKategori}" berhasil dihapus`,
            });
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
                message: 'Gagal menghapus makanan berdasarkan kategori',
            });
        }
    }


}

module.exports = MakananController