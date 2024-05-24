import { ICreateUser, ILoginRequest } from "../Interfaces/User/user.interface";
import { UserModel } from "../Schema/User.Schema";
import { ErrorHandler } from "../utils/ErrorHandler";

const create = async (body: ICreateUser) => {
  try {
    const existUser = await UserModel.findOne({ email: body.email });
    if (existUser) {
      throw new ErrorHandler("User Already exist", 401);
    }
    const user = await UserModel.create({ ...body });

    return user;
  } catch (error: any) {
    throw new ErrorHandler(error.message, error.statusCode);
  }
};

const login = async (body: ILoginRequest) => {
  try {
    const user = await UserModel.findOne({ email: body.email }).select(
      "+password"
    );
    if (!user) {
      throw new ErrorHandler("User Not Found", 404);
    }
    const isPasswordMatch = await user.comparePasword(body.password);

    if (!isPasswordMatch) {
      throw new ErrorHandler("Either Username or password is incorect", 404);
    }
    return user;
  } catch (error: any) {
    throw new ErrorHandler(error.message, error.statusCode);
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error: any) {
    throw new ErrorHandler(error.message, error.statusCode);
  }
};

export const UserService = { create, login, getUserById };
