const mongoose = require("mongoose");
const review = require("./review");
const { type } = require("../schema");
const { ref } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
image: {
  filename: String,
  url: {
    type: String,
    set: (v) =>
      v === ""
        ? "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg"
        : v,
  },
},
  price: Number,
  location: String,
  country: String,
  reviews:[{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User"
  }
});
listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await review.deleteMany({_id:{$in:listing.reviews}})
  }
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;