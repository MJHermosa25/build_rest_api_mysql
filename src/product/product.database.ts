import { Product, UnitProduct } from "./product.interface";
import { v4 as random } from "uuid";
import { db } from "../database";

// Get all products
export const findAll = async (): Promise<UnitProduct[]> => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows as UnitProduct[];
};

// Get a single product by ID
export const findOne = async (id: string): Promise<UnitProduct | undefined> => {
  const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
  return (rows as UnitProduct[])[0];
};

// Create a new product
export const create = async (productInfo: Product): Promise<UnitProduct | null> => {
  const id = random();
  const { name, price, quantity, image } = productInfo;

  try {
    const [result] = await db.query(
      "INSERT INTO products (id, name, price, quantity, image) VALUES (?, ?, ?, ?, ?)",
      [id, name, price, quantity, image]
    );
    console.log("Insert Result:", result);  // ✅ Logs if insert was successful
    return { id, ...productInfo };
  } catch (error) {
    console.error("MySQL Insert Error:", error);  // ❌ Logs MySQL errors
    return null;
  }
};

// Update an existing product
export const update = async (id: string, updateValues: Product): Promise<UnitProduct | null> => {
  const { name, price, quantity, image } = updateValues;

  const [result] = await db.query(
    "UPDATE products SET name = ?, price = ?, quantity = ?, image = ? WHERE id = ?",
    [name, price, quantity, image, id]
  );

  if ((result as any).affectedRows === 0) {
    return null;
  }

  return { id, ...updateValues };
};

// Delete a product
export const remove = async (id: string): Promise<void | null> => {
  const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);

  if ((result as any).affectedRows === 0) {
    return null;
  }
};
