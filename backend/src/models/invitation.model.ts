import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Event } from './event.model';
import { Guest } from './guest.model';

enum InvitationStatus {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

enum InvitationType {
  FREE = 'free',
  PAY = 'pay',
}

export interface InvitationAttributes {
  id: string;
  event_id: string;
  guest_id: string;
  status: InvitationStatus;
  type: InvitationType;
  qr_code: string;
  cost: number;
  paid: boolean;
  attendance: Date;
}

interface InvitationCreationAttributes extends Optional<InvitationAttributes, 'id'> {}

class Invitation extends Model<InvitationAttributes, InvitationCreationAttributes> implements InvitationAttributes {
  public id!: string;
  public event_id!: string;
  public guest_id!: string;
  public status!: InvitationStatus;
  public type!: InvitationType;
  public qr_code!: string;
  public cost!: number;
  public paid!: boolean;
  public attendance!: Date;
}

Invitation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Event,
        key: 'id',
      },
    },
    guest_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Guest,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM(...Object.values(InvitationStatus)),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(InvitationType)),
      allowNull: false,
    },
    qr_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    attendance: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Invitation',
    tableName: 'invitations',
    timestamps: false,
  },
);

Invitation.belongsTo(Event, { foreignKey: 'event_id' });
Event.hasMany(Invitation, { foreignKey: 'event_id' });

Invitation.belongsTo(Guest, { foreignKey: 'guest_id' });
Guest.hasMany(Invitation, { foreignKey: 'guest_id' });

export { Invitation, Guest, Event };
