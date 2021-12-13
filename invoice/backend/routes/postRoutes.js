const express = require('express');
const router = express.Router();
const multer = require('multer')
const mongoose = require('mongoose')
const nodemailer=require('nodemailer')
const fs = require('fs')
const moment = require('moment')
const jwt=require("jsonwebtoken");
const jwtSecret="asd889asdas5656asdas887";
// router.use(express.static("uploads"));
const niceInvoice = require('./index')
//dbconnection 
const db = "mongodb://localhost:27017/invoice";
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected")
  }
  catch (err) {
    console.log(err.message);
  }
}
connectDB();
//end
const invoicemodel = require('../db/InvoiceSchema')
const settingmodel = require('../db/settingsSchema');
const registermodel = require('../db/RegisterSchema')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, './upload/')
//   },
//   filename: (req, file, cb) => {
//       cb(null, req.body.file + "-" + Date.now() + +path.extname(req.body.file.originalname))
//   }
// })
function autenticateToken(req,res,next){
  const authHeader=req.headers['authorization'];
  const token=authHeader && authHeader.split(' ')[1];
  console.log(token)
  if(token==null){
      res.json({"err":1,"msg":"Token not match"})
  }
  else {
      jwt.verify(token,jwtSecret,(err,data)=>{
          if(err){
              res.json({"err":1,"msg":"Token incorrect"})
          }
          else {
              console.log("Match")
              next();
          }
      })
  }
}
let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'samsonar4050@gmail.com',
      pass: 'Samsonar40'
  }
});
router.post("/login",(req,res)=>{
  let email=req.body.email;
  let password=req.body.password;
  registermodel.findOne({email:email,password:password},(err,data)=>{
      if(err){
          res.json({"err":1,"msg":"Email or password is not correct"})
      }
      else if(data==null)
      {
          res.json({"err":1,"msg":"Email or password is not correct"})
      }
      else {
          let payload={
              uid:email
          }
          const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
          res.json({"err":0,"msg":"Login Success","token":token})
      }
  })
})
router.post("/adduser",(req,res)=>{
  // console.log(req.body)
  let ins = new registermodel({ name: req.body.name, mobile: req.body.mobile,email:req.body.email,password:req.body.password });
  ins.save((err) => {
      if (err) {
          console.log(err)
          res.send("Already Added")
          // console.log("Already added")
      }
      else {
          res.send("ok")
          // console.log("ok")
      }
  })



})
router.post("/add", (req, res) => {

  
  for (let i = 0; i < req.body.item.length; i++) {
    req.body.item[i].item = i + 1
  }
  console.log(req.body.item)
  
  let tot = 0;
  let getNumber = str => {
    if (str.length !== 0) {
      var num = str.replace(/[^0-9]/g, '');
    } else {
      var num = 0;
    }

    return num;
  }

  for (let i = 0; i < req.body.item.length; i++) {
    let price = 0;

    price = req.body.item[i].price;
    tot = tot + ((price - (price * getNumber(req.body.item[i].discount) / 100)) * req.body.item[i].quantity)
  }
  console.log(tot)

  // data[0].invoice_number+1

  settingmodel.findOne({ user:req.body.user}, (err, data1) => {
    if (err) throw err;
    invoicemodel.find({}, (err, data) => {
      if (err) throw err;
      let ins = new invoicemodel({ user: req.body.user.toString(), item: req.body.item, status: "unpaid", receiver_name: req.body.name, title: "", from_address: data1.from_address, to_address: req.body.address, invoice_amount: tot, logo: "", invoice_number: data[0].invoice_number + 1, invoice_date: moment().format('L').toString(), due_date: req.body.date.toString() });
      ins.save((err) => {
        if (err) {
          console.log(err)
  
        }
        else {
  
          console.log("ok")
        }
      })
  
    }).sort({ $natural: -1 })
  

  })






  




  res.send("ok")

})

router.post("/generate_pdf", (req, res) => {

  invoicemodel.findOne({ _id: req.body.id }, (err, data) => {
    if (err) throw err;
    // invoice_no=data[0].invoice_number;
    // console.log(data[0].invoice_number)
    // res.json({ "err":0,'data': data })
    // console.log(invoice_no)

    let name = data.invoice_number;

    console.log(data.item)
    // console.log(item)
    const invoiceDetail = {
      shipping: {
        name: data.receiver_name,
        address: data.to_address,
        city: "",
        state: "",
        country: "",
        postal_code: 0000
      },
      items: data.item,
      subtotal: data.invoice_amount,
      total: data.invoice_amount,
      order_number: data.invoice_number,
      status: data.status,
      header: {
        company_name: "Invoice",
        company_logo: "logo.png",
        company_address: data.from_address
      },
      footer: {
        text: ""
      },
      currency_symbol: "INR ",
      date: {
        billing_date: data.invoice_date,
        due_date: data.due_date,

      }
    };
    niceInvoice(invoiceDetail, "./pdf/" + name +".pdf");



    let mailDetails = {
      from: 'samsonar4050@gmail.com',
      to: 'sonarsaurabh1@gmail.com',
      subject: 'InvoiceGenerator',
      html:'<body><h4>Invoice Copy</h4><body>',
      attachments: [
          {
              filename: 'invoice.pdf',
              path: './pdf/'+name+".pdf",
              cid: 'invoice.pdf'
          }
      ]
  };

  mailTransporter.sendMail(mailDetails, function(err, data) {
      if(err) {
          console.log(err)
          // console.log('Error Occurs');
      } else {
          console.log('Email sent successfully');
      }
  });
  
  })

  // res.json({ "err":0,'data': data })


  res.send("ok")
})
router.get("/fetch/:_id", (req, res) => {
  //  res.download('./dynamicq.pdf')
  let id = req.params._id
  console.log(id)
  invoicemodel.findOne({ _id: id }, (err, data) => {
    if (err) throw err;
    // console.log
    res.download("./pdf/" + data.invoice_number + ".pdf")
    setTimeout(function () {
      fs.unlink("./pdf/" + data.invoice_number + ".pdf", function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
    }, 10000)

  })

})
router.post("/update_status", (req, res) => {
  console.log(req.body.status)
  console.log(req.body.id)
  //  invoicemodel.findOne({stat})
  if (req.body.status == "unpaid") {
    invoicemodel.updateOne({ _id: req.body.id }, { $set: { status: "unpaid" } }, (err) => {
      if (err) throw err;
      else {
        res.send("ok")
      }
    })
  }
  else {
    invoicemodel.updateOne({ _id: req.body.id }, { $set: { status: req.body.status } }, (err) => {
      if (err) throw err;
      else {
        res.send("ok")
      }
    })
  }

})
router.post("/delete_data", (req, res) => {
  console.log(req.body.id)
  invoicemodel.deleteOne({ _id: req.body.id }, (err) => {
    if (err) throw err
    console.log("no err")
  })
})
router.get("/fetch_invoice_data/:user", (req, res) => {
  // res.download('./dynamicq.pdf')
  console.log("ok")
  console.log(req.params.user)
  invoicemodel.find({ user:req.params.user.toString()}, (err, data) => {
    if (err) throw err;
    console.log(data)
    res.json({ "err": 0, 'data': data })

  })

})

router.post("/update_settings/:user",(req, res)=> {
  settingmodel.find({ user: req.params.user }, (err, data) => {
    if (err) throw err;
    console.log(data)
    if(data==""){
      let ins = new settingmodel({ user:req.params.user,from_address:req.body.address  });
  ins.save((err) => {
    if (err) {
      console.log(err)

    }
    else {

      console.log("ok")
    }
  })
    }
    else{
      // console.log("false")
      settingmodel.updateOne({ user:req.params.user }, { $set: { from_address: req.body.address} }, (err) => {
        if (err) throw err;
        else {
          // res.send("ok")
          console.log("ok")
        }
      })
    }
   

  })
  
  // let upload=multer({storage:storage}).single('myfile');
  //   upload(req,res,(err)=>{
  //      if(!req.body.file){
  //         //  res.send("Please select a file");
  //         console.log("Please select a file")
  //      }
  //      else if(err){
  //         //  res.send("SOme uploading error");
  //         console.log("SOme uploading error")
  //      }
  //      else {
  //         //  res.send(`You uploaded the file : <hr/> <img src="${req.file.filename}" width="300" height="300"/>`);
  //         // res.send("ok")
  //         console.log("ok done" )
  //      }
  //   })
    res.send("ok")
});
router.get("/dashboard/:user",(req,res)=>{
  console.log(req.params.user)
  invoicemodel.find({user:req.params.user},(err,data)=>{
    if (err) throw err;
    console.log(data.length)
    let tot=0
    for(let i=0;i<data.length;i++){
      if(data[i].status=="unpaid"){
        tot=tot+data[i].invoice_amount;
      }
      
    }
    res.json({"total":tot,"invoice":data.length})
  })
})

module.exports = router;