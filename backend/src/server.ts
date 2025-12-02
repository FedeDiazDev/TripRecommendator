import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import apiRouter from './router';

const app: Express = express();
const PORT: number = Number(process.env.BACKEND_PORT);

if (!PORT) {
    console.error('CRITICAL ERROR: BACKEND_PORT environment variable is not defined.');
    process.exit(1);
}

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor de Recomendaciones de Viaje está en línea.');
});

app.use('/api', apiRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});