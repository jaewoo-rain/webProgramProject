import express from 'express';
import { handler } from './build/handler.js';
import dotenv from 'dotenv'
import { MongoClient, ObjectId } from 'mongodb'

dotenv.config();
const app = express();

// DB연결
let db;
const url = 'mongodb+srv://jaewoo:jaewoo@jaewoo.itfxt.mongodb.net/?retryWrites=true&w=majority&appName=jaewoo'
new MongoClient(url).connect().then((client) => {
    console.log('DB연결 성공');
    db = client.db('webProject')

}).catch((err) => {
    console.log(err)
})

// POST요청시 데이터 JSON파일 처리 : 요청.body사용시 필요함
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// 로그인 api
app.post('/login', async (req, res) => {
    let id = req.body.id;
    let password = req.body.password
    if (!id || !password) {
        res.status(400).json({ message: '아이디와 비밀번호를 입력하세요' });
    }
    try {
        const userInfo = await db.collection('user').findOne({ id: id });
        if (!userInfo) {
            return res.json({ message: '아이디 없음' });
        }
        if (password != userInfo.password) {
            return res.json({ message: '비밀번호 틀림' });
        }
        return res.status(200).json({ message: '성공' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 에러' });
    }
})

// 회원가입
app.post('/register', async (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;

    if (!id || !password) {
        return res.json({ message: '아이디와 비밀번호를 입력하세요' })
    }
    try {
        // 중복아이디 검사
        const existingUser = await db.collection('user').findOne({ id: id });
        if (existingUser) {
            return res.json({ message: '이미 사용중인 아이디입니다' })
        }

        // 새로운 사용자 정보 삽입
        await db.collection('user').insertOne({
            id: id,
            password: password,
            name: name,
        })

        // 댓글을 모아놓기 위해 아이디로 컬럼 생성...
        await db.collection(id).insertOne({ initialized: true });


        res.status(200).json({ message: '회원가입 성공' });
    } catch (err) {
        console.log(err);
        res.status(500).send('서버 에러')
    }
})

// 검색 - 도우미
app.get('/suggest', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.json([]);
    }
    try {
        const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const flowerName = new RegExp(escapedQuery, 'i'); // 대소문자 구분 없이 부분 일치
        const suggestions = await db.collection('flower')
            .find({ name: flowerName })
            .limit(10)
            .toArray();
        res.json(suggestions);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버에러' });
    }
});

// 검색 결과 페이지에서 아이디요청
app.get('/flower/:name', async (req, res) => {
    let flowerName = req.params.name
    try {
        let result = await db.collection('flower').findOne(
            { name: flowerName },
            { projection: { _id: 0 } } // _id 필드 제외
        )
        const comments = await db.collection('comments')
            .find(
                { flowerName: flowerName }, // flowerName 기준으로 검색
                { projection: { _id: 0, flowerName: 0 } } // _id 필드 제외
            ).toArray(); // 배열로 변환
        result.comments = comments
        return res.json(result)
    } catch (err) {
        console.log(err);
        return res.json({ message: "실패" })
    }
})


// SvelteKit의 핸들러 연결
app.use(handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});