import { query } from "../db";
import { User } from "../models/user";

export async function getUser(id: number): Promise<User | undefined> {
  return (await query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return (await query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
}

export async function createUser(
  email: string,
  password: string,
  role: string
): Promise<User> {
  return (
    await query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [email, password, role]
    )
  ).rows[0];
}
