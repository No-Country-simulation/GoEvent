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
const db_1 = __importDefault(require("../config/db"));
class BaseModel {
    constructor(collectionName) {
        this.db = null;
        this.collection = null;
        this.init(collectionName);
    }
    init(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbInstance = yield db_1.default.getInstance();
                this.db = dbInstance.getDb();
                if (this.db) {
                    this.collection = this.db.collection(collectionName);
                }
            }
            catch (error) {
                console.error('Error initializing database connection:', error);
                throw error;
            }
        });
    }
    ensureConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!this.collection) {
                yield this.initCollection();
            }
            else {
                try {
                    yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.command({ ping: 1 }));
                }
                catch (err) {
                    console.error('Connection lost, attempting to reconnect...', err);
                    yield this.initCollection();
                }
            }
        });
    }
    initCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbInstance = yield db_1.default.getInstance();
                this.db = dbInstance.getDb();
                if (this.db) {
                    this.collection = this.db.collection('auth');
                    console.log('Reconnected to MongoDB and collection initialized.');
                }
            }
            catch (error) {
                console.error('Error reconnecting to the database:', error);
                throw error;
            }
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbInstance = yield db_1.default.getInstance();
            yield dbInstance.close();
            console.log('Connection closed.');
        });
    }
}
exports.default = BaseModel;
