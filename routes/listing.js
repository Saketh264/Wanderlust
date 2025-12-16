const express = require("express")
const router= express.Router()
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing}= require("../middleware.js")
const listingController=require("../controllers/listing.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage})
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("listing[image]"),wrapAsync(listingController.createIndex));
router.get("/new", isLoggedIn,(req, res) => {
  res.render("listing/new.ejs");
});
router.route("/:id")
.get(wrapAsync(listingController.showIndex))
.put(isLoggedIn,isOwner,validateListing, upload.single("listing[image]") ,wrapAsync(listingController.updateIndex))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteIndex));
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.editIndex));
module.exports = router;