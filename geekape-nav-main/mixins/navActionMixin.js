const navActionMixin = {
  data() {
    return {
      isStar: false,
    }
  },
  methods: {
    async addNavView(navData = {}) {
      const { href, view, _id: id } = navData;

      await this.$api.editNav({ id, view: view + 1 });

      const views = this.$storage.get("VIEWS") || {};
      views[id] = view + 1;
      this.$storage.set("VIEWS", views);
    },
    handleNavClick(navData = {}) {
      const { href } = navData;
      this.addNavView(navData);
      window.open(href, "_blank");
    },
    async handleNavStar(navData = {}, cb = ()=> {}) {
      let { star, _id: id } = navData;

      const stars = this.$storage.get("STARS") || {};
      if (stars[id]) return;

      star++;
      await this.$api.editNav({ id, star });
      cb();
      stars[id] = star;
      this.$storage.set("STARS", stars);
    }
  },
}

export default navActionMixin
