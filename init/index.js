const mongoose=require("mongoose")
const initData=require("./data.js")
const Listings=require("../models/listings.js")
main().then(()=>{
    console.log("DB connected")
})
.catch((err)=>{console.log(err)})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}
const initDB= async()=>{
    await Listings.deleteMany({})
    initData.data=initData.data.map((obj)=>({...obj,owner: '6852bab3762ef9ae8f43f222'}))
    await Listings.insertMany(initData.data);
    console.log("data is inatialized")
}
initDB();