import express from 'express';

import {
  getAllNeighborhoods,
  newNeighborhood,
  getNeighborhood,
  updateNeighborhood,
  deleteNeighborhood,
} from '../controllers/neighborhoodsController.js';

const router = express.Router();

router.route('/').get(getAllNeighborhoods).post(newNeighborhood);
router
  .route('/:id')
  .get(getNeighborhood)
  .patch(updateNeighborhood)
  .delete(deleteNeighborhood);

export default router;
