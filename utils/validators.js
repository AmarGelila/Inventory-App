import { body } from "express-validator";

const categoryValidator = [
  body("categoryName")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Category name must be between 3 and 20 characters"),
  body("description")
    .trim()
    .isLength({ max: 150 })
    .withMessage("Category description must not exceed 150 characters"),
];
const itemValidator = [
  body("itemName")
    .trim()
    .notEmpty()
    .withMessage("Item name is required.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Item name must be between 3 and 20 characters"),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Item quantity is required")
    .isInt({ min: 1, max: 1000 })
    .withMessage("Item quantity must be between 1 and 1000"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Item price is required")
    .isNumeric({ min: 1 })
    .withMessage("Item price must be bigger than 1"),
  body("description")
    .trim()
    .isLength({ max: 150 })
    .withMessage("Item description must not exceed 150 characters"),
];

export { categoryValidator, itemValidator };
