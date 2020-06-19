
<template>
  <section class="index container">
    <div
      class="left-bar"
      :style="{left: isLeftbar ? 0 : '-249px'}"
    >
      <div class="title">
        <img
          class="icon-logo"
          src="/favicon.ico"
        >
        <span>极客猿梦导航</span>
      </div>
      <el-row>
        <el-col :span="24">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#30333c"
            text-color="#6b7386"
            active-text-color="#fff"
          >
            <el-submenu
              :index="`${index}`"
              v-for="(item,index) in newDataList"
              :key="item._id"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <el-menu-item
                :index="`${index}-${idx}`"
                v-for="(nav,idx) in item.data"
                :key="nav._id"
                @click="findNav(nav._id)"
              >
                <a href="#">
                  <i :class="nav.icon"></i>
                  <span slot="title">{{nav.classify}}</span>
                </a>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <section class="main">
      <Header />
      <div id="mainContent">
        <!-- 手机端菜单 -->
        <div id="menu-box">
          <div id="menu">
            <input
              type="checkbox"
              id="menu-form"
            >
            <label
              for="menu-form"
              class="menu-spin"
              @click="isLeftbar=!isLeftbar"
            >
              <div class="line diagonal line-1"></div>
              <div class="line horizontal"></div>
              <div class="line diagonal line-2"></div>
            </label>
          </div>
        </div>
        <!-- 开发社区 -->
        <div
          class="box"
          v-for="(item,index) in data"
          :key="index"
        >
          <div class="sub-category">
            <div>
              <i
                :class="item.icon"
                class="icon"
              ></i>
              {{item.classify}}
            </div>
          </div>
          <NavItem
            :data="sub"
            v-for="(sub,idx) in item.sites"
            :key="'sub-'+idx"
          />
        </div>
      </div>
      <footer class="footer">
        <div class="copyright">
          <div>
            Copyright © 2019- 2050
            <a href="https://github.com/geekape/blog">钟储兵博客</a>
            <a href="https://github.com/geekape/geek-navigation">导航源码下载</a>
          </div>
        </div>
      </footer>

      <back-top />
    </section>
    <div
      class="add-nav-btn"
      @click="dialogFormVisible=true"
    >
      <el-tooltip
        class="item"
        effect="dark"
        content="添加网站"
        placement="left-start"
      >
        <el-button>
          <i class="el-icon-plus"></i>
        </el-button>
      </el-tooltip>
    </div>

    <AddNavPopup
      :data="dataList"
      :show.sync="dialogFormVisible"
    />
  </section>
</template>

<script>
import BackTop from '@/components/BackTop'
import AddNavPopup from '@/components/AddNavPopup'
import NavItem from '@/components/NavItem'
import Header from './Header'
export default {
  data() {
    return {
      active: '［前端］热门推荐',
      data: [],
      dataList: [],
      newDataList: [],
      selfIndex: 0,
      isLeftbar: true,
      dialogFormVisible: false
    }
  },
  components: {
    BackTop,
    AddNavPopup,
    NavItem,
    Header
  },
  methods: {
    async getData() {
      const res = await this.$api.getHome()
      const data = res.data
      this.dataList = data

      const arr = []
      let product = {}
      let operation = {}
      let design = {}
      let web = {}

      // 产品
      product.name = '产品'
      product.icon = 'csz czs-circle'
      product.data = data.filter(
        item => item.classify.indexOf('［产品］') != -1
      )
      arr.push(product)
      // 运营
      operation.name = '运营'
      operation.icon = 'csz czs-square'
      operation.data = data.filter(
        item => item.classify.indexOf('［运营］') != -1
      )
      arr.push(operation)
      // 设计
      design.name = '设计'
      design.icon = 'csz czs-triangle'
      design.data = data.filter(item => item.classify.indexOf('［设计］') != -1)
      arr.push(design)
      // 前端
      web.name = '前端'
      web.icon = 'csz czs-camber'
      web.data = data.filter(item => item.classify.indexOf('［前端］') != -1)
      arr.push(web)
      arr.reverse()
      this.newDataList = arr

      let item = res.data.filter(item => item.classify === this.active)
      if (item.length) {
        this.findNav(item[0]._id)
      }
      // this.$nextTick(() => {
      //   document.getElementById('5ce77a76afdec884fab959a9').scrollIntoView()
      // })
    },
    dataScroll() {
      const that = this
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      let allSite = document.querySelectorAll('.box')
      for (let i = 0; i < allSite.length; i++) {
        if (scrollTop >= allSite[i].offsetTop) {
          that.selfIndex = i
        }
      }
    },
    async findNav(id) {
      const data = await this.$api.findNav(id)
      this.data = data.data
    }
  },
  created() {
    const that = this
    this.getData()
    // window.addEventListener('scroll', this.dataScroll);
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        if (window.screenWidth < 481) {
          that.isLeftbar = false
        } else {
          that.isLeftbar = true
        }
      })()
    }
    window.onresize()
  },
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-dialog {
  min-width: 320px;
}
.el-submenu .el-menu-item {
  padding: 0;
}
.el-menu-item > a {
  color: rgb(107, 115, 134);
  display: block;
  width: 100%;
  height: 100%;
}
.el-menu-item.is-active > a {
  color: #fff;
}
.csz {
  margin-right: 5px;
}

.add-nav-btn {
  &,
  .el-button {
    border: 0;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: #fff;
    right: 10px;
    bottom: 85px;
    z-index: 9999;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}
[class^='el-icon-'] {
  font-size: 20px;
}
</style>
