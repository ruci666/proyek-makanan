exports.up = (pgm) => {
  pgm.createTable('makanan', {
    id: { type: 'serial', primaryKey: true },
    makanan: { type: 'varchar(100)', notNull: true },
    kategori_id: {
      type: 'integer',
      notNull: true,
      references: 'kategori_makanan(id)',
      onDelete: 'CASCADE'
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('makanan');
};