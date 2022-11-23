import bcrypt from "bcrypt";

export default class PasswordHelper {
  static async hashPassword(password: string, saltRounds = 10) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.error("Error hashing password");
      return null;
    }
  }

  static async comparePassword(password: string, hash: string) {
    try {
      return await bcrypt.compare(password, hash);
    } catch (err) {
      console.error("Error comparing password");
      return null;
    }
  }
}
