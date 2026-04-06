import { Router } from "express";
import {
  getCategoryItems,
  getAddCategory,
  addCategory,
  getUpdateCatgory,
  updateCategory,
  deleteItem,
} from "../controllers/category.js";
import itemRouter from "./item.js";
import { catchAsync } from "../utils/catchAsync.js";
import { categoryValidator } from "../utils/validators.js";

const router = Router({ mergeParams: true });

router
  .route("/create")
  .get(catchAsync(getAddCategory))
  .post(categoryValidator, catchAsync(addCategory));

router
  .route("/:category_name/update")
  .get(catchAsync(getUpdateCatgory))
  .put(categoryValidator, catchAsync(updateCategory));

router
  .route("/:category_name")
  .get(catchAsync(getCategoryItems))
  .delete(catchAsync(deleteItem));

router.use("/:category_name", itemRouter);
export default router;
