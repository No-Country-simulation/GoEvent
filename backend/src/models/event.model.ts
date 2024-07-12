import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { SubscriptionType } from './subscriptiontype.model';
import { User } from './user.model';
import { Guest } from './guest.model';

enum EventStatus {
  SCHEDULED = 'scheduled',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
enum EventType {
  FREE = 'free',
  PAID = 'paid',
}
export interface EventAttributes {
  id: string;
  name: string;
  description: string;
  location: string;
  time: Date;
  date: Date;
  user_id: string;
  status: EventStatus;
  type: EventType;
  created_at: Date;
  updated_at: Date;
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public location!: string;
  public time!: Date;
  public date!: Date;
  public user_id!: string;
  public status!: EventStatus;
  public type!: EventType;
  public created_at!: Date;
  public updated_at!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
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
    status: {
      type: DataTypes.ENUM(...Object.values(EventStatus)),
      allowNull: false,
      defaultValue: EventStatus.SCHEDULED,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(EventType)),
      allowNull: false,
      defaultValue: EventType.FREE,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false,
  },
);

// Define associations
Event.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Event, { foreignKey: 'user_id' });

Guest.belongsTo(Event, { foreignKey: 'event_id' });
Event.hasMany(Guest, { foreignKey: 'event_id' });

export { Event, Guest  };
