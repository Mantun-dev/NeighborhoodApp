import express from 'express';

import {
  getAllVisitors,
  newVisitor,
  getVisitor,
  departure,
  deleteVisitor,
  arrival,
  reports,
  visitorRecords,
} from '../controllers/visitorsController.js';
import routeProtection from '../middlewares/routeProtection.js';

const router = express.Router();

router
  .route('/')
  .get(routeProtection, getAllVisitors)
  .post(newVisitor)
  .patch(arrival)
  .put(departure);
router.route('/reports').post(routeProtection, reports);
router.route('/history').post(routeProtection, visitorRecords);
router.route('/:id').get(getVisitor).delete(deleteVisitor);

export default router;
