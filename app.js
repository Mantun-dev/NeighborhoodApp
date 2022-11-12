import express from 'express';
import adminRouter from './routes/userRoutes.js';
import viewRouter from './routes/viewRoutes.js';

const app = express();

// ? LEVANTAMOS EXPRESS

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// ? PUG

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// ? ROUTING

app.use('/', viewRouter);
app.use('/api/v1/admin', adminRouter);

export default app;
