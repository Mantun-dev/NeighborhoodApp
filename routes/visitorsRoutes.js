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

const router = express.Router();

router.route('/').get(getAllVisitors).post(newVisitor);
router.route('/reports').get(reports);
router
  .route('/:id')
  .get(getVisitor)
  .put(departure)
  .delete(deleteVisitor)
  .patch(arrival);

export default router;
