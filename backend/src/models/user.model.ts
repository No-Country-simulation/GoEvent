import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db'
import { SubscriptionType } from './subscriptiontype.model'
import { CreditCard } from './creditcard.model'

enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}


export interface UserAttributes {
  id: string;
  fullname: string;
  email: string;
  password: string;
  profile_image: string;
  phone: string;
  subscription_type_id: number;
  credit: number;
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public profile_image!: string;
  public phone!: string;
  public subscription_type_id!: number;
  public credit!: number;
  public role!: UserRole;
  public is_active!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    credit: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    subscription_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: SubscriptionType,
        key: 'id',
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);

// Define associations
User.belongsTo(SubscriptionType, { foreignKey: 'subscription_type_id' });
SubscriptionType.hasMany(User, { foreignKey: 'subscription_type_id' });

CreditCard.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(CreditCard, { foreignKey: 'user_id' });

export { SubscriptionType, CreditCard, User };
