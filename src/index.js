const express = require('express');
const handlebars = require('express-handlebars');
const MongoStorage = require('connect-mongo');
const DataBase = require('./db/mongo/index');
const swaggerUIExpress = require('swagger-ui-express');
const specs = require('./config/swagger');
const cron = require('./utils/cron');
const session = require('express-session');
const viewRoutes = require('./routes/views.routes');
const cartRoutes = require('./routes/cart.routes');
const productsRoutes = require('./routes/products.routes');
const authRoutes = require('./routes/auth.routes');
const sessionRoutes = require('./routes/session.routes');
const compraRoutes = require('./routes/compra.routes');
const fakerRoutes = require('./routes/faker.routes');
const mailerRoutes = require('./routes/mailer.routes');
const usersRoutes = require('./routes/users.routes');
const passport = require('passport');
const varConfig = require('./config/envVarConfig');
const { addLogger } = require('./middleware/logger.middleware');
const app = express();
const { initializePassport } = require('./config/passport');
app.use(
  session({
    store: MongoStorage.create({
      mongoUrl:
        'mongodb+srv://ramirostrologo:r131217s@proyectocoder.annbnga.mongodb.net/ecommerce_preentrega-dos',
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(addLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/views', viewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/compra', compraRoutes);
app.use('/api/faker', fakerRoutes);
app.use('/api/mailer', mailerRoutes);
app.use('/api/users', usersRoutes);
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.listen(varConfig.port, () => {
  console.log(`Server run ok on port ${varConfig.port}`);
  varConfig.persistence === 'MONGO'
    ? DataBase.connect()
    : console.log('DEV MODE');
});
