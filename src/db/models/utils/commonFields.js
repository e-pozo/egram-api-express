const { DataTypes, Sequelize } = require('sequelize');
function CommonFields() {
  const chainObj = (initialObj) => {
    let obj = initialObj;
    const add = (obj2) => {
      obj = { ...obj, ...obj2 };
      return obj;
    };
    obj = { ...obj, add };
    return obj;
  };
  this.id = chainObj({
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  });
  this.createdAt = chainObj({
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  });
  this.updatedAt = chainObj({
    allowNull: true,
    field: 'updated_at',
    type: DataTypes.DATE,
  });
  this.foreign = (name, originTable, idLookUp) => {
    return chainObj({
      field: name,
      type: DataTypes.INTEGER,
      references: {
        model: originTable,
        key: idLookUp,
      },
    });
  };
}

module.exports = { commonFields: new CommonFields() };
