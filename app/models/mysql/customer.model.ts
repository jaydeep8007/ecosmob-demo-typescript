// import { DataTypes, Model, Optional } from "sequelize";
// import sequelize from "../config/sequelize";

// interface CustomerAttributes {
//   id: number;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   password: string;
//   confirmPassword?: string; // Virtual field, optional in DB
//   firstName: string;
//   lastName: string;
// }

// interface CustomerCreationAttributes extends Optional<CustomerAttributes, "id"> {}

// class Customer
//   extends Model<CustomerAttributes, CustomerCreationAttributes>
//   implements CustomerAttributes
// {
//   public id!: number;
//   public name!: string;
//   public email!: string;
//   public phoneNumber!: string;
//   public password!: string;
//   public confirmPassword?: string;
//   public firstName!: string;
//   public lastName!: string;
// }

// Customer.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: new DataTypes.STRING(),
//       allowNull: false,
//     },
//     email: {
//       type: new DataTypes.STRING(),
//       allowNull: false,
//       unique: true,
//     },
//     phoneNumber: {
//       type: new DataTypes.STRING(),
//       allowNull: false,
//     },
//     password: {
//       type: new DataTypes.STRING(),
//       allowNull: false,
//     },
//     confirmPassword: {
//       type: DataTypes.VIRTUAL,
//       allowNull: true,
//     },
//     firstName: {
//       type: new DataTypes.STRING(),
//       allowNull: false,
//     },
//     lastName: {
//       type: new DataTypes.STRING(),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "customers",
//     sequelize,
//   }
// );

// export default Customer;

import Sequelize from "sequelize";
import { sequelize } from "../../config/sequelize";

const customerModel = sequelize.define("customer", {
  cus_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  cus_firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //     notEmpty: true,
    //     len: 50
    // },
  },
  cus_lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //     notEmpty: true,
    //     len: 50
    // },
  },
  cus_email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    // validate: {
    //     notNull: {
    //         msg: 'Email is required'
    //     },
    //     notEmpty: {
    //         msg: 'Email cannot be empty'
    //     },
    //     isEmail: {
    //         msg: 'Invalid email address'
    //     },
    //     len: 50
    // }
  },
  cus_phone_number: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //     is: /^[0-9]{10}$/i, // Validate that it's a 10-digit number
    // },
  },
  cus_password: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //     notEmpty: true,
    //     len: [6, 20], // Password length between 6 and 20 characters
    // },
  },
  cus_confirm_password: {
    type: Sequelize.VIRTUAL,
    allowNull: false,
    // validate: {
    //     notEmpty: true,
    //     len: [6, 20], // Password length between 6 and 20 characters
    // },
  },
});

export default customerModel;
