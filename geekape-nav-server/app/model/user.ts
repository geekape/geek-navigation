module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: String,
    password: String,
    isAdmin: Boolean,
  }, { collection: 'user' });
  return mongoose.model('User', UserSchema);
};
