"use strict";

const bcryptjs = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(4),
      },
      email: {
        type: DataTypes.STRING(),
        unique: true,
      },
      fullName: {
        type: DataTypes.STRING(),
        required: true,
      },
      avatar: {
        type: DataTypes.STRING(),
      },
      password: {
        type: DataTypes.STRING(),
        required: true,
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );

  user.afterValidate((u) => {
    if (u.password) {
      const salt = bcryptjs.genSaltSync(10);
      u.password = bcryptjs.hashSync(u.password, salt);
    }
  });
  user.associate = (models) => {
    user.hasMany(models.images, {
      as: "images",
      foreignKey: "userId",
      sourceKey: "id",
    });
  };

  return user;
};
