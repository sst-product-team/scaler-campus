import dotenv from "dotenv";

dotenv.config();

class Env {
  public static readonly port = Number(process.env.PORT) || 2404; // default port to listen
  public static readonly dbUrl = process.env.DB_URL ?? ""; // database url
  public static readonly ENCRYPT_SALT = Number(process.env.ENCRYPT_SALT) || 10; // number of salt rounds for hashing
  public static readonly AUTH_SENDER_EMAIL =
    process.env.AUTH_SENDER_EMAIL ?? ""; // email address of the sender
  public static readonly AUTH_SENDER_PASSWORD =
    process.env.AUTH_SENDER_PASSWORD ?? ""; // password of the sender
  public static readonly PASSWORD_CHARSET =
    process.env.PASSWORD_CHARSET ??
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/"; // charset for password generation
  public static readonly JWT_SECRET =
    process.env.JWT_SECRET ?? "scaler-secret-key-123"; // secret key for jwt
  public static readonly JWT_EXPIRY = process.env.JWT_EXPIRE ?? "3d"; // expiry time for jwt
  public static readonly MONGO_URI =
    process.env.MONGO_URI ?? "mongodb://localhost:27017/scaler-campus"; // expiry time for jwt
}

export default Env;
