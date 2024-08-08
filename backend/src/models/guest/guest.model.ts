import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';
import IGuest from '../../types/guest.types';
import { User } from '../index';

interface GuestCreationAttributes extends Optional<IGuest, 'id'> { }

export class Guest extends Model<IGuest, GuestCreationAttributes> implements IGuest {
  public id!: string;
  public fullname!: string;
  public user_id!: string;
  public email!: string;
  public phone!: string;
}

Guest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Guest',
    tableName: 'guests',
    timestamps: false,
  },
);