import { usersRepository } from "./../repositories/users-repository";
import { emailManager } from "../aplication/email-manager";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";

const roundSalts = 10;
export const registrationServise = {
  async registratUserByEmai(email: string, login: string, password: string) {
    const passwordHash = await bcrypt.hash(password, roundSalts);
    const registratedUser = {
      id: uuidv4(),
      accountData: {
        login,
        email: email,
        password: passwordHash,
        createdAt: new Date(),
      },
      emailConfirmation: {
        confirmCode: uuidv4(),
        expirationDate: add(new Date(), {
          hours: 1,
          minutes: 3,
        }),
        isConfirmed: false,
      },
    };
    const createdUser = await usersRepository.createUser(registratedUser);
    try {
      const result = await emailManager.sendEmail(registratedUser);
      if (!result) return null;
      return createdUser;
    } catch (error) {
      return null;
    }
  },
  async confirmEmail(code: any) {
    const foundUser = await usersRepository.findUserByCode(code);
    return foundUser;
  },
  async checkExistingUser(user: any) {
    const foundUser = await usersRepository.checkExistingUser(user);
    return foundUser;
  },
  async resendRegistration(email: any) {
    const foundUser = await usersRepository.findUserByEmail(email);
    if (!foundUser) return null;
    // console.log(foundUser.emailConfirmation.confirmCode);

    foundUser.emailConfirmation.confirmCode = uuidv4();

    const updateCode = await usersRepository.findUserAndUpdateConfirmCode(
      foundUser
    );
    const result = await emailManager.sendEmail(updateCode);
    return updateCode;

    // return false;

    // const result = await emailManager.sendEmail(foundUser);
    // return result;
  },
};
