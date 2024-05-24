import app from "../src/app";
import request from "supertest";
import { UserModel } from "../src/Schema/User.Schema";
import { UserService } from "../src/services/userService";
import { ErrorHandler } from "../src/utils/ErrorHandler";
import { isAuthenticated } from "../src/middleware/auth.middleware";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
it("should create a new user when no existing user with the same email exists", async () => {
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  };
  UserModel.findOne = jest.fn().mockResolvedValue(null);
  UserModel.create = jest.fn().mockResolvedValue(mockUser);
  const result = await UserService.create(mockUser);
  expect(UserModel.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
  expect(UserModel.create).toHaveBeenCalledWith(mockUser);
  expect(result).toEqual(mockUser);
});

it("should throw an error when the email already exists", async () => {
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    password: "123456",
  };
  UserModel.findOne = jest.fn().mockResolvedValue(mockUser);
  await expect(UserService.create(mockUser)).rejects.toThrow(ErrorHandler);
  expect(UserModel.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
});

// User is found and password matches
it("should return the user when credentials are correct", async () => {
  const mockUser = {
    email: "test@example.com",
    password: "password123",
    comparePasword: jest.fn().mockResolvedValue(true),
  };
  jest.spyOn(UserModel, "findOne").mockResolvedValue(mockUser);
  const result = await UserService.login({
    email: "test@example.com",
    password: "password123",
  });
  expect(result).toEqual(mockUser);
  expect(mockUser.comparePasword).toHaveBeenCalledWith("password123");
});

// User not found in the database
it("should throw an error when the user is not found", async () => {
  jest.spyOn(UserModel, "findOne").mockResolvedValue(null);
  await expect(
    UserService.login({
      email: "nonexistent@example.com",
      password: "password123",
    })
  ).rejects.toThrow(new ErrorHandler("User Not Found", 404));
});

it("should return a user object when a valid ID is provided", async () => {
  const mockId = "validUserId123";
  const mockUser = {
    id: mockId,
    username: "testUser",
    email: "test@example.com",
  };
  UserModel.findById = jest.fn().mockReturnValue({
    select: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    }),
  });
  const result = await UserService.getUserById(mockId);
  expect(result).toEqual(mockUser);
});

it("should throw an error when an invalid ID is provided", async () => {
  const mockId = "invalidUserId123";
  const mockError = new ErrorHandler("User not found", 404);
  UserModel.findById = jest.fn().mockReturnValue({
    select: jest.fn().mockReturnValue({
      exec: jest.fn().mockRejectedValue(mockError),
    }),
  });
  await expect(UserService.getUserById(mockId)).rejects.toThrow(ErrorHandler);
});

// describe("isAuthenticated Middleware", () => {
//   it("should call next() with a verified user when a valid token is provided", async () => {
//     // Mocked request object
//     const req = {
//       user: null,
//       cookies: { token: "valid-token" },
//     } as unknown as Request & { user: any };

//     // Mocked response object
//     const res = {} as Response;

//     // Mocked next function
//     const next = jest.fn() as NextFunction;

//     // Mocking jwt.verify method
//     jest.mock("jsonwebtoken", () => ({
//       verify: jest.fn().mockReturnValue({ id: "123" }),
//     }));

//     process.env.ACCESS_TOKEN = "secret";

//     // Assertions
//     expect(jwt.verify).toHaveBeenCalledWith("valid-token", "secret");
//     expect(req.user).toBe("123");
//     expect(next).toHaveBeenCalledTimes(1);
//   });

//   it("should return an error when no token is provided", async () => {
//     // Mocked request object with no token
//     const req = {
//       cookies: {},
//     } as Request;

//     // Mocked response object
//     const res = {} as Response;

//     // Mocked next function
//     const next = jest.fn() as NextFunction;

//     // Importing the middleware function

//     // Calling the middleware function
//     await isAuthenticated(req, res, next);

//     // Expecting that next() was called with an error
//     expect(next).toHaveBeenCalledWith(expect.any(Error));
//   });
// });
