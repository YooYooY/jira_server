import jwt, { SignOptions } from "jsonwebtoken";
import { isPlainObject } from "lodash";
import { InvalidTokenError } from "@/errors";

type TokenObj = Record<string, any>;

export const signToken = (payload: TokenObj, options?: SignOptions): string =>
  jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "180 days",
    ...options
  });

export const verifyToken = (token: string): TokenObj => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (isPlainObject(payload)) {
      return payload as TokenObj;
    }
    throw new Error("token is not a plainObject");
  } catch (error) {
    throw new InvalidTokenError();
  }
};
