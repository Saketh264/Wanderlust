const express = require("express")
const router= express.Router({mergeParams:true})
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn,isReviewOwner}=require("../middleware.js")
const reviewController=require("../controllers/review.js")
//reviews
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
//delete review
router.delete("/:reviewId",isReviewOwner,wrapAsync(reviewController.destroyReview))
module.exports=router