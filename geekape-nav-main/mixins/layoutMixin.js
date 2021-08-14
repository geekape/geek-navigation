import {mapState} from "vuex";
import AppHeader from "../components/AppHeader";
import AppNavMenus from "../components/AppNavMenus";
import {throttle} from "../utils/utils";

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
    isMobile() {
      const width = window.innerWidth || document.body.clientWidth
      return width < 568
    },
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
        const width = window.innerWidth || document.body.clientWidth

        if (this.isMobile) {
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
    }
  },

  mounted() {
    this.showMenuType = this.isMobile ? 'none' : 'half'
  }
}


export default layoutMixin
