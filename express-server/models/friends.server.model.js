import mongoose from 'mongoose';
var Schema = mongoose.Schema({
  first_name: String,
  last_name: String,
  more_info: String
});
export default mongoose.model('friends', Schema);