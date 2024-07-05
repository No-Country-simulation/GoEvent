"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const environment_1 = require("./environment");
const db_1 = __importDefault(require("./db"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.database();
        this.middlewares();
        this.routes();
    }
    database() {
        db_1.default.getInstance();
    }
    middlewares() {
        this.app.use((0, cors_1.default)({ origin: environment_1.CORS_ORIGIN }));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(`/${environment_1.API_VERSION}/auth`, auth_routes_1.default);
    }
    listen() {
        this.server = this.app.listen(environment_1.PORT, () => {
            console.log(`Server running on port ${environment_1.PORT}`);
        });
    }
    close() {
        this.server.close();
    }
}
exports.default = Server;
