import { IAccount, Account } from "../models/account.model";
import { User } from "../models/user.model";

/**
 * Creates a new Account document with the specified title and saves it to the database.
 *
 * @param user_id - The User id of the user link to account to be created.
 * @param username - The username of the account to be created.
 * @param hashedPassword - The username of the account to be created.
 * @param accessToken - The username of the account to be created.
 * @param status - The username of the account to be created.
 * @returns A promise that resolves to the created IAccount instance.
 */
export const createAccount = async (user_id: string, username: string, hashedPassword: string, accessToken: string, status: string): Promise<IAccount> => {
  const account = new Account({ user_id, username, hashedPassword, accessToken, status });
  return await account.save();
};

/**
 * Retrieves a list of account from the database.
 *
 * @returns A promise that resolves to an array of `IAccount` objects.
 */
export const getAccounts = async (): Promise<IAccount[]> => {
  return await Account.find();
};

/**
 * Retrieves a Account by id from the database.
 *
 * @param id - The id of the Account to be created.
 * @returns A promise that resolves to an instance of `IAccount` of null or undefined objects.
 */
export const getAccountById = async (id: string): Promise<IAccount | null | undefined> => {
  return await Account.findOne({ _id: id });
};

/**
 * Retrieves a Account by id from the database.
 *
 * @param username - The username of the Account to be created.
 * @returns A promise that resolves to an instance of `IAccount` of null or undefined objects.
 */
export const getAccountByUsername = async (username: string): Promise<IAccount | null | undefined> => {
  return await Account.findOne({ username: username });
};

/**
 * Update a Account in the database.
 *
 * @param user_id - The User id of the user link to account to be created.
 * @param username - The username of the account to be created.
 * @param hashedPassword - The username of the account to be created.
 * @param accessToken - The username of the account to be created.
 * @param status - The username of the account to be created.
 * @returns A promise that resolves to an instance of `IAccount` of null or undefined objects.
 */
export const updateAccount = async (id: string, user_id: string, username: string, hashedPassword: string, accessToken: string, status: string): Promise<IAccount | null | undefined> => {
  const result = await Account.findOneAndUpdate({ _id: id }, { name, user_id, username, hashedPassword, accessToken, status }, { new: true });
  return result;
};

/**
 * delete a Account by id from the database.
 *
 * @param id - The id of the Account to be created.
 * @returns A promise that return to an instance of `IAccount` of null or undefined objects.
 */
export const deleteAccount = async (id: string): Promise<IAccount | null | undefined> => {
  
  // Get info of the account
  const account = await Account.findOne({ _id: id });

  // Delete the User that link to the account
  await User.findByIdAndDelete({ _id: account?.user_id });

  // Finally, delete the Account
  const result = await Account.findByIdAndDelete({ _id: id });

  return result;
};