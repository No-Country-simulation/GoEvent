import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './user.model';
// import { Event } from './event.model';
import IGuest from "../types/guest.types"

interface GuestCreationAttributes extends Optional<IGuest, 'id'> { }

class Guest extends Model<IGuest, GuestCreationAttributes> implements IGuest {
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
      allowNull: true, // en proceso ( despues dejar en false)
      references: {
        model: User,
        key: 'id',
      },
    },
    event_id: {
      type: DataTypes.STRING,
      allowNull: true, // en proceso ( despues dejar en false)
      // references: {
      //   model: Event,
      //   key: 'id',
      // },
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

// Guest.belongsTo(Event, { foreignKey: 'event_id' });
// Event.hasMany(Guest, { foreignKey: 'event_id' });

export { Guest };
