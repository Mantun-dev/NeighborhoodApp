import cookieParser from 'cookie-parser';
import express from 'express';
import adminRouter from './routes/userRoutes.js';
import viewRouter from './routes/viewRoutes.js';
import visitorsRoute from './routes/visitorsRoutes.js';
import neighborhoodsRoutes from './routes/neighborhoodsRoutes.js';

const app = express();

// ? LEVANTAMOS EXPRESS

app.use(express.json());

// ? PUG

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ? ROUTING

app.use('/', viewRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/visitors', visitorsRoute);
app.use('/api/v1/neighborhoods', neighborhoodsRoutes);

export default app;
