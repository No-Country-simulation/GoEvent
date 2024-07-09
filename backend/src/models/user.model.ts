import mongoose, { Document, Schema } from 'mongoose';

enum SubscriptionType {
  FREE = 'free',
  PREMIUM = 'premium',
}

interface ISubscriptionType {
  id: number;
  type: SubscriptionType;
  max_events: number;
  price: number;
}

const SubscriptionTypeSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  max_events: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});


interface ICreditCard {
  id: number;
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
}

const CreditCardSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  cvc: {
    type: String,
    required: true,
  },
  exp_month: {
    type: String,
    required: true,
  },
  exp_year: {
    type: String,
    required: true,
  },
});

enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IUser extends Document {
  id: string;
  fullname: string;
  email: string;
  password: string;
  profile_image: string;
  phone: string;
  subscription_type: number;
  credit: number;
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Define the schema
const userSchema: Schema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false,
  },
  credit: {
    type: Number,
    required: true,
    default: 0,
  },
  subscription_type: {
    type: String,
    required: true,
    default: 'free',
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
