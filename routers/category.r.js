const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.c.js");
const multer = require("multer");
const uploadSingle = require("../middlewares/uploadSingle");
const { verifyAdmin } = require("../middlewares/authorize.js");
const upload = multer();

// Route to get all categories
router.get("/", categoryController.getCategories);

// Route to get category details by ID
router.get("/:id", verifyAdmin, categoryController.getCategoryDetail);

// Route to create a new category
router.post(
  "/",
  verifyAdmin,
  upload.single("thumbnail"),
  uploadSingle,
  categoryController.createCategory
);

// Route to update an existing category by ID
router.put(
  "/:id",
  verifyAdmin,
  upload.single("thumbnail_url"),
  uploadSingle,
  categoryController.updateCategory
);

// Route to delete a category by ID
router.delete("/:id", verifyAdmin, categoryController.deleteCategory);

// Route to get products in a specific category
router.get("/products/:id", categoryController.getProductsInCategory);

module.exports = router;
