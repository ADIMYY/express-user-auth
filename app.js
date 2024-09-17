import express from 'express'
import bcrypt from 'bcrypt'

const app = express();
const port = 3000;
const users = []; //* in memory

app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = users.find((data) => email === data.email);
        if (findUser) {
            res.status(400).json({
                message: 'Wrong username or password'
            });
        }

        // * hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({
            password: hashedPassword, 
            email
        });
        res.status(201).json({
            message: 'Registration successful'
        });
    } catch (err) {
        console.log(err.message);
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //* check if user is already registered
        const findUser = users.find((data) => email === data.email);

        if (!findUser) {
            res.status(400).json({
                message: 'Wrong username or password'
            });
        }

        const passwordMatch = await bcrypt.compare(password, findUser.password);

        if (!passwordMatch) {
            return res.status(404).json({ message: 'Wrong username or password' });
        }

        res.status(404).json({ message: 'Logged in successfully!' });
    } catch (err) {

    }
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
