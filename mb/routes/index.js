var express = require('express');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Mini Messageboard", messages: messages  });
});

/* GET new form page */
router.get("/new", function(req, res, next) {
  res.render("form", { title: "New Form" })
});

/* POST data from new form */
router.post("/new", function(req, res, next) {
  const messageUser = req.body.messageUser;
  const messageText = req.body.messageText;
  
  // Add the newest message submission to our data array
  messages.push({ text: messageText, user: messageUser, added: new Date() });

  // Send users back to index page after submitting a message
  res.redirect("/");
});

module.exports = router;
