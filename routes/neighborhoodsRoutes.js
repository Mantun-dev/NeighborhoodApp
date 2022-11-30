import express from 'express';

import {
  getAllNeighborhoods,
  newNeighborhood,
  getNeighborhood,
  updateNeighborhood,
  deleteNeighborhood,
} from '../controllers/neighborhoodsController.js';

import routeProtection from '../middlewares/routeProtection.js';

const router = express.Router();

router
  .route('/')
  .get(routeProtection, getAllNeighborhoods)
  .post(routeProtection, newNeighborhood);
router
  .route('/:id')
  .get(routeProtection, getNeighborhood)
  .patch(routeProtection, updateNeighborhood)
  .delete(routeProtection, deleteNeighborhood);

export default router;
