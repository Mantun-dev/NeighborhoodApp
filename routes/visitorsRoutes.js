import express from 'express';

import {
  getAllVisitors,
  newVisitor,
  getVisitor,
  departure,
  deleteVisitor,
  arrival,
  reports,
} from '../controllers/visitorsController.js';
import routeProtection from '../middlewares/routeProtection.js';

const router = express.Router();

router
  .route('/')
  .get(routeProtection, getAllVisitors)
  .post(routeProtection, newVisitor);
router.route('/reports').post(routeProtection, reports);
router
  .route('/:id')
  .get(routeProtection, getVisitor)
  .put(routeProtection, departure)
  .delete(routeProtection, deleteVisitor)
  .patch(routeProtection, arrival);

export default router;
