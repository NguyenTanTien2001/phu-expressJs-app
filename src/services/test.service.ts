import { ITest, Test } from "../models/test.model";

/**
 * Creates a new Test document with the specified title and saves it to the database.
 *
 * @param title - The title of the test to be created.
 * @returns A promise that resolves to the created ITest instance.
 */
export const createTest = async (title: string): Promise<ITest> => {
  const user = new Test({ title });
  return await user.save();
};

/**
 * Retrieves a list of test from the database.
 *
 * @returns A promise that resolves to an array of `ITest` objects.
 */
export const getTests = async (): Promise<ITest[]> => {
  return await Test.find();
};