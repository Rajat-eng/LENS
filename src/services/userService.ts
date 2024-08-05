import { ICreateUser, ILoginRequest } from "../Interfaces/User/user.interface";
import { UserDocument, UserModel } from "../Schema/User.Schema";
import { ErrorHandler } from "../utils/ErrorHandler";
import { omit } from "lodash";
const create = async (body: ICreateUser) => {
  try {
    const existUser = await UserModel.findOne({ email: body.email });
    if (existUser) {
      throw new ErrorHandler("User Already exist", 409);
    }
    const user = await UserModel.create({ ...body });

    return user.toJSON();
  } catch (error: any) {
    throw new ErrorHandler(error.message, error.statusCode);
  }
};

const login = async (body: ILoginRequest): Promise<string> => {
  try {
    const user = await UserModel.findOne({ email: body.email });

    if (!user) {
      throw new ErrorHandler("User Not Found", 404);
    }

    const isPasswordMatch = await user.comparePasword(body.password);

    if (!isPasswordMatch) {
      throw new ErrorHandler("Either Username or password is incorect", 404);
    }

    const access_token = user.signAccessToken();
    return access_token;
  } catch (error: any) {
    throw new ErrorHandler(error.message, error.statusCode);
  }
};

const getUserById = async (
  id: string
): Promise<Omit<UserDocument, "password"> | null> => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ErrorHandler("User does not exist", 404);
    }
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new ErrorHandler(error.message, error.statusCode);
  }
};

const updateUser = async (id: string) => {
  const user = await UserModel.findByIdAndUpdate(id, {
    $set: {
      manager: "ads",
    },
  });
};
export const UserService = { create, login, getUserById, updateUser };
