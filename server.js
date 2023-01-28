const express = require('express');
const app = express();
const env = process.env.NODE_ENV || 'development';
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const port = 3000;
const { sequelize } = require('./models');
const router = express.Router();


sequelize.sync({force:false})
	.then(()=>{
		console.log('sequelize connection success');
	})
	.catch((err)=>{
		console.log(err.name);
	});

// rds connection without sequelize

// const connection = mysql.createConnection({
// 	host     : process.env.RDS_HOST,
//   	user     : process.env.USER_NAME,
//   	password : process.env.RDS_PASSWORD,
//   	port     : process.env.RDS_PORT
//   });
// connection.connect(function(err) {
// 	if (err) {
// 	  console.error('Database connection failed: ' + err.stack);
// 	  return;
// 	}
  
// 	console.log('Connected to database.');
// });
  
// connection.end();
app.use(bodyParser.json());

// routing
const noticeRouter = require('./routes/notice');
const profileRouter = require('./routes/profile');
const oauthRouter = require('./routes/oauth');
const authRouter = require('./routes/auth');

app.use('/notice',noticeRouter);
app.use('/profile',profileRouter);
app.use('/oauth',oauthRouter);
app.use('/auth',authRouter);

//404
app.all('*', (req,res,next)=>{
	res.status(404).json({ status:'fail',message: '404 Not Found'})
})

//error handling (4 parameters -err/req/res/next)
app.use((err, req, res, next) => {
	// 템플릿 엔진에서 message 변수 사용 가능
	res.locals.message = err.message; 
	// 템플릿 엔진에서 error 변수 사용가능
	res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
	res.status(err.status || 500);
	res.render('error');
  });
  
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
