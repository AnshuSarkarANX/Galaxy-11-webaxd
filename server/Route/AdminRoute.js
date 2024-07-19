const express = require("express");
const Route = express.Router();
const AdminController = require("../Controller/adminController");
const uploadImage = require("../middleware/uploadImg");
const Duplicate = require("../middleware/CheckDuplicate");

Route.get("/admin/registration", AdminController.registration);
Route.post(
  "/admin/registationCreate",
  uploadImage.single("image"),
  [Duplicate.CheckDuplicate],
  AdminController.register_create
);

Route.get("/admin/", AdminController.login);
Route.post("/admin/logincreate", AdminController.logincreate);

Route.get("/admin/logout", AdminController.logout);

Route.get(
  "/admin/dashboard",
  AdminController.adminauth,
  AdminController.dashboard
);

Route.get("/admin/product", AdminController.adminauth, AdminController.product);
Route.post(
  "/admin/Create-product",
  uploadImage.single("image"),
  AdminController.createProduct
);
Route.get("/admin/edit/:id", AdminController.adminauth, AdminController.edit);
Route.post(
  "/admin/update",
  uploadImage.single("image"),
  AdminController.update
);
Route.get("/admin/delete/:id", AdminController.deleteProduct);

Route.get("/admin/banner", AdminController.adminauth, AdminController.banner);
// Route.post('/admin/create-Banner',uploadImage.single('image'),AdminController.createBanner)
Route.post(
  "/admin/create-Banner",
  uploadImage.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),
  AdminController.createBanner
);

Route.get("/admin/deleteBanner/:id", AdminController.deleteBanner);

Route.get("/admin/offer", AdminController.adminauth, AdminController.offer);
Route.post(
  "/admin/create-offer",
  uploadImage.single("image"),
  AdminController.createoffer
);
Route.get("/admin/deleteOffer/:id", AdminController.deleteoffer);

module.exports = Route;
