import { settings } from "./../settings";
import jwt from "jsonwebtoken";

export const jwtService = {
  async createJWT(user: any) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "10h",
    });
    return { token };
  },
  async verifyJWT(token: any) {
    try {
      let result: any;
      result = jwt.verify(token, process.env.JWT_SECRET!);
      return result;
    } catch (error) {
      return null;
    }
  },
};
