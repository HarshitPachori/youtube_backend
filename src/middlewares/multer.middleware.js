import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Math.round(Math.random() * 1e9));
  },
});

export const upload = multer({ storage });
