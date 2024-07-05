"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CreditCardSchema = new mongoose_1.Schema({
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
// Define the schema
const userSchema = new mongoose_1.Schema({
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
            validator: function (value) {
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
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
