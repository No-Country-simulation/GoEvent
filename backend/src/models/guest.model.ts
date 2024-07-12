import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './user.model';
import { Event } from './event.model';

export interface GuestAttributes {
  id: number;
  fullname: string;
  description: string;
  user_id: string;
  event_id: string;
  email: string;
  phone: string;
}

interface GuestCreationAttributes extends Optional<GuestAttributes, 'id'> {}

class Guest extends Model<GuestAttributes, GuestCreationAttributes> implements GuestAttributes {
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

Guest.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Guest, { foreignKey: 'user_id' });

Guest.belongsTo(Event, { foreignKey: 'event_id' });
Event.hasMany(Guest, { foreignKey: 'event_id' });

export { Guest };
