import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

import sql from './database/index.js';

import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    
    middlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }
    
    routes() {
        this.app.use('/', homeRoutes);
        this.app.use('/users/', userRoutes);
        this.app.use('/tokens/', tokenRoutes);
        this.app.use('/alunos/', alunoRoutes);
        this.app.use('/fotos/', fotoRoutes);

        // this.app.get('/test', (req, res) => {
        //     res.json({ message: 'Server is working!' });
        // });          
    }
}

export default new App().app;
