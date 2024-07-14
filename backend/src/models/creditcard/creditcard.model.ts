import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db'
import { CreditCardAttributes } from '../../types/creditcard.types';

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
      validate: {
        isInt: true,
        len: [13, 19],
      }
    },
    cvc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isInt: true,
        len: [3, 4],
      }
    },
    exp_month: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isInt: true,
        len: [2, 2],
      }
    },
    exp_year: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isInt: true,
        len: [4, 4],
      }
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
