'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const AnonymousUser = require('./app/models/anonymousUser');

mongoose.connect('mongodb://mongo/cinema');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || '8080';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: 'It works!'});
});

// route for AnonymousUser
router.route('/user/anonymous')
    .post((req, res) => {
        let aUser = new AnonymousUser();
        aUser.birthday = new Date(req.body.birthday);

        aUser.save(err => {
            if (err) {
                res.send(err);
            }

            res.json({message: 'Anonymous user created!'});
        });
    })
    .get((req, res) => {
        AnonymousUser.find((err, auser) => {
            if (err) {
                return console.error(err);
            }

            res.json(auser);
        });
    });

app.use('/api', router);

app.listen(port);
console.info('Started at port ' + port);
