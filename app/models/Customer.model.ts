import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize/sequelize";

interface CustomerAttributes {
  id: number;
  name: string;
  email: string;
}

interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "id"> {}

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(),
      allowNull: false,
      // unique: true,
    },
  },
  {
    tableName: "customers",
    sequelize,
  }
);

export default Customer;
