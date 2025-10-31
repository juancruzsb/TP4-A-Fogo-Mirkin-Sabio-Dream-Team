import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbconfig.js";
export class Usuario extends Model {};

Usuario.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        nombre: {
            type: DataTypes.STRING,
        },
        rol: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "usuario",
        tableName: "usuario",
    }
);