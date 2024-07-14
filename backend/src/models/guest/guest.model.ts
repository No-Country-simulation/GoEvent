import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db';
import { GuestAttributes } from './guest.interface';
import { Event, User } from '../index';

interface GuestCreationAttributes extends Optional<GuestAttributes, 'id'> {}

export class Guest extends Model<GuestAttributes, GuestCreationAttributes> implements GuestAttributes {
  public id!: number;
  public fullname!: string;
  public description!: string;
  public user_id!: string;
  public event_id!: string;
  public email!: string;
  public phone!: string;
}

Guest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    event_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Event,
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
