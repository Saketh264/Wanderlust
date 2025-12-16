const Listing= require("../models/listings")
const ExpressError = require("../utils/ExpressError");
const {listingSchema, reviewSchema} = require("../schema")
module.exports.index=async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listing/index", { allListings });
}
module.exports.createIndex=async (req, res) => {
  let url= req.file.path
  let filename=req.file.filename
  let result= listingSchema.validate(req.body)
  const newListing = new Listing(req.body.listing);
  newListing.owner= req.user._id
  newListing.image={url,filename}
  await newListing.save();
  req.flash("success","New listing created!")
  res.redirect("/listing");
}
module.exports.showIndex=async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
  if (!listing) throw new ExpressError(404, "Listing not found!");
  res.render("listing/show", { listing });
}
module.exports.editIndex=async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing not found for editing!");
  let orginalImage=listing.image.url
  orginalImage=orginalImage.replace("/upload","/upload/h_250")
  res.render("listing/edit", { listing ,orginalImage});
}
module.exports.updateIndex=async (req, res) => {
  const { id } = req.params;
  let listing=await Listing.findByIdAndUpdate(id, req.body.listing, {
    runValidators: true,
    new: true,
  });
  if(typeof req.file!=="undefined"){
  let url= req.file.path
  let filename=req.file.filename
  listing.image={url,filename}
  await listing.save()
}
   req.flash("success","Listing updated!")
  res.redirect(`/listing/${id}`);
}
module.exports.deleteIndex=async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","New listing deleted!")
  res.redirect("/listing");
}