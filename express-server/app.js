// ./express-server/app.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';
// import routes
import todoRoutes from './routes/todo.server.route';
import friendRoutes from './routes/friends.server.route';
// define our app using express
const app = express();
// allow-cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// set the port
const port = process.env.PORT || 3001;
// connect to database
mongoose.Promise = global.Promise;
/* mongoose.connect('mongodb://localhost/mern-todo-app', {
  useMongoClient: true,
}); */
mongoose.connect('mongodb://dharmesh:123@cluster0-shard-00-00-hwa4t.mongodb.net:27017,cluster0-shard-00-01-hwa4t.mongodb.net:27017,cluster0-shard-00-02-hwa4t.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', function () {
  // Hack the database back to the right one, because when using mongodb+srv as protocol.
  if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
    mongoose.connection.db = mongoose.connection.client.db('test');
    console.log('Connection to Mongo established.')
  }
});
// add Source Map Support
SourceMapSupport.install();
app.use('/api', todoRoutes);
app.use('/friend', friendRoutes);
app.get('/', (req, res) => {
  return res.end('Api working');
})
// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
// start the server
app.listen(port, () => {
  console.log(`App Server Listening at ${port}`);
});