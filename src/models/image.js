"use strict";

module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define(
    "images",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(4),
      },
      name: {
        type: DataTypes.STRING(),
      },
      url: {
        type: DataTypes.STRING(),
      },
      description: {
        type: DataTypes.STRING(),
      },
      userId: {
        type: DataTypes.INTEGER(4),
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

  image.associate = (models) => {
    image.belongsTo(models.users, {
      as: "users",
      foreignKey: "userId",
    });
    image.hasMany(models.comments, {
      as: "comments",
      foreignKey: "imageId",
    });
  };

  return image;
};
