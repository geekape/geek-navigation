module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TagSchema = new Schema({
    name: String,
    parentName: String,
  }, { collection: 'tag' });

  TagSchema.index({ name: 1 }, { unique: true, background: true, dropDups: true })

  return mongoose.model('Tag', TagSchema);
};
