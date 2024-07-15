import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';
import { InvitationAttributes, InvitationStatus, InvitationType } from '../../types/invitation.types';
import { Event, Guest } from '../index';

interface InvitationCreationAttributes extends Optional<InvitationAttributes, 'id'> { }

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
      allowNull: false,
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Event,
        key: 'id',
      },
    },
    guest_id: {
      type: DataTypes.UUID,
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
