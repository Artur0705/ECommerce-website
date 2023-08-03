const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();

  const productImagesPath = "public/images/products";
  if (!fs.existsSync(productImagesPath)) {
    fs.mkdirSync(productImagesPath, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300, { fit: "inside" }) // Add fit option to preserve aspect ratio
        .toFormat("jpeg")
        .jpeg({ quality: 80 }) // Decrease quality to 80
        .toFile(`${productImagesPath}/${file.filename}`);
      fs.unlinkSync(`${productImagesPath}/${file.filename}`);
    })
  );
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();

  const blogImagesPath = "public/images/blogs";
  if (!fs.existsSync(blogImagesPath)) {
    fs.mkdirSync(blogImagesPath, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300, { fit: "inside" }) // Add fit option to preserve aspect ratio
        .toFormat("jpeg")
        .jpeg({ quality: 80 }) // Decrease quality to 80
        .toFile(`${blogImagesPath}/${file.filename}`);
      fs.unlinkSync(`${blogImagesPath}/${file.filename}`);
    })
  );
  next();
};

module.exports = { uploadPhoto, productImgResize, blogImgResize };
