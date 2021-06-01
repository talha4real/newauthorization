const express = require('express');

const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = "91075237360-933i7g3j0gu3eh2ejuuq9073cd1bmj33.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

var cookieParser = require('cookie-parser')

const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 5000;

const app = express();

//Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

app.get('/' , (req, res) =>{
    res.render('index');
  
})
app.get('/login' , (req, res) =>{
    res.render('login');
  
})
app.post('/login',(req,res)=>{
    let token = req.body.token;
    console.log(token);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload);
      }
      verify().then(()=>{
          res.cookie('session-token',token);
          res.send('success');
      }).catch(console.error);
})
app.get('/profile' ,(req, res) =>{
    res.render('protectedroute.ejs');
  
})
app.get('/protectedroute' ,(req, res) =>{
    let user = req.user;
    res.render('profile',{user});
  
})

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
})