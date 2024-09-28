const { decodeAccessToken, generateAccessToken } = require('../../helpers')
const { User } = require('../../models')
module.exports.login = async (req, res) => {
    try {
        console.log('req.body', req.body);
        //verify password 
        const user = await User.findOne({ email: req.body.email });
        console.log('user : ', user);
        if (user) {
            const loginToken = generateAccessToken({ _id: user._id, details: user });
            return res.status(200).send({
                error: false,
                message: "Authentication Successful",
                token: loginToken,
                userDetails: user
            });
        }

        return res.status(500).send({
            error: true,
            message: "User not found"
        });
    }
    catch (error) {
        console.error('error', error);
        return res.status(500).send({ error: false, message: error.message, debug: error });
    }
}
module.exports.register = async (req, res) => {
    try {

        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(500).send({
                error: true,
                message: "Please provide all required fields"
            });
        }


        const user = await User.findOne({ email });
        console.log('user : ', user);
        if (user) {
            return res.status(500).send({
                error: true,
                message: "User already exists"
            });
        }
        const newUser = await User.create({
            name: firstName + ' ' + lastName,
            email,
            picture: '',
            email_verified: false,
            googleId: null,
            password
        });
        console.log('newUser : ', newUser);
        const loginToken = generateAccessToken({
            _id: newUser._id,
            details: newUser
        });

        return res.status(200).send({
            error: false,
            message: "Authentication Successful",
            token: loginToken,
            userDetails: newUser
        });

    }
    catch (error) {
        console.error('error', error);
        return res.status(500).send({ error: false, message: error.message, debug: error });
    }
}

module.exports.google = async (req, res) => {
    try {

        const { token } = req.body;
        const decoded = decodeAccessToken(token);
        console.log('decoded', decoded);

        const user = await User.findOne({ email: decoded.payload.email });
        console.log('user : ', user);
        if (user) {
            const loginToken = generateAccessToken({ _id: user._id, details: user });
            return res.status(200).send({
                error: false,
                message: "Authentication Successful",
                token: loginToken,
                userDetails: user
            });
        }
        // decoded {
        //     header: {
        //       alg: 'RS256',
        //       kid: '5aaff47c21d06e266cce395b2145c7c6d4730ea5',
        //       typ: 'JWT'
        //     },
        //     payload: {
        //       iss: 'https://accounts.google.com',
        //       azp: '171535966853-vakh5bl391qnnitijgqmcs02v8q4lqd2.apps.googleusercontent.com',
        //       aud: '171535966853-vakh5bl391qnnitijgqmcs02v8q4lqd2.apps.googleusercontent.com',
        //       sub: '114687055092223651277',
        //       email: 'vinayakahk81@gmail.com',
        //       email_verified: true,
        //       nbf: 1727408938,
        //       name: 'Vinayaka HK',
        //       picture: 'https://lh3.googleusercontent.com/a/ACg8ocKR2OQBez4ernpgfb6fmOz6h_DuChJDcXqmw67Ud7LVkOpO6NYU1Q=s96-c',
        //       given_name: 'Vinayaka',
        //       family_name: 'HK',
        //       iat: 1727409238,
        //       exp: 1727412838,
        //       jti: 'ce0c60fddb46f1751783af79f5f4b936df7f22ca'
        //     },
        //     signature: 'QNrCCcYoAfFD75Mb7osg7XdOsUCfNZ0GjYAYiMNotsx3vDSStF5Fb08tNnsrWIsqx8f7_DthCTRt2v2ao19WgDttmbt8fL84OG1SQjroyCs1fpmexy5g9NbYQsoPcJ8XtTLEpHOIn6pzanvOtiSXss9hocL-rlNnyL1rzk1aQrM2mrXDiCmz_a17afL4ADcvZUsVMoesZ6KoFmHP7PBMX1gFCMmkxC57RQiIdZUJjlhwHVk6ewLtQPok9dQN2zyqEB2tgo2wmd4ZTDlwi-Vf-ksAN8sbVVEHy8VrSu2NmIegxXORhScDtHwQJOUxcXMg79vamI4Yu1OIDVbOY-K2DA'
        //   }
        if (!user) {
            const newUser = await User.create({
                name: decoded.payload.name,
                email: decoded.payload.email,
                picture: decoded.payload.picture,
                email_verified: decoded.payload.email_verified,
                googleId: decoded.payload.sub,
            });
            console.log('newUser : ', newUser);
            const loginToken = generateAccessToken({
                _id: newUser._id,
                details: newUser
            });

            return res.status(200).send({
                error: false,
                message: "Authentication Successful",
                token: loginToken,
                userDetails: newUser
            });
        }
    }
    catch (error) {
        console.error('error', error);
        return res.status(500).send({ error: false, message: error.message, debug: error });
    }
}