// ./express-server/controllers/todo.server.controller.js
import mongoose from 'mongoose';
//import models
import Friend from '../models/friends.server.model';
export const getFriend = (req, res) => {
    Friend.find().exec((err, friends) => {
        if (err) {
            return res.json({ 'success': false, 'message': err });
        }
        return res.json({ 'success': true, 'message': 'Todos fetched successfully', friends });
    });
}