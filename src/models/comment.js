"use strict";

module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comments",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(4),
      },
      userId: {
        type: DataTypes.INTEGER(4),
      },
      imageId: {
        type: DataTypes.INTEGER(4),
      },
      content: {
        type: DataTypes.STRING(),
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
  comment.associate = (models) => {
    comment.belongsTo(models.users, {
      as: "users",
      foreignKey: "userId",
    });
  };

  return comment;
};
