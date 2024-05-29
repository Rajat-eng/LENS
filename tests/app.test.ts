import app from "../src/server";
import request from "supertest";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../src/Schema/User.Schema";
import { UserService } from "../src/services/userService";
import { ErrorHandler } from "../src/utils/ErrorHandler";
import { UserController } from "../src/controllers/UserController";
import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

describe("POST /api/v1/users/create-user", () => {
  it("should throw an error when the email already exists", async () => {
    const userData = {
      name: "Rajat",
      email: "vrajat269@gmail.com",
      password: "12345",
    };
    const createMock = jest
      .spyOn(UserService, "create")
      .mockRejectedValue(new ErrorHandler("User Already Exist", 409));
    const { body, statusCode } = await request(app)
      .post("/api/v1/user/create-user")
      .send(userData);

    expect(statusCode).toBe(409);

    // Assert that the response body contains the correct error message
    expect(body.message).toBe("User Already Exist");

    // Assert that UserService.create was called with the correct data
    expect(createMock).toHaveBeenCalledWith(userData);
  });
});

describe("login user", () => {
  it("should login user and set token in cookie when credentials are correct", async () => {
    const userData = {
      email: "vrajat269@gmail.com",
      password: "12345",
    };
    const mockAccessToken = "mockAccessToken12345";
    const LoginMock = jest
      .spyOn(UserService, "login")
      .mockResolvedValue(mockAccessToken);
    const { statusCode, body } = await request(app)
      .post("/api/v1/user/login")
      .send(userData);
    expect(statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.message).toBe("Logged in successfully");
    expect(body.data).toBe(mockAccessToken);
    expect(LoginMock).toHaveBeenCalledWith(userData);
  });
});

describe("get user", () => {
  it("should give user when token is valid", async () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "Rajat",
      email: "vrajat269@gmail.com",
      createdAt: new Date("2021-09-30T13:31:07.674Z"),
      updatedAt: new Date("2021-09-30T13:31:07.674Z"),
      __v: 0,
    };
    const token = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN as string
    );

    const validUserMock = jest
      .spyOn(UserService, "getUserById")
      .mockResolvedValue(user);

    // const req = {
    //   user: "validUserId",
    // } as Request & { user: any };

    // const res = {
    //   status: jest.fn().mockReturnThis(),
    //   json: jest.fn().mockReturnThis(),
    // } as unknown as Response;

    // const next = jest.fn();

    // await UserController.getUser(req, res, next);

    const response = await request(app)
      .get("/api/v1/user/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBeTruthy();
    // expect(response.body.data).toEqual(user);
    expect(validUserMock).toHaveBeenCalledWith(user._id);
  });

  it("should throw error when token is not present", async () => {
    const error = new ErrorHandler("login first", 400);
    const mockError = jest
      .spyOn(UserService, "getUserById")
      .mockRejectedValue(error);
    const response = await request(app).get("/api/v1/user/profile");

    expect(response.statusCode).toBe(400);
    expect(mockError).toHaveBeenCalledTimes(0);
  });

  it("should throw error message when token is invalid", async () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toString(),
    };
    const error = new ErrorHandler("session expired", 440);
    const token = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN as string,
      {
        expiresIn: "1ms",
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 10));
    const mockError = jest
      .spyOn(UserService, "getUserById")
      .mockRejectedValue(error);

    const response = await request(app)
      .get("/api/v1/user/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(440);
    expect(mockError).toHaveBeenCalledTimes(0);
  });
});
