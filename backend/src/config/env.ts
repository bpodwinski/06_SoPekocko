// Env variables
export const HOST: string = process.env.HOST || "0.0.0.0";
export const PORT: number = parseInt(process.env.PORT || "3000");
export const TOKEN: string =
  process.env.ACCESS_TOKEN_SECRET || "3P5DEkDn8yz0H9IgVU22";
export const DB_HOST: string =
  process.env.DB_HOST || "cluster0-3mlir.azure.mongodb.net";
export const DB_USER: string = process.env.DB_USER || "user98fhdg1";
export const DB_PASS: string = process.env.DB_PASS || "p3wn0uKhEPVD7soH";
