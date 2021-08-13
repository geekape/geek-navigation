module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const NavSchema = new Schema({
    categoryId: String,
    name: String,
    //网站url
    href: String,
    desc: String,
    logo: String,
    authorName: String,
    authorUrl: String,
    auditTime: Date,
    createTime: Date,
    tags: {
      type: Array,
      default: []
    },
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
  }, { collection: 'nav' });
  return mongoose.model('Nav', NavSchema);
};
