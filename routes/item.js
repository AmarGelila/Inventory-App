import { Router } from "express";
import {
  getItem,
  getAddItem,
  addItem,
  getUpdateItem,
  updateItem,
} from "../controllers/item.js";
import { catchAsync } from "../utils/catchAsync.js";
import { itemValidator } from "../utils/validators.js";
const router = Router({ mergeParams: true });

router
  .route("/items/create")
  .get(catchAsync(getAddItem))
  .post(itemValidator, catchAsync(addItem));

router
  .route("/items/:item_name/update")
  .get(catchAsync(getUpdateItem))
  .put(itemValidator, catchAsync(updateItem));

router.get("/items/:item_name", catchAsync(getItem));

export default router;
