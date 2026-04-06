import {
  dbGetCategoryItems,
  dbAddCategory,
  dbUpdateCategory,
  dbGetCategory,
  dbDeleteItem,
} from "../database/queries.js";
import { matchedData, validationResult } from "express-validator";

async function getCategoryItems(req, res) {
  const categoryName = req.params.category_name;
  const category = await dbGetCategory(categoryName);

  if (!category)
    throw new Error(`NOT FOUND: ${categoryName} does not exist`, {
      cause: { statusCode: 404, errorMessage: `${categoryName} not found` },
    });
  const items = await dbGetCategoryItems(category.id);
  res.render("category", { category, items });
}

async function getAddCategory(req, res) {
  const formErrors = req.session.formErrors;
  const errorMessage = req.session.errorMessage;
  delete req.session.formErrors;
  delete req.session.errorMessage;
  res.render("createCategory", { formErrors, errorMessage });
}

async function addCategory(req, res) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { categoryName, description } = matchedData(req);
    try {
      await dbAddCategory(categoryName, description);
      res.redirect("/");
    } catch (error) {
      if (error.code === "23505") {
        throw new Error(`BAD REQUEST: ${categoryName} already exists`, {
          cause: {
            statusCode: 409,
            redirectRoute: "/categories/create",
            errorMessage: `${categoryName} already exists , please enter a new category name`,
          },
        });
      } else throw error;
    }
  } else {
    throw new Error("BAD REQUEST: Invalid category data", {
      cause: {
        statusCode: 409,
        redirectRoute: "/categories/create",
        formErrors: errors.mapped(),
      },
    });
  }
}

async function getUpdateCatgory(req, res) {
  const categoryName = req.params.category_name;
  const category = await dbGetCategory(categoryName);
  const errorMessage = req.session.errorMessage;
  const formErrors = req.session.formErrors;
  delete req.session.formErrors;
  delete req.session.errorMessage;

  if (!category)
    throw new Error(`NOT FOUND: ${categoryName} does not exist`, {
      cause: { statusCode: 404, errorMessage: `${categoryName} not found` },
    });
  res.render("updateCategory", { category, errorMessage, formErrors });
}

async function updateCategory(req, res) {
  const errors = validationResult(req);
  const categoryName = req.params.category_name;

  if (errors.isEmpty()) {
    const { categoryName: newName, description: newDescription } =
      matchedData(req);

    try {
      await dbUpdateCategory(categoryName, newName, newDescription);
      res.redirect(`/categories/${encodeURIComponent(newName)}/`);
    } catch (error) {
      if (error.code === "23505") {
        throw new Error(`BAD REQUEST: ${newName} already exists`, {
          cause: {
            statusCode: 409,
            redirectRoute: `/categories/${encodeURIComponent(categoryName)}/update`,
            errorMessage: `${newName} already exists , please enter a new category name`,
          },
        });
      } else throw error;
    }
  } else {
    throw new Error("BAD REQUEST: Invalid category data", {
      cause: {
        statusCode: 409,
        redirectRoute: `/categories/${encodeURIComponent(categoryName)}/update`,
        formErrors: errors.mapped(),
      },
    });
  }
}

async function deleteItem(req, res) {
  const itemID = req.query.item_id;
  await dbDeleteItem(itemID);
  res.redirect(`/categories${req.path}`);
}
export {
  getCategoryItems,
  getAddCategory,
  addCategory,
  getUpdateCatgory,
  updateCategory,
  deleteItem,
};
