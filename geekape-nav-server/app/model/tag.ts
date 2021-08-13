module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TagSchema = new Schema({
    name: String,
    category: String,
  }, { collection: 'tag' });
  return mongoose.model('Tag', TagSchema);
};
