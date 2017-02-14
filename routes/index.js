var express = require('express');
var utility = require('utility');
var superAgent = require('superagent');
var cheerio = require('cheerio');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/helloworld', function (req, res) {
  res.render('helloworld', {title: 'Hello World!'});
});

router.get('/userlist', function (req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function (err, items) {
    res.render('userlist', {
      title: '用户列表',
      "userlist": items
    });
  });
});

router.get('/newuser', function (req, res) {
  res.render('newuser', {title: 'Add New User'});
});

router.get('/updateuser', function (req, res) {
  var id = req.query.id;
  if (!(id && id.length > 20)) {
    return;
  }

  var db = req.db;
  var collection = db.get('usercollection');
  // 先查询
  collection.find({"_id": id}, {}, function (err, items) {
    if (items && items[0]) {
      res.render('updateuser', {
        title: 'Update User',
        id: id,
        username: items[0].username,
        useremail: items[0].email
      });
    }
  });
});

router.post('/updateuser', function (req, res) {
  var userName = req.body.username;
  if (!userName) {
    res.send("用户名不能为空！");
    return;
  }

  var userEmail = req.body.useremail;
  if (!userEmail) {
    res.send("用户邮箱不能为空！");
    return;
  }

  var objDocument = {
    username: userName,
    email: userEmail
  };

  var userPwd = req.body.userpwd;
  if (userPwd) {
    userPwd = utility.md5(userPwd);
    objDocument.password = userPwd;
  }

  var db = req.db;
  var collection = db.get('usercollection');

  collection.update({_id: req.body.id}, objDocument, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      // If it worked, set the header so the address bar doesn't still say /updateuser
      res.location("userlist");
      // And forward to success page
      res.redirect("userlist");
    }
  });
});

router.post('/adduser', function (req, res) {
  var userName = req.body.username;
  if (!userName) {
    res.send("用户名不能为空！");
    return;
  }

  var userEmail = req.body.useremail;
  if (!userEmail) {
    res.send("用户邮箱不能为空！");
    return;
  }

  var userPwd = req.body.userpwd;
  if (!userPwd) {
    res.send("用户密码不能为空！");
    return;
  }

  userPwd = utility.md5(userPwd);

  var db = req.db;
  var collection = db.get('usercollection');
  collection.insert({
    'username': userName,
    'email': userEmail,
    'password': userPwd
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      // If it worked, set the header so the address bar doesn't still say /adduser
      res.location("userlist");
      // And forward to success page
      res.redirect("userlist");
    }
  });
})

router.get('/removeuser',function (req,res) {
  var id = req.query.id;
  if (!(id && id.length > 20)) {
    return;
  }

  var db = req.db;
  var collection = db.get('usercollection');
  collection.remove({"_id": id}, function (err, items) {
    if (err) {
      console.log(err)
      return
    }
    res.redirect("userlist");
  });
});

router.get('/spider', function (req, res, next) {
  superAgent.get('https://cnodejs.org/').end(function (err, sres) {
    if (err) {
      return next(err);
    }

    var $ = cheerio.load(sres.text);
    var items = [];
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      items.push({
        title: $element.attr('title'),
        href: $element.attr('href')
      });
    });

    res.send(items);
  })
});

module.exports = router;
