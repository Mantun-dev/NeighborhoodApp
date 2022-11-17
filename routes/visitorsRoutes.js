import express from 'express';

import {
  getAllVisitors,
  newVisitor,
  getVisitor,
  updateVisitor,
  deleteVisitor,
} from '../controllers/visitorsController.js';

const router = express.Router();

router.route('/').get(getAllVisitors).post(newVisitor);
router.route('/:id').get(getVisitor).patch(updateVisitor).delete(deleteVisitor);

export default router;
