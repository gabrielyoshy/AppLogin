module.exports = app => {

    const User = app.db.models.Users;

    const bcrypt = require('bcryptjs');

    const jwt = require('jsonwebtoken');

    var encryptPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    };

    var validatePassword = function (password1, password2){
        return bcrypt.compare(password1, password2);
    }

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    }).route('/signup')
    .post(async (req, res, next) => {
        const {name, email, password} = req.body;
        const user = {
            name: name,
            email: email,
            password: password
        };
        user.password = await encryptPassword(password);
        console.log(user);
        const aux = await User.create(user);

        const token = jwt.sign({id: aux.id}, 'secretToken', {
            expiresIn: 60 * 60 * 24
        });

        res.json({auth: true, token});

    });


    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    }).route('/me')
    .get(async (req, res, next) => {

        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(401).json({
                auth: false,
                message: 'no token provided'
            });
        }

        const decoded = jwt.verify(token, 'secretToken');
        
        const user = await User.findOne({where: {id: decoded.id}});

        if(!user){
            return res.status(404).send('no user found');
        }

        res.json(user);
    });

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    }).route('/signin')
    .post(async (req, res, next) => {
        const { email, password} = req.body;
        const user = await User.findOne({where: {email: email}});
        if(!user){
            return res.status(404).send("The email doesn't exists");
        }

        const validPassword = await validatePassword(password, user.password)
        
        if(!validPassword){
            res.status(401).json({auth: false, token: null});
        }
        
        const token = jwt.sign({id: user.id}, 'secretToken',{
            expiresIn: 60 * 60 * 24
        });

        res.json({auth: true, token});
    });

    
}