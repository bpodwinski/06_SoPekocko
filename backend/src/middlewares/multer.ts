import * as multer from "multer";
import * as path from "path";

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg,jpeg or png"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./img");
  },
  filename: (req: any, file: any, cb: any) => {
    const basename = path.basename(
      file.originalname.split(" ").join("_"),
      path.extname(file.originalname)
    );
    const extension = path.extname(file.originalname);
    cb(null, basename + "_" + Date.now() + extension);
  },
});

export default multer({ storage: storage, fileFilter: fileFilter });
