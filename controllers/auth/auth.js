const Cryptr = require('cryptr');
const cryptr = new Cryptr('kunci');
const jwt = require('jsonwebtoken');
const UserModels = require('../../mongodb/scheme/user');

async function handleRegis(req, res, next) {
    const { username, password, email, firstName, lastName } = req.body;

    try {
        const existingUser = await UserModels.findOne({ email });

        if (existingUser) {
            return res.status(400).send({
                message: 'This email is already registered',
                statusCode: 400
            });
        }

        const encryptedPassword = cryptr.encrypt(password);
        const dataPassingToDB = {
            username,
            password: encryptedPassword,
            firstName,
            lastName,
            email
        };

        const createdUser = await UserModels.create(dataPassingToDB);

        if (!createdUser) {
            res.status(400).send({
                message: 'Failed to create user',
                statusCode: 400
            });
        } else {
            res.send({
                message: 'Successfully created user data!',
                statusCode: 200
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Error in user registration',
            statusCode: 500
        });
    }
}

async function handleLogin(req, res, next) {
    const { username, password } = req.body;

    try {
        const existingUser = await UserModels.findOne({ username });

        if (!existingUser) {
            return res.status(400).send({
                message: 'User not found',
                statusCode: 400
            });
        }

        const decryptedPassword = cryptr.decrypt(existingUser.password);

        if (password !== decryptedPassword) {
            res.status(400).send({
                message: 'Wrong username or password',
                statusCode: 400
            });
        } else {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: {
                    user_id: existingUser._id,
                    username,
                    password: existingUser.password,
                    email: existingUser.email
                }
            }, 'kunci');

            res.send({
                message: 'Login successful!',
                access_token: token,
                statusCode: 200,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Error in user login',
            statusCode: 500
        });
    }
}


module.exports = {
    handleRegis,
    handleLogin,
};
