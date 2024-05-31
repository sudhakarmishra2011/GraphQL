import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const userModel = sequelize.define('Users', {
    name: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    }
})

export default userModel;


/*

Since we are using type = module to load ES6 modules.

We have to mention .js as file extension while importing.

Ex - ./db.js
*/