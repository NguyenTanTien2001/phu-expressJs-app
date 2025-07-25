import { IUser, User } from "../models/user.model";

/**
 * Creates a new User document with the specified name and saves it to the database.
 *
 * @param name - The name of the User to be created.
 * @param gender - The gender of the User to be created.
 * @param dob - The date of birth of the User to be created.
 * @returns A promise that resolves to the created IUser instance.
 */
export const createUser = async (name: string, gender: string, dob: Date): Promise<IUser> => {
  const user = new User({ name, gender, dob });
  return await user.save();
};

/**
 * Retrieves a list of User from the database.
 *
 * @returns A promise that resolves to an array of `IUser` objects.
 */
export const getUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

/**
 * Retrieves a User by id from the database.
 *
 * @returns A promise that resolves to an instance of `IUser` of null or undefined objects.
 */
export const getUserById = async (id: string): Promise<IUser | null | undefined> => {
  return await User.findOne({ id: id });
};

/**
 * Update a User in the database.
 *
 * @returns A promise that resolves to an instance of `IUser` of null or undefined objects.
 */
export const updateUser = async (id: string, name: string, gender: string, dob: Date): Promise<IUser | null | undefined> => {
  return await User.findOneAndUpdate({ id: id }, { name, gender, dob }, { new: true });
};

/**
 * delete a User by id from the database.
 *
 * @returns A promise that return to an instance of `IUser` of null or undefined objects.
 */
export const deleteUser = async (id: string): Promise<IUser | null | undefined> => {
  return await User.findOneAndDelete({ id: id });
};