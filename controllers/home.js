import { dbGetCategories, dbDeleteCategory } from "../database/queries.js";

async function getCategories(req, res) {
  const categories = await dbGetCategories();
  if (!categories || categories.length === 0)
    throw new Error("NOT FOUND : there is no categories", {
      cause: { statusCode: 404 },
    });
  res.render("index", { categories });
}

async function deleteCategory(req, res) {
  const categoryID = req.query.category_id;
  await dbDeleteCategory(categoryID);
  res.redirect("/");
}

export { getCategories, deleteCategory };
