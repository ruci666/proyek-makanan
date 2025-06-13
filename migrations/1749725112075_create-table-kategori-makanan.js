exports.up = (pgm) => {
  pgm.createTable('kategori_makanan', {
    id: { type: 'serial', primaryKey: true },
    nama: { type: 'varchar(100)', notNull: true }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('kategori_makanan');
};