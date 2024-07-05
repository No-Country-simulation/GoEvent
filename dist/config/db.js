"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./environment");
class MongoDB {
    constructor() { }
    static getInstance() {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
            MongoDB.instance.connect();
        }
        return MongoDB.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(environment_1.DB_URL);
                console.log('Connected to MongoDB with Mongoose');
            }
            catch (err) {
                console.error('Unable to connect to the database:', err);
            }
        });
    }
    isConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.connection.readyState) {
                yield mongoose_1.default.connect(environment_1.DB_URL);
                console.log('Reconnected to MongoDB with Mongoose');
            }
            return mongoose_1.default.connection.readyState === 1;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.disconnect();
                MongoDB.instance = null;
                console.log('Connection to MongoDB closed');
            }
            catch (err) {
                console.error('Error closing the connection:', err);
            }
        });
    }
}
MongoDB.instance = null;
exports.default = MongoDB;
