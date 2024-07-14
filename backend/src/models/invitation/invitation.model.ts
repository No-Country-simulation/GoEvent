import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db';
import { InvitationAttributes } from './invitation.interface';
import { InvitationStatus } from './invitation.status';
import { InvitationType } from './invitation.type';
import { Event, Guest } from '../index';

interface InvitationCreationAttributes extends Optional<InvitationAttributes, 'id'> {}

export class Invitation extends Model<InvitationAttributes, InvitationCreationAttributes> implements InvitationAttributes {
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
