const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  Verify,
  ResetPassword,
} = require("../controllers/AuthController");
const { PurchseCredits } = require("../controllers/PurchaseController");
const { Credits } = require("../controllers/CreditsController");
const { DetuctCredits } = require("../controllers/DetuctCredits");
const { Contact } = require("../controllers/ContactController");
const {
  PlanController,
  PlanViewController,
} = require("../controllers/PplanContorller");
const {
  CreateOrder,
  CapureOrder,
} = require("../controllers/PaymentController");
const { Translate } = require("../controllers/tools/PDFTranlateController");
const { Text } = require("../controllers/tools/PDFToTextContoller");
const {Speech} = require("../controllers/tools/PDFToSpeech")
const {check} = require("../controllers/chec")

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });



router.get("/verify", Verify);
router.post("/purchase-credits", PurchseCredits);
router.post("/get-credits", Credits);
router.post("/deduct-credits", DetuctCredits);
router.post("/contact", Contact);
router.post("/plan", PlanController);
router.get("/plan", PlanViewController);

//* Payment Routes *//
router.post("/orders", CreateOrder);
router.post("/orders/:orderID/capture", CapureOrder);

//*Tools Routes *//
router.post("/translate-pdf", upload.single("file"), Translate);
router.post("/pdf-to-text", upload.single("pdf"), Text);
router.post("/pdf-to-speech", upload.single("pdf"), Speech);

router.post("/check", check)


//*User Routes *//
router.post("/register", Register);
router.post("/login", Login);
router.post("/reset-password", ResetPassword);

module.exports = router;
