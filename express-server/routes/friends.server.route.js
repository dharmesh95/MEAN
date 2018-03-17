// ./express-server/routes/todo.server.route.js
import express from 'express';
//import controller file
import * as friendsController from '../controllers/friends.server.controller';
// get an instance of express router
const router = express.Router();
router.route('/getFriends')
    .get(friendsController.getFriend);
export default router;