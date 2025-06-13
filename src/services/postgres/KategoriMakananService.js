const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class KategoriMakananService {
    constructor() {
        this._pool = new Pool();
    }

    async addKategoriMakanan({ nama }) {
        await this.verifyNewNama(nama);

        const query = {
            text: 'INSERT INTO kategori_makanan (nama) VALUES($1) RETURNING id',
            values: [nama],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Nama gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    async verifyNewNama(nama) {
        const query = {
            text: 'SELECT nama FROM kategori_makanan WHERE nama = $1',
            values: [nama],
        };

        const result = await this._pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantError('Gagal menambahkan kategori_makanan. Nama sudah digunakan');
        }
    }

    async getAllKategoriMakanan() {
        const result = await this._pool.query('SELECT id, nama FROM kategori_makanan');
        return result.rows;
    }

    async getNamaById(kategoriMakananId) {
        const query = {
            text: 'SELECT id, nama FROM kategori_makanan WHERE id = $1',
            values: [kategoriMakananId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('KategoriMakanan tidak ditemukan');
        }

        return result.rows[0];
    }
}

module.exports = KategoriMakananService;