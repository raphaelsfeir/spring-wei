import {environment} from "./environments/environment";

var express = require('express');
var bodyParser = require('body-parser');
var sgMail = require('@sendgrid/mail');
var schedule = require('node-schedule-tz');
var https = require('https');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log('API lancée sur le port ' + port);
});


/* ***************************

          API SENDMAIL

 ******************************/
const SENDGRID_API_KEY = environment.sendgridAPI;
sgMail.setApiKey(SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers("{{", "}}");
app.post('/sendmail', (req,res) => {
  try {
    req.body = JSON.parse(Object.keys(req.body)[0])
  } catch (e) {
    req.body = req.body
  }
  console.log(req.body);
  const msg = {
    from: {
      name: "Nom de l'expéditeur",
      email: "Adresse mail de l'expéditeur"
    },

    templateId: 'Identifiant du template sendgrid',
    personalizations: [
      {
        to: [
          {
            email: req.body.email
          }
        ],
        dynamic_template_data: {
          prenom: req.body.prenom,
          pseudo: req.body.pseudo,
          password: req.body.password
        }
      }
    ]
  };
  sgMail.send(msg).then(
    () => res.status(200).send({message: 'Mail envoyé !'})
  )
    .catch(
      (err) => res.status(500).send({message: err})
    )
});


/* ***************************

          API NOTIFICATION

 ******************************/

var planifications = [];
const getJour = function(i) {
  const semaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  return semaine[i];
};
const removeFromPlan = function(id) {
  planifications = planifications.filter(function(p) {
    return p.id !== id
  })
};

app.post('/notifications', (req, res) => {
  try { // Normalisation
    req.body = JSON.parse(Object.keys(req.body)[0])
  } catch (e) {
    req.body = req.body
  }
  console.log(req.body);

  const DELAI = 10;
  // Petit calcul
  if (req.body.minute < DELAI ) {
    req.body.heure -= 1;
    req.body.minute = (parseInt(req.body.minute) + 60).toString();
  }
  console.log('Notification à ' + req.body.heure + 'h' + (parseInt(req.body.minute) - DELAI).toString());
  planifications.push({
    id: req.body.id,
    titre: req.body.titre,
    jour: getJour(req.body.jour),
    heure: req.body.heure,
    minute: req.body.minute - DELAI
  });
  const job = schedule.scheduleJob(req.body.id, '0 ' + (req.body.minute - DELAI).toString() + ' ' + req.body.heure + ' * * ' + req.body.jour, 'Europe/Paris', () => {
    console.log(req.body.titre + ' dans ' + DELAI + ' minutes !');
    const postData = JSON.stringify({
      "notification":{
        "title":"SpringWEI",
        "body":req.body.titre + " démarre dans " + DELAI + " minutes !",
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
      },
      "data":{
        "landing_page":"/auth/login?open=wei/activites",
        "title": "Prépare toi !"
      },
      "to":"/topics/activites",
      "priority":"high",
      "restricted_package_name":""
    });
    const options = {
      hostname: 'fcm.googleapis.com',
      path: '/fcm/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=' + environment.notificationAuth
      }
    };

    const post = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`);
    });
    post.write(postData);
    post.end();
    removeFromPlan(req.body.id);
    job.cancel();
  });
  res.status(200).send({message: 'Notification planifiée !'});
});

app.delete('/notifications/:id', (req, res) => {
  var oldJob = schedule.scheduledJobs[req.params.id];
  if(oldJob) {
    console.log('Suppression de la notification: ' + req.params.id);
    removeFromPlan(req.params.id);
    oldJob.cancel();
    res.status(200).send({message: 'Notification annulée'});
  } else {
    res.status(500).send({message: 'La notification n\'existe pas'});
  }
});
app.get('/notifications', (req, res) => {
  res.status(200).send(planifications);
});
