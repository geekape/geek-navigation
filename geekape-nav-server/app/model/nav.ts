module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const NavSchema = new Schema({
    categoryId: String,
    name: String,
    href: String,
    desc: String,
    logo: String,
    authorName: String,
    authorUrl: String,
    submitTime: Date,
    createTime: Date,
    view: {
      type: Number,
      default: 0,
    },
    star: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 0,
    },
    list: {
      type: [ Object ],
      default: undefined,
    },
    category: [{
      name: String
    }]
  }, { collection: 'nav' });
  return mongoose.model('Nav', NavSchema);
};
