import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';
import { EventAttributes, EventStatus, EventType } from '../../types/event.types';
import { User } from '../index';

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> { }

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
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
      allowNull: false,
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
      type: DataTypes.TIME,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.UUID,
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
