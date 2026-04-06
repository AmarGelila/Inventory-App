import { Router } from "express";
import categoryRouter from "./category.js";
import { getCategories, deleteCategory } from "../controllers/home.js";
import { catchAsync } from "../utils/catchAsync.js";

const router = Router();
router
  .route("")
  .get(catchAsync(getCategories))
  .delete(catchAsync(deleteCategory));
router.use("/categories", categoryRouter);

export default router;
