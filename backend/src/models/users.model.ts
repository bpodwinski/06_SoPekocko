import * as mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";

const UserSchema: mongoose.Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model("Users", UserSchema);
