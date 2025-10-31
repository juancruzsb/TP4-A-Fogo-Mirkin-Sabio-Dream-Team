import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbconfig.js";
export class Escucha extends Model {};

Escucha.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuarioID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cancionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha_escucha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "escucha",
        tableName: "escucha",
        timestamps: false,
    }
);