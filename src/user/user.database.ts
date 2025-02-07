import { User, UnitUser } from "./user.interface";
import { v4 as random } from "uuid";
import bcrypt from "bcryptjs";
import { db } from "../database";

// Get all users
export const findAll = async (): Promise<UnitUser[]> => {
  const [rows] = await db.query("SELECT id, username, email FROM users");
  return rows as UnitUser[];
};

// Get a single user by ID
export const findOne = async (id: string): Promise<UnitUser | undefined> => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return (rows as UnitUser[])[0];
};

// Create a new user
export const create = async (userData: User): Promise<UnitUser | null> => {
  const id = random();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  await db.query(
    "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)",
    [id, userData.username, userData.email, hashedPassword]
  );

  return { id, username: userData.username, email: userData.email, password: hashedPassword };
};

// Find user by email
export const findByEmail = async (email: string): Promise<UnitUser | null> => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return (rows as UnitUser[])[0] || null;
};

// Compare Password Function
export const comparePassword = async (email: string, password: string) => {
  const [user]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (user.length === 0) return false;

  return await bcrypt.compare(password, user[0].password);
};

// Update User Function
export const update = async (id: string, userData: any) => {
  const result = await db.query("UPDATE users SET ? WHERE id = ?", [userData, id]);
  return result;
};

// Remove User Function
export const remove = async (id: string) => {
  const result = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result;
};