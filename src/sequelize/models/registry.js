module.exports = (sequelize, DataType) => {
  const registryTable = sequelize.define('registry', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataType.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataType.STRING(200),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataType.TEXT,
      allowNull: true,
    },
    url: {
      type: DataType.STRING(200),
      allowNull: false,
    },
    port: {
      type: DataType.SMALLINT.UNSIGNED,
      allowNull: true,
    },
    status: {
      type: DataType.ENUM('on', 'off'),
      allowNull: false,
    }
  }, {
    freezeTableName: true,
  });

  return registryTable;
};