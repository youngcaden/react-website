const models = require('./db');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');   //crypto the password
const email = require('./163email');

/*
	save administrator in /React/admins collection
*/
router.post('/add_admin',(req,res)=>{
	let md5 = crypto.createHash("md5");
	let newCryptoedPassword = md5.update(req.body.password).digest("hex");
<<<<<<< HEAD
	let newAdmin = new models.Admin({
=======
	let newAccount = new models.Admin({
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
		username: req.body.username,
		password: newCryptoedPassword,
        gender: req.body.gender,
		email: req.body.email,
		tag: req.body.tag
	});
<<<<<<< HEAD
	newAdmin.save((err)=>{
=======

	newAccount.save((err,data)=>{
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
		if(err){
			console.log(err);
			res.send({status:'false'});
		}
<<<<<<< HEAD
		// console.log('save admin in admins collection successfully')
		res.send({status:'true'});
=======
		else{
            console.log('save user in Mongodb Database successfully')
			res.send({status:'true'});
		}
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
	});
});
/*
	save common user in /React/users collection
*/
router.post('/add_user',(req,res)=>{
	let md5 = crypto.createHash("md5");
	let newCryptoedPassword = md5.update(req.body.password).digest("hex");
<<<<<<< HEAD
	let newUser = new models.User({
=======
	let newAccount = new models.User({
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
		username: req.body.username,
		password: newCryptoedPassword,
		gender: req.body.gender,
		email: req.body.email,
		tag: req.body.tag
	});
<<<<<<< HEAD
	newUser.save((err)=>{
		if(err){
			console.log(err);
			res.send({status:'false'});
			return;
		}
		// console.log('save user in users collection successfully')
		res.send({status:'true'});
=======

	newAccount.save((err,data)=>{
		if(err){
			console.log(err);
			res.send({status:'false'});
		}
		else{
			console.log('save user in Mongodb Database successfully')
			res.send({status:'true'});
		}
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
	});
});
/*
	validate admin is in /React/admins collection or not, via username or email to verify
*/
router.post('/verify_admin',(req,res)=>{

	models.Admin.find((err,data)=>{
		if(err){
            console.log('query admin in database failed');
			res.send(err);
		}
		else{
	
			let md5 = crypto.createHash("md5");
			let newCryptoedPassword = md5.update(req.body.password).digest("hex");
			console.log(data.length);

			if(req.body.username != ''){                 // validate via username
				for(var i = 0; i < data.length; i ++){
					if((req.body.username == data[i].username) && (newCryptoedPassword == data[i].password)){
						console.log('admin exists in mongodb database via username query.');
						break;   // when i=data.length-1 and then break,i would not execute ++
					}
				}

				if(i < data.length){
					res.send({status:'true',tag:data[i].tag,username:data[i].username})        //administrator's username and password matched
				}else{
					console.log('can not find this admin in database !');
					res.send({status:'false',tag:0,username:''});
				}
			}else{                                        //validate via email
				for(var i = 0; i < data.length; i ++){
					if((req.body.email == data[i].email) && (newCryptoedPassword == data[i].password)){
						console.log('admin exists in mongodb database via email query.')
						break;   //when i=data.length-1 and then break,i would not execute ++
					}
				}
	
				if(i < data.length){
					res.send({status:'true',tag:data[i].tag,username:data[i].username});       //administrator's username and password matched
				}else{
					console.log('can not find this admin in database !');
					res.send({status:'false',tag:0,username:''});
				}
			}
		}
	})
});
/*
	validate user is in /React/users collection or not, via username or email to verify
*/
router.post('/verify_user',(req,res)=>{

	models.User.find((err,data)=>{
		if(err){
            console.log('query user in database failed');
			res.send(err);
		}
		else{
<<<<<<< HEAD
=======
	
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
			let md5 = crypto.createHash("md5");
			let newCryptoedPassword = md5.update(req.body.password).digest("hex");
			console.log(data.length);

			if(req.body.username != ''){                 // validate via username
				for(var i = 0; i < data.length; i ++){
					if((req.body.username == data[i].username) && (newCryptoedPassword == data[i].password)){
						console.log('user exists in mongodb database via username query.');
						break;   // when i=data.length-1 and then break,i would not execute ++
					}
				}
<<<<<<< HEAD
=======

>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
				if(i < data.length){
					res.send({status:'true',tag:data[i].tag,username:data[i].username})        //common user's username and password matched
				}else{
					console.log('can not find this user in database !');
					res.send({status:'false',tag:0,username:''});
				}
			}else{                                        //validate via email
				for(var i = 0; i < data.length; i ++){
					if((req.body.email == data[i].email) && (newCryptoedPassword == data[i].password)){
						console.log('user exists in mongodb database via email query.')
						break;   //when i=data.length-1 and then break,i would not execute ++
					}
				}
	
				if(i < data.length){
					res.send({status:'true',tag:data[i].tag,username:data[i].username});     //common user's username and password matched
				}else{
					console.log('can not find this user in database !');
					res.send({status:'false',tag:0,username:''});
				}
			}
		}
	})
});
<<<<<<< HEAD
/*
	create an article and add it to /React/articles collection
*/
router.post('/add_article',(req,res)=>{
	// console.log(req.body.articleTitle, req.body.articleType);
	// console.log(req.body.starsNum,req.body.views)
	let newArticle = new models.Article({
		articleTitle: req.body.articleTitle, 
		articleType: req.body.articleType,
		content: req.body.content,
		author: req.body.author,
		createDate: req.body.createDate,
		starsNum: req.body.starsNum,
		views: req.body.views
	})
	newArticle.save((err)=>{
		if(err){
			console.log(err);
			res.send({status:'false'});
			return;
		}
		console.log('save article in articles collection successfully')
		res.send({status:'true'});
	})
})


/*
	create an board comment and add it to /React/comments collection
*/
router.post('/add_board_comment',(req,res)=>{
	const { username, avatar, commentDate, comment, likes,dislikes } = req.body
	// console.log(commentDate)
	let newComment = new models.Comment({
		username, avatar, commentDate, comment, likes,dislikes
	})
	newComment.save((err)=>{
		if(err){
			console.log(err);
			res.send({status:'false'});
			return;
		}
		// console.log('save comment in comments collection successfully')
		res.send({status:'true'});
	})
})
/*
	add likes for one board comment to /React/comments collection
*/
router.post('/board/comment_likes',(req,res)=>{
	const { _id } = req.body
	const likes = parseInt(req.body.likes) + 1
	// update the views and return the doc 
	models.Comment.findOneAndUpdate({_id:_id},{$set:{likes:likes}},{new: true}, (err,doc) => {
		if(err){
			console.log("add the likes num failed ");
			res.send({status:'false'});
		}else{
			// console.log(doc)
			res.send({status: 'true', comment: doc});
		}
	})
})
/*
	add dislikes for one board comment to /React/comments collection
*/
router.post('/board/comment_dislikes',(req,res)=>{
	const { _id } = req.body
	const dislikes = parseInt(req.body.dislikes) - 1
	// update the views and return the doc 
	models.Comment.findOneAndUpdate({_id:_id},{$set:{dislikes:dislikes}},{new: true}, (err,doc) => {
		if(err){
			console.log("add the dislikes num failed ");
			res.send({status:'false'});
		}else{
			// console.log(doc)
			res.send({status: 'true', comment: doc});
		}
	})

})


=======
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a



/*
	get all articles info from /React/articles collection
*/
router.get('/getAllArticles',(req,res)=>{
<<<<<<< HEAD
	models.Article.find((err,data)=>{
		if(err){
			console.log("query articles error");
			res.send({status:'false'});
		}else{
			res.send({status: 'true', allArticles: data});
		}
	})
})
/*
	get one article by _id from /React/articles collection
*/
router.get('/getOneArticle/:_id',(req,res)=>{
	const { _id } = req.params
	// console.log(parseInt(req.query.views+1))
	const views = parseInt(req.query.views) + 1
	// update the views and return the doc 
	models.Article.findOneAndUpdate({_id:_id},{$set:{views:views}},{new: true}, (err,doc) => {
		if(err){
			console.log("update the views failed, can't return the correct doc.");
			res.send({status:'false'});
		}else{
			// console.log(doc)
			res.send({status: 'true', article: doc});
		}
	})
	// models.Article.find({_id: _id},(err,data)=>{
	// 	if(err){
	// 		console.log("obtain one article by _id meets error");
	// 		res.send({status:'false'});
	// 	}else{
	// 		res.send({status: 'true', article: data});
	// 	}
	// })
})
/*
	get articles by category from /React/articles collection
*/
router.get('/getArticles/:_category',(req,res)=>{
	const { _category } = req.params
	// console.log(_category)
	models.Article.find({'articleType':_category},(err,doc)=>{
		if(err){
			console.log("get articles by articleType error");
			res.send({status:'false'});
		}else{
			// console.log(data)
			res.send({status: 'true', articles: doc});
		}
	})



})

=======
	models.Articles.find((err,data)=>{
		if(err){
			console.log("query articles error");
			res.send({status:'true'});
		}else{
			res.send(data);
		}
	})
})
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
/*
	get all board comments from /React/comments collection
*/
router.get('/getAllBoardComments',(req,res)=>{
<<<<<<< HEAD
	// console.log('hello')
	models.Comment.find({}).sort({commentDate: -1}).exec((err,data)=>{
		if(err){
			console.log("get board comments error");
			res.send({status:'false'});
		}else{
			res.send({status: 'true', comments: data});
=======
	models.Comments.find((err,data)=>{
		if(err){
			console.log("query board comments error");
			res.send({status:'true'});
		}else{
			res.send(data);
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
		}
	})
})
/*
	delete one article from /React/articles collection
*/
router.get('/deleteArticle',(req,res)=>{
	let articleID = req.query.articleID;
<<<<<<< HEAD
	models.Article.deleteOne({createDate:articleID},(err)=>{
=======
	models.Articles.deleteOne({createDate:articleID},(err)=>{
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
		if(err){
			console.log('delete article action failed');
			res.send({status:'false'});
		}else{
			res.send({status:'true'});
		}
	})
})
/*
<<<<<<< HEAD
	delete one board comment from /React/comments collection
=======
	delete one comment from /React/comments collection
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
*/
router.get('/deleteBoardComment',(req,res)=>{
	let commentID = req.query.commentID;
	models.Comments.deleteOne({commentTime: commentID},(err)=>{
		if(err){
			console.log('delete one board comment failed');
			res.send({status:'false'});
		}else{
			res.send({status:'true'});
		}
	})
})






/*
	save all comments in comments collection
*/
router.get('/save_comments',(req,res)=>{
        /* console.log(req); */
	let newComments = new models.Comments({
		comment: req.query.newcomment,
		username: req.query.username,
		date: req.query.date
	});

	newComments.save((err,data)=>{
		if(err){
			res.send({status:'false'});
		}
		else{
			console.log('save comments in Mongodb Database successed!');
			res.send({status:'true'});
		}
	});
});
	/*
		update the comment in comments collection
	*/
router.get('/update_comments',(req,res)=>{

        let condition = {
			comment: req.query.oldcomment,
			username: req.query.username,
        };
        let update = {$set:{comment:req.query.newcomment,date:req.query.date}};

	models.Comments.update(condition,update,function(err){
		if(err){
                        console.log(err);
			res.send({status:'false'});
		}
		else{
			console.log('update successfully');
		//	res.send({staus:'true'});
                        res.send({status:'true'});
		}
	});
	
});
	/*
		query all comments from comments collection in Mongodb Database
	*/
router.post('/query_comments',(req,res)=>{
        // console.log(req);
	/*
	let newComments = new models.Comments({
		comment: req.body.newComment,
		username: req.body.username,
		date: req.body.date
	});
	*/
	models.Comments.find({}).sort({date:-1}).exec(function(err,data){
		if(err){
                        console.log(err);
			res.send(err);
		}
		else{
		//	console.log(data);
		//	res.send({staus:'true'});
                        res.send(data);
		}
	});
});
	/*
		delete one comment by date when clicking the delete icon
	*/
router.get('/delete_comment',(req,res)=>{
        console.log(req.query.date);
	models.Comments.remove({date:req.query.date},(err,data)=>{
		if(err){
			res.send({status:'false'});
		}
		else{
			console.log('delete one comment in Mongodb Database successed!');
			res.send({status:'true'});
		}
	});
});


router.get('/send_emails',(req,res)=>{
        console.log('get the email request ~~~~');

	email.send('yonnsongLee@163.com');

});


module.exports = router;
