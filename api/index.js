const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const port = 6998;
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: 'messager-projets.idf.intranet',
    secure:false,
    ignoreTLS:true,
    port:25
});
  
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true})) //support encoded bodies

//LOCAL DEV
app.all('/*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-control-Allow-Methods", 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin, Content-type, Accept');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
      next();
    }
})

//get all users, to, 
app.get('/users', function(req, res) {
    connection.query("SELECT * FROM users", function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//create a new user
app.post('/users', function (req, res) {
  const insert = `INSERT INTO users ( nom_prenom, email) values ('${req.body.nom_prenom}', '${req.body.email}')`
  /** il y avait une erreur ici tu avais nommé "error" alors que ta callback a "err" en parametres 
   * 
   * Il faut bien comprendre comment fonctionne les callbacks et je te conseille le cours
   * de graphikart sur le sujet des promises : https://www.grafikart.fr/tutoriels/promise-async-await-875
   */
    connection.query(insert, function (err, result) {
          if(err) {
            console.log('mysql error', err);
            res.status(500);
            res.send(err);
          } else {
              console.log('mysql success', result);
              var mailOptions = {
                from: 'emilie.lebihan+oceane@smile.fr',
                to: req.body.email ,
                subject: 'Nouveau participant',
                text: 'Hey! tu as rejoint les participants au petit-déjeuner du vendredi !' 
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log('mail error', error);
                    res.status(500);
                    res.send(error);
                } else {
                    console.log('mail success', info.response);
                    res.send('Email sent: ' + info.response);
                }
              }); 
          }
        })
      });

//listen url with DELETE a user
  app.delete('/users/:userId', function (req, res) {
    const deleteItem = `DELETE FROM users WHERE id="${req.params.userId}";`
        connection.query(deleteItem, function (err, result) {
        if(!err)
        res.send('Deleted successfully');
        else 
        console.log(err);
    }) 
  });    
/**
 * 
 * Il faut que tu regardes comment gerer les erreurs avec des commandes comme "throw" et la classe "Error"
 * en gros laisser des console.log() dans ton code c'est quelque chose qui ne faut pas faire 
 * je te laisserai faire tes recherches 
 */
// send an email
  app.post('/send', (req, res) => {
    console.log('amazing!!')
    const emails = req.body.emails;
    var mailOptions = {
      from: 'emilie.lebihan+oceane@smile.fr',
      to:'emilie.lebihan@smile.fr' ,
      // to: emails.join(','),
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(500);
        res.send(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent: ' + info.response);
      }
    }); 
})    

// //Increment column /participation
// app.update('/users/:userId', (req, res) => {
//   console.log("it's ok")
//   const addParticipation = `UPDATE users SET participation = 'participation + 1' = WHERE id="${req.params.userId}"`
//   connection.query(update, function (err, result) {
//     if(!err)
//     res.send('Add successfully')
//     else 
//     console.log(err);
//   });
// });

connection.connect(function(err) {
    if (err) throw err;
    console.log("Hey! it's ok!");
});

app.listen(port, function() {
    console.log(`server is up on port ${port}!`);
})
