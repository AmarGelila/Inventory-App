#! /usr/bin/env node
import "dotenv/config";
import { Client } from "pg";

const SQL = `
    DROP TABLE IF EXISTS categories CASCADE;
    DROP TABLE IF EXISTS items CASCADE;

    CREATE EXTENSION IF NOT EXISTS citext;
    CREATE TABLE categories (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name CITEXT UNIQUE,
        description VARCHAR(255),
        count INT
    );

    CREATE TABLE items (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        category_id INT,
        name CITEXT UNIQUE ,
        description VARCHAR(255),
        quantity INT,
        price INT,
        CONSTRAINT category_fk
        FOREIGN KEY(category_id)
        REFERENCES categories(id)
    	  ON DELETE CASCADE
    );

    INSERT INTO categories ( name , description , count ) VALUES 
    ('Produce', 'Fresh fruits and seasonal vegetables', 45),
    ('Dairy & Eggs', 'Milk, cheeses, butter, and farm-fresh eggs', 22),
    ('Bakery', 'Freshly baked bread, bagels, and pastries', 15),
    ('Meat & Seafood', 'Prime cuts of beef, poultry, and sustainable seafood', 30),
    ('Pantry Staples', 'Grains, pasta, oils, and canned goods', 120),
    ('Frozen Foods', 'Ready-to-eat meals, ice cream, and frozen veggies', 55),
    ('Beverages', 'Coffee, tea, juices, and carbonated drinks', 40),
    ('Snacks', 'Chips, nuts, crackers, and chocolate', 65),
    ('Household', 'Cleaning supplies, paper towels, and detergents', 25),
    ('Personal Care', 'Shampoo, soap, toothpaste, and skincare', 38);


    INSERT INTO items (category_id, name, description, quantity, price) VALUES
    (1, 'Honeycrisp Apples', 'Crisp and sweet organic apples', 50, 2),
    (1, 'Baby Spinach', 'Pre-washed organic baby spinach (5oz)', 20, 4),
    (2, 'Whole Milk', '1 Gallon of Vitamin D fortified milk', 15, 5),
    (2, 'Greek Yogurt', 'Plain unsweetened Greek yogurt (32oz)', 12, 6),
    (3, 'Sourdough Loaf', 'Artisan freshly baked sourdough bread', 8, 7),
    (4, 'Chicken Breast', 'Boneless, skinless organic chicken (1lb)', 25, 12),
    (5, 'Basmati Rice', 'Extra long grain premium rice (5lb)', 40, 15),
    (6, 'Frozen Blueberries', 'Wild organic frozen blueberries (1lb)', 30, 8),
    (7, 'Cold Brew Coffee', 'Ready-to-drink unsweetened black coffee', 18, 5),
    (8, 'Sea Salt Almonds', 'Roasted and lightly salted almonds', 22, 10);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
