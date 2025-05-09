import { v4 as uuidv4 } from "uuid";

export const generateNonce = (): string => {
  return uuidv4();
};
