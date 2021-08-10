module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CategorySchema = new Schema({
    name: String,
    categoryId: String,
    createAt: Number,
    icon: {
      type: String,
      default: ''
    },
    children: [{
      name: String,
      categoryId: String,
      createAt: Number,
    }],
  }, { collection: 'category' });
  return mongoose.model('Category', CategorySchema);
};
