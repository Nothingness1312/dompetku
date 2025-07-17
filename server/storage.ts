import { users, transactions, savingsGoals, userSettings, type User, type InsertUser, type Transaction, type InsertTransaction, type SavingsGoal, type InsertSavingsGoal, type UserSettings, type InsertUserSettings } from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyPassword(email: string, password: string): Promise<User | null>;
  
  // Transaction methods
  getTransactionsByUser(userId: number): Promise<Transaction[]>;
  getTransactionsByUserAndDateRange(userId: number, startDate: Date, endDate: Date): Promise<Transaction[]>;
  getTransactionsByCategory(userId: number, category: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction & { userId: number }): Promise<Transaction>;
  updateTransaction(id: number, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined>;
  deleteTransaction(id: number): Promise<boolean>;
  
  // Savings goals methods
  getSavingsGoalsByUser(userId: number): Promise<SavingsGoal[]>;
  createSavingsGoal(goal: InsertSavingsGoal & { userId: number }): Promise<SavingsGoal>;
  updateSavingsGoal(id: number, goal: Partial<InsertSavingsGoal>): Promise<SavingsGoal | undefined>;
  deleteSavingsGoal(id: number): Promise<boolean>;
  
  // User settings methods
  getUserSettings(userId: number): Promise<UserSettings | undefined>;
  updateUserSettings(userId: number, settings: Partial<InsertUserSettings>): Promise<UserSettings>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        password: hashedPassword,
      })
      .returning();
    
    // Create default settings for new user
    await this.updateUserSettings(user.id, {});
    
    return user;
  }

  async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    return await db.select().from(transactions).where(eq(transactions.userId, userId));
  }

  async getTransactionsByUserAndDateRange(userId: number, startDate: Date, endDate: Date): Promise<Transaction[]> {
    return await db.select().from(transactions).where(
      and(
        eq(transactions.userId, userId),
        gte(transactions.date, startDate),
        lte(transactions.date, endDate)
      )
    );
  }

  async getTransactionsByCategory(userId: number, category: string): Promise<Transaction[]> {
    return await db.select().from(transactions).where(
      and(
        eq(transactions.userId, userId),
        eq(transactions.category, category)
      )
    );
  }

  async createTransaction(transaction: InsertTransaction & { userId: number }): Promise<Transaction> {
    const [newTransaction] = await db
      .insert(transactions)
      .values({
        ...transaction,
        description: transaction.description || null,
        date: transaction.date || new Date(),
      })
      .returning();
    return newTransaction;
  }

  async updateTransaction(id: number, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined> {
    const [updated] = await db
      .update(transactions)
      .set(transaction)
      .where(eq(transactions.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteTransaction(id: number): Promise<boolean> {
    const result = await db.delete(transactions).where(eq(transactions.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getSavingsGoalsByUser(userId: number): Promise<SavingsGoal[]> {
    return await db.select().from(savingsGoals).where(eq(savingsGoals.userId, userId));
  }

  async createSavingsGoal(goal: InsertSavingsGoal & { userId: number }): Promise<SavingsGoal> {
    const [newGoal] = await db
      .insert(savingsGoals)
      .values({
        ...goal,
        currentAmount: goal.currentAmount || "0",
        deadline: goal.deadline || null,
      })
      .returning();
    return newGoal;
  }

  async updateSavingsGoal(id: number, goal: Partial<InsertSavingsGoal>): Promise<SavingsGoal | undefined> {
    const [updated] = await db
      .update(savingsGoals)
      .set(goal)
      .where(eq(savingsGoals.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteSavingsGoal(id: number): Promise<boolean> {
    const result = await db.delete(savingsGoals).where(eq(savingsGoals.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getUserSettings(userId: number): Promise<UserSettings | undefined> {
    const [settings] = await db.select().from(userSettings).where(eq(userSettings.userId, userId));
    return settings || undefined;
  }

  async updateUserSettings(userId: number, settings: Partial<InsertUserSettings>): Promise<UserSettings> {
    const existing = await this.getUserSettings(userId);
    
    if (existing) {
      const [updated] = await db
        .update(userSettings)
        .set(settings)
        .where(eq(userSettings.userId, userId))
        .returning();
      return updated;
    } else {
      const [newSettings] = await db
        .insert(userSettings)
        .values({
          userId,
          darkMode: false,
          privacyMode: false,
          ...settings,
        })
        .returning();
      return newSettings;
    }
  }
}

export const storage = new DatabaseStorage();
