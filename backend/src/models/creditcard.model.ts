import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db'

export interface CreditCardAttributes {
  id: number;
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  user_id: string;
}

interface CreditCardCreationAttributes extends Optional<CreditCardAttributes, 'id'> { }

export class CreditCard extends Model<CreditCardAttributes, CreditCardCreationAttributes>
  implements CreditCardAttributes {
  public id!: number;
  public number!: string;
  public cvc!: string;
  public exp_month!: string;
  public exp_year!: string;
  public user_id!: string;
}

CreditCard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exp_month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exp_year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'CreditCard',
    tableName: 'credit_cards',
    timestamps: false,
  }
);