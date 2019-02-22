var express = require('express');
var router = express.Router();
var path = require('path');
var gp = require('./gp')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/gpmsg', function(req, res, next) {
	const id = req.query.id
	gp.start(id).then(stock=>{
		res.send(stock)
	})
});

router.get('/getall', function(req, res, next) {
	gp.getall().then(stock=>{
		res.send(stock)
	})
});
// router.get('/id', function(req, res, next) {
	
// });
router.get('/getfile', function(req, res, next) {
	console.log(222)
	const path1 =path.join(__dirname, '../public/javascripts')
	console.log(path1)
	console.log(2)
  	res.sendFile(path.join(__dirname, '../public/javascripts/')+'a.js')
});
// router.get(/^\/([^\/]*\/?)*/, function(req, res, next) {
// 	console.log(req.originalUrl)
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
