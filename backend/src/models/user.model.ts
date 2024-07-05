import mongoose, { Document, Schema } from 'mongoose';
import { validate } from 'uuid';

interface ICreditCard {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
}

const CreditCardSchema: Schema = new Schema({
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


export interface IUser extends Document {
  id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  profile_image: 0 | 1;
  phone: string;
  google_registred: 0 | 1;
  credit_card: ICreditCard[];
  credit: number;
  subscription_type: string;
  role: string;
  is_active: 0 | 1;
  created_at: Date;
  updated_at: Date;
}

// Define the schema
const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
    type: Number,
    required: false,
    default: 0,
  },
  phone: {
    type: String,
    required: false,
  },
  google_registred: {
    type: Number,
    required: true,
    default: 0,
  },
  credit_card: {
    type: [CreditCardSchema],
    required: true,
    default: [],
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
    type: Number,
    required: true,
    default: 1,
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
