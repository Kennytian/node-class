var express = require('express');
var utility = require('utility');
var superagent = require('superagent');
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
        username: items[0].username,
        useremail: items[0].email,
        password: items[0].password
      });
    }
  });


  // 后更新

  // collection.update({'_id': id}, {'username': 'testuser1-u'});
  // or
  // collection.save


  /*
   * db.col.save({
   "_id" : ObjectId("56064f89ade2f21f36b03136"),
   "title" : "MongoDB",
   "description" : "MongoDB 是一个 Nosql 数据库",
   "by" : "Runoob",
   "url" : "http://www.runoob.com",
   "tags" : [
   "mongodb",
   "NoSQL"
   ],
   "likes" : 110
   })
   *
   * */

})

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

router.get('/spider', function (req, res, next) {
  superagent.get('https://cnodejs.org/').end(function (err, sres) {
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
