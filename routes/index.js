var express = require('express');
var router = express.Router();
var cors = require('cors');
const app = express();
app.use(cors());
const fs = require('fs');
const CONTACT_FILE = 'contact.txt';


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Hannanel'
  });
});

router.post('/', function (req, res) {
  console.log(req.body);
  const reqb = req.body;
  const o = {
    fname: reqb.first,
    lname: reqb.last,
  }
  console.log(o);
  fs.readFile(CONTACT_FILE, function (e, d) {
    console.log(d);
   const contactsArray = d.length > 0 ? JSON.parse(d.toString()) : [];
  contactsArray.push(o);

    fs.writeFile(CONTACT_FILE, JSON.stringify(contactsArray), function (e) {
      if (e) {
        console.log(e);
        res.status(400).send('Error in saving');
      } else {
        res.redirect('/');
      }
    })
  })

 ;
});

module.exports = router;