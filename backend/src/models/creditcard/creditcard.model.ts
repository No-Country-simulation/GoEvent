import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';
import { CreditCardAttributes } from '../../types/creditcard.types';
import { User } from '../user/user.model';

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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [13, 19],
      },
    },
    cvc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [3, 4],
      },
    },
    exp_month: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [2, 2],
      },
    },
    exp_year: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [4, 4],
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
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

export default CreditCard;
