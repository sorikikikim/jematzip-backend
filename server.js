const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const restaurantRouter = require('./routes/restaurant.router');
require('dotenv').config();

const app = express();

const { default: mongoose } = require('mongoose');

app.use(express.json());
app.use((req, res, next) => {
    const start = Date.now();
    console.log(`start: ${req.method} ${req.url}`);
    next();
    const diffTime = Date.now() - start;
    console.log(`end: ${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('mongodb connect!');
    })
    .catch((err) => console.log(err));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/restaurant', restaurantRouter);

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});

const xlsx = require('xlsx');
const Restaurant = require('./models/restaurant.model');

// Excel 파일에서 데이터 읽기
const workbook = xlsx.readFile('./data/restaurant-data.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// 읽은 데이터를 MongoDB에 삽입
Promise.all(
    jsonData.map(async (data) => {
        try {
            const existingRestaurant = await Restaurant.findOne({
                name: data.이름,
            });
            if (!existingRestaurant) {
                const restaurant = new Restaurant({
                    name: data.이름,
                    location: {
                        roadAddress: data.도로명주소,
                        parcelAddress: data.지번주소,
                        lat: data.위도,
                        lng: data.경도,
                    },
                    category: data.카테고리,
                    openingHours: data.영업시간,
                    contact: data.일반전화,
                    website: data.홈페이지URL,
                    thumbnail: data.썸네일이미지URL,
                });
                await restaurant.save();
                console.log('데이터 삽입 성공:', data.이름);
            } else {
                console.log('이미 존재하는 데이터:', data.이름);
            }
        } catch (err) {
            console.log(data.이름);
            console.error('데이터 삽입 오류:', err);
        }
    })
);
