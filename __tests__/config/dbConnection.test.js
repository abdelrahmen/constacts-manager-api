const mongoose = require("mongoose");
const connectDb = require("../../config/dbConnection");
require("dotenv").config();

describe("connectDb", () => {
  beforeAll(async () => {
    await mongoose.disconnect();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("connects to the database", async () => {
    await connectDb();
    expect(mongoose.connection.readyState).toBe(1);
  });

  test('throws an error if the connection fails', async () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    jest.spyOn(mongoose, 'connect').mockImplementation(() => {
      throw new Error('Connection failed');
    });
    await connectDb();
    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });


});
