"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//import { PrismaClient } from '@prisma/client';
dotenv_1.default.config();
//const prisma = new PrismaClient();
const app = (0, express_1.default)();
//const app = express();
const port = process.env.PORT;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('<h1>Express server</h1>');
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
