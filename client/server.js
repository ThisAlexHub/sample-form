const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const fetch = require('node-fetch');
const data = require('../src/data.json');
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})


app.get('/api/supervisors', (req, res) => {

    fetch('https://609aae2c0f5a13001721bb02.mockapi.io/lightfeather/managers')
    .then(response => response.json())
    .then((data) => {

        let result = [];

        for (let object of data){

            if (isNaN(parseInt(object.jurisdiction))){
                let newObject = {"jurisdiction": object.jurisdiction, "lastName": object.lastName , "firstName": object.firstName};
                result.push(newObject);
            }
        }

        result.sort(function(a,b) {
            if (a.jurisdiction === b.jurisdiction) {
                if (a.lastName === b.lastName) {
                    return (a.firstName < b.firstName) ? -1 : (a.firstName > b.firstName) ? 1 : 0;
                } else {
                    return (a.lastName < b.lastName) ? -1 : 1;
                }
            } else {
                 return (a.jurisdiction < b.jurisdiction) ? -1 : 1;
            }
       });


       let superviseArr = [];
       for (let object of result){
            let s = object.jurisdiction + " - " + object.lastName + ", " + object.firstName;

            superviseArr.push(s);
        }

        res.status(200).json(superviseArr);
    });
    
});
  


app.post('/api/submit', (req, res) => {
    const { firstName , lastName, superviser, phonenumber, email} = req.body
    if (!firstName && !lastName && !superviser) {
  
        res.status(400).send(`${firstName} ${lastName} has been added`);
    }

    let newPhoneNumber = phonenumber ? phonenumber : "";
    let newEmail = email ? email : "";
    let user = {"firstname": firstName, "lastname": lastName, "email": newEmail, "phonenumber": newPhoneNumber, "superviser": superviser};
       
    data.push(user);

    fs.writeFile("../src/data.json", JSON.stringify(data), err => {
        if (err) throw err; 
        console.log("Done writing"); 
    });
    
    res.status(200).send({'status':'success'});

  });
  
  
app.listen(port, () => console.log(`Listening on port ${port}`));


