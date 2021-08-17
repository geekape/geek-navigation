import {mapState} from "vuex";
import AppHeader from "../components/AppHeader";
import AppNavMenus from "../components/AppNavMenus";
import {isMobileSize, throttle} from "../utils/utils";

const layoutMixin = {
  components: {AppHeader, AppNavMenus},
  data() {
    return {
      isCollapse: true,
      showPopup: false,
      showLog: false,
      // none, half, all
      showMenuType: 'half',
    }
  },
  computed: {
    ...mapState(['category']),

    sideBarWidth() {
      if (this.showMenuType == 'half') {
        return '70px'
      } else if (this.showMenuType == 'all') {
        return '220px'
      } else {
        return 0
      }
    },
    contentMarginLeft() {
      if (this.showMenuType == 'half') {
        return '70px'
      } else if (this.showMenuType == 'all') {
        if (isMobileSize()) {
          return 0
        } else {
          return '220px'
        }
      } else {
        return 0
      }
    },
  },
  methods: {
    async findNav(id) {
      this.loading = true;
      const { data } = await this.$api.findNav(id);
      this.data = data;
      this.loading = false;
    },
    async handleSubMenuClick(parentId, id) {
      await this.findNav(parentId);
    },
    toggleMenu() {
      this.showMenuType = this.showMenuType === 'none' ? 'all' : 'none'
    },
    toggleMenu2() {
      this.showMenuType = this.showMenuType === 'all' ? 'half' : 'all'
    },
    handleResize: function (event) {
      if (event) {
        const { innerWidth } = event.target
        if (innerWidth < 568) {
          this.showMenuType = 'none'
        } else {
          this.showMenuType = 'half'
        }
      } else {
        if (isMobileSize()) {
          this.showMenuType = 'none'
        } else {
          this.showMenuType = 'half'
        }
      }
    }
  },

  mounted() {
    this.handleResize()
    window.onresize = throttle(this.handleResize.bind(this), 300)


    const category = localStorage.getItem('category')
    this.$store.commit('saveCategory', category ? JSON.parse(category) : [])
  }
}


export default layoutMixin
