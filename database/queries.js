import pool from "./pool.js";

async function dbGetCategories() {
  const { rows } = await pool.query("SELECT * FROM categories;");
  return rows;
}

async function dbAddCategory(categoryName, description) {
  await pool.query("INSERT INTO categories(name,description) VALUES($1,$2)", [
    categoryName,
    description,
  ]);
}

async function dbDeleteCategory(categoryID) {
  await pool.query("DELETE FROM categories WHERE id = $1", [categoryID]);
}

async function dbGetCategory(categoryName) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE name = $1",
    [categoryName],
  );
  return rows[0];
}

async function dbGetCategoryItems(categoryID) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = $1;",
    [categoryID],
  );

  return rows;
}

async function dbGetItem(itemName) {
  const { rows } = await pool.query("SELECT * FROM items WHERE name = $1;", [
    itemName,
  ]);

  return rows[0];
}

async function dbUpdateCategory(categoryName, newName, newDescription) {
  await pool.query(
    "UPDATE categories SET name = $2 , description = $3 WHERE name = $1",
    [categoryName, newName, newDescription],
  );
}

async function dbDeleteItem(itemID) {
  await pool.query("DELETE FROM items WHERE id = $1", [itemID]);
}

async function dbAddItem(categoryName, itemName, description, quantity, price) {
  await pool.query(
    "INSERT INTO items(category_id,name,description,quantity,price) VALUES((SELECT id FROM categories WHERE name = $1),$2,$3,$4,$5)",
    [categoryName, itemName, description, quantity, price],
  );
}

async function dbUpdateItem(itemName, newName, description, quantity, price) {
  await pool.query(
    "UPDATE items SET name = $2 ,description = $3 ,quantity = $4 ,price = $5 WHERE name = $1;",
    [itemName, newName, description, quantity, price],
  );
}
export {
  dbGetCategories,
  dbGetCategory,
  dbGetCategoryItems,
  dbGetItem,
  dbAddCategory,
  dbUpdateCategory,
  dbDeleteCategory,
  dbDeleteItem,
  dbAddItem,
  dbUpdateItem,
};
