"use strict";

module.exports = (sequelize, DataTypes) => {
  const userImage = sequelize.define(
    "userImages",
    {
      userId: {
        type: DataTypes.INTEGER(4),
        unique: "userId_imageId",
      },
      imageId: {
        type: DataTypes.INTEGER(4),
        unique: "userId_imageId",
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
  userImage.associate = (models) => {
    userImage.belongsTo(models.images, {
      as: "images",
      foreignKey: "imageId",
    });
  };
  return userImage;
};
