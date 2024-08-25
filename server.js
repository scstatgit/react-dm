const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
        'id': 1,
        'image': 'https://placehold.co/60x60/png',
        'name': '홍길동', 
        'birthday': '961222',
        'gender': '남자',
        'job': '대학생'
        },
        {
        'id': 2,
        'image': 'http://picsum.photos/id/427/60/60',
        'name': '김철수', 
        'birthday': '960301',
        'gender': '남자',
        'job': '직업군인'
        },
        {
        'id': 3,
        'image': 'http://picsum.photos/id/428/60/60',
        'name': '이영희', 
        'birthday': '960509',
        'gender': '여자',
        'job': '직장인'
        }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));