import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Пожалуйста, напишите ФИО"],
    },
    email: {
      type: String,
      required: [true, "Пожалуйста, напишите Email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Пожалуйста, введите пароль"],
      minLenght: [6, "Длина пароля должна быть не меньше 6 символов"],
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    linkedMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", UserSchema);
