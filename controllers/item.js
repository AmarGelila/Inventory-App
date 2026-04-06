import { dbGetItem, dbUpdateItem, dbAddItem } from "../database/queries.js";
import { matchedData, validationResult } from "express-validator";

async function getItem(req, res) {
  const itemName = req.params.item_name;
  const item = await dbGetItem(itemName);
  if (!item) {
    throw new Error(`NOT FOUND: ${itemName} does not exist`, {
      cause: { statusCode: 404, errorMessage: `${itemName} not found` },
    });
  }
  res.render("item", { item });
}

async function getAddItem(req, res) {
  const formErrors = req.session.formErrors;
  const errorMessage = req.session.errorMessage;
  delete req.session.formErrors;
  delete req.session.errorMessage;
  res.render("createItem", { formErrors, errorMessage });
}

async function addItem(req, res) {
  const errors = validationResult(req);
  const categoryName = req.params.category_name;

  if (errors.isEmpty()) {
    const { itemName, description, quantity, price } = matchedData(req);
    try {
      await dbAddItem(categoryName, itemName, description, quantity, price);
      res.redirect(`/categories/${encodeURIComponent(categoryName)}/`);
    } catch (error) {
      if (error.code === "23505") {
        throw new Error(`BAD REQUEST: ${itemName} already exists`, {
          cause: {
            statusCode: 409,
            redirectRoute: `/categories/${encodeURIComponent(categoryName)}/items/create`,
            errorMessage: `${itemName} already exists , please enter another name`,
          },
        });
      } else throw error;
    }
  } else {
    throw new Error("BAD REQUEST: Invalid Item Data", {
      cause: {
        statusCode: 409,
        redirectRoute: `/categories/${encodeURIComponent(categoryName)}/items/create`,
        formErrors: errors.mapped(),
      },
    });
  }
}

async function getUpdateItem(req, res) {
  const itemName = req.params.item_name;
  const item = await dbGetItem(itemName);
  const errorMessage = req.session.errorMessage;
  const formErrors = req.session.formErrors;
  delete req.session.errorMessage;
  delete req.session.formErrors;
  if (!item)
    throw new Error(`NOT FOUND: ${itemName} does not exist`, {
      cause: { statusCode: 404, errorMessage: `${itemName} not found` },
    });
  res.render("updateItem", { item, errorMessage, formErrors });
}

async function updateItem(req, res) {
  const errors = validationResult(req);
  const categoryName = req.params.category_name;
  const itemName = req.params.item_name;

  if (errors.isEmpty()) {
    const {
      itemName: newName,
      description,
      quantity,
      price,
    } = matchedData(req);

    try {
      await dbUpdateItem(itemName, newName, description, quantity, price);
      res.redirect(
        `/categories/${encodeURIComponent(categoryName)}/items/${encodeURIComponent(newName)}/`,
      );
    } catch (error) {
      if (error.code === "23505") {
        throw new Error(`BAD REQUEST: ${itemName} already exists`, {
          cause: {
            statusCode: 409,
            redirectRoute: `/categories/${encodeURIComponent(categoryName)}/items/${encodeURIComponent(itemName)}/update`,
            errorMessage: `${newName} already exists , please enter another name`,
          },
        });
      } else throw error;
    }
  } else {
    throw new Error(`BAD REQUEST: Invalid Item Data`, {
      cause: {
        statusCode: 409,
        redirectRoute: `/categories/${encodeURIComponent(categoryName)}/items/${encodeURIComponent(itemName)}/update`,
        formErrors: errors.mapped(),
      },
    });
  }
}

export { getItem, getAddItem, addItem, getUpdateItem, updateItem };
