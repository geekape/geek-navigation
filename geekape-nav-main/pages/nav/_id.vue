<template>
  <div>
    <div class="background-fx">
      <img src="https://nav.iowen.cn/wp-content/themes/onenav/images/fx/shape-01.svg" class="shape-01"> <img
      src="https://nav.iowen.cn/wp-content/themes/onenav/images/fx/shape-02.svg" class="shape-02"> <img
      src="https://nav.iowen.cn/wp-content/themes/onenav/images/fx/shape-03.svg" class="shape-03"> <img
      src="https://nav.iowen.cn/wp-content/themes/onenav/images/fx/shape-04.svg" class="shape-04"> <img
      src="https://nav.iowen.cn/wp-content/themes/onenav/images/fx/shape-05.svg" class="shape-05"> <img
      src="https://nav.iowen.cn/wp-content/themes/onenav/images/fx/shape-06.svg" class="shape-06"> <img
      src="https://nav.iowen.cn/wp-content/themes/onenav/images/fx/shape-07.svg" class="shape-07"> <img
      src="https://nav.iowen.cn/wp-content/themes/onenav/images/fx/shape-08.svg" class="shape-08"> <img
      src="https://nav.iowen.cn/wp-content/themes/onenav/images/fx/shape-09.svg" class="shape-09"> <img
      src="https://nav.iowen.cn/wp-content/themes/onenav/images/fx/shape-10.svg" class="shape-10"> <img
      src="https://nav.iowen.cn/wp-content/themes/onenav/images/fx/shape-11.svg" class="shape-11">
    </div>
    <div class="container" v-loading="loading">
      <el-row :gutter="25" class="site-info">
        <el-col class="item" :md="6" :xs="24">
          <div class="left">
            <div class="img-wrap">
              <nuxt-link to="/">
                <el-image :src="detail.logo"/>
              </nuxt-link>
            </div>
            <div class="tool">
              <el-tooltip content="访问数" placement="top">
                <div class="tool-item">
                  <i class="iconfont icon-attentionfill"></i>
                  <p>{{ detail.view }}</p>
                </div>
              </el-tooltip>
              <div style="width: 30px"></div>

              <el-tooltip content="点赞数" placement="top">
                <div :class="`tool-item ${isStar && 'active'}`" @click="handleNavStarFn">
                  <i class="iconfont icon-appreciatefill"></i>
                  <p>{{ detail.star }}</p>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-col>
        <el-col class="item" :md="10" :xs="24">
          <div class="content">
            <!--            <div class="category-bar">-->
            <!--              <span class="category">素材资源</span>-->
            <!--              >-->
            <!--              <span class="category">LOGO设计</span>-->
            <!--            </div>-->
            <h1 class="title">{{ detail.name }}</h1>
            <p class="desc">{{ detail.desc }}</p>
            <p class="tags" v-if="detail.tags.length">标签：
              <span v-for="(tag, index) in detail.tags" :key="tag">{{index != 0 ? '，' : ''}}{{tag}}</span>
            </p>
            <p class="author" v-if="detail.authorName">
              <span class="el-icon-user-solid"></span>
              <span>推荐人：</span>
              <a :href="detail.authorUrl">{{detail.authorName}}</a>
            </p>
            <div class="btn-group">
              <div @click="handleNavClick(detail)" target="_blank" class="btn-link btn-group-item">链接直达<i
                class="iconfont icon-Icons_ToolBar_ArrowRight"></i></div>
              <!--              <div class="btn-moblie btn-group-item">手机查看<i class="iconfont icon-QR-code"></i></div>-->
            </div>
          </div>
        </el-col>
        <el-col class="item" :md="8" :xs="24">
          <div class="right">
            <div class="app-card">
              <div class="app-card-header">
                <h3 class="app-card-title">随机网址</h3>
                <div class="app-card-extra"><i class="iconfont icon-shuaxin" @click="getRandomNavList"></i></div>
              </div>
              <div class="app-card-content">
                <el-row :gutter="10">
                  <el-col span="12" v-for="item in randomNavList" :key="item._id">
                    <nuxt-link class="nav-block" :to="`/nav/${item._id}`">
                      <img :src="item.logo" alt="" class="nav-logo">
                      <h4 class="nav-name">{{ item.name }}</h4>
                    </nuxt-link>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="site-detail">
        <el-col span="18">
          <div class="detail">{{ detail.detail || detail.desc }}}</div>
        </el-col>
        <el-col span="6">
          <aside></aside>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import {API_NAV, API_NAV_RANDOM} from "../../api";
import layoutMixin from "../../mixins/layoutMixin";
import navActionMixin from "../../mixins/navActionMixin";

export default {
  name: "NavDetail",
  mixins: [navActionMixin],
  head() {
    const { name, desc } = this.detail
    return {
      title: name + ` - ${desc.slice(0, 15)}`
    }
  },
  data() {
    return {
      detail: {},
      randomNavList: [],
    }
  },
  methods: {
    async getRandomNavList() {
      const res = await axios.get(API_NAV_RANDOM);
      this.randomNavList = res.data
    },
    handleNavStarFn() {
      this.handleNavStar(this.detail, ()=> {
        this.isStar = true
        this.detail.star += 1
      })
    }
  },
  async asyncData({params}) {
    const [detailRes, randomRes] = await Promise.all([
      axios.get(API_NAV + `?id=${params.id}`),
      axios.get(API_NAV_RANDOM)
    ]);
    return {
      detail: detailRes.data,
      randomNavList: randomRes.data
    }
  },
}
</script>

<style lang="scss" scoped>

.container {
  max-width: 1200px;
  margin: auto;
  padding: 3rem 15px;
}

.placeholder {
  background: #eee;
  min-height: 300px;
}

.site-info {
  font-size: 14px;
  margin-top: 50px;

  .left {
    padding: 30px 20px;
    background: #e6e8ed;
    border-radius: 15px;
    position: relative;
    box-shadow: 0 30px 20px -20px rgba(#000, .15);

    .img-wrap {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .el-image {
      margin-bottom: 50px;
      width: 100px;
      height: 100px;
      object-fit: cover;

      img {
        width: 100%;
      }
    }

    .tool {
      position: absolute;
      bottom: 20px;
      left: calc(50% - 65px);
      display: flex;

      p {
        margin: 0;
      }

      .iconfont {
        padding-right: 0;
      }

      &-item {
        background: #f0f1f4;
        font-size: 12px;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        box-shadow: 0 0 20px rgba(#000, .12);
        color: #999;
        &.active {
          color: $color-primary;
        }
      }
    }
  }

  .category {
    padding: 2px;
    background: #f1404b;
    color: #fff;
    font-size: 10px;
    border-radius: 2px;

    &-bar {
      color: #f1404b;
    }
  }

  .title {
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: bold;
    color: #000;
  }

  .desc {
    font-size: 16px;
    margin-bottom: 20px;
    @include text-overflow(3)
  }

  .btn-group {
    display: flex;

    &-item {
      background: #e9e9e9;
      color: #666;
      padding: 10px 20px;
      margin-right: 15px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      transition: all .3s;
      cursor: pointer;

      &:hover {
        background: #000;

        &,
        .iconfont {
          color: #fff;
        }
      }
    }

    &,
    .iconfont {
      color: #333;
    }

    .iconfont {
      font-size: 12px;
      margin-left: 10px;
    }
  }
}

.site-detail {
  margin-top: 300px;
  font-size: 16px;
}

.background-fx {
  position: absolute;
  left: 60px;
  right: 0;
  height: 100vh;
  top: 0;
  overflow: hidden;
  opacity: 1;
  z-index: -1;
}

.shape-01 {
  position: absolute;
  top: 11%;
  right: 42%;
  animation: animationFramesTwo 13s linear infinite
}

.shape-02 {
  position: absolute;
  top: 27%;
  left: 17%;
  animation: animationFramesFour 25s linear infinite alternate
}

.shape-03 {
  position: absolute;
  top: 30%;
  left: 50%;
  animation: animationFramesThree 35s linear infinite alternate
}

.shape-04 {
  position: absolute;
  top: 40%;
  right: 23%;
  animation: animationFramesFour 20s linear infinite alternate
}

.shape-05 {
  position: absolute;
  bottom: 62%;
  right: 28%;
  animation: animationFramesOne 15s linear infinite
}

.shape-06 {
  position: absolute;
  bottom: 73%;
  left: 38%;
  animation: animationFramesFour 20s linear infinite alternate
}

.shape-07 {
  position: absolute;
  left: 14%;
  bottom: 54%;
  animation: animationFramesOne 17s linear infinite
}

.shape-08 {
  position: absolute;
  left: 14%;
  top: 60%;

  animation: animationFramesOne 20s linear infinite alternate
}

.shape-09 {
  position: absolute;
  top: 22%;
  left: 41%;
  animation: animationFramesOne 15s linear infinite
}

.shape-10 {
  position: absolute;
  top: 8%;
  right: 6%;
  animation: animationFramesOne 15s linear infinite
}

.shape-11 {
  position: absolute;
  top: 10%;
  right: 8%;
  animation: animationFramesOne 12s linear infinite
}

@keyframes animationFramesOne {
  0% {
    transform: translate(0) rotate(0deg)
  }

  20% {
    transform: translate(73px, -1px) rotate(36deg)
  }

  40% {
    transform: translate(141px, 72px) rotate(72deg)
  }

  60% {
    transform: translate(83px, 122px) rotate(108deg)
  }

  80% {
    transform: translate(-40px, 72px) rotate(144deg)
  }

  to {
    transform: translate(0) rotate(0deg)
  }
}

@keyframes animationFramesTwo {
  0% {
    transform: translate(0) rotate(0deg) scale(1)
  }

  20% {
    transform: translate(73px, -1px) rotate(36deg) scale(.9)
  }

  40% {
    transform: translate(141px, 72px) rotate(72deg) scale(1)
  }

  60% {
    transform: translate(83px, 122px) rotate(108deg) scale(1.2)
  }

  80% {
    transform: translate(-40px, 72px) rotate(144deg) scale(1.1)
  }

  to {
    transform: translate(0) rotate(0deg) scale(1)
  }
}


@keyframes animationFramesThree {
  0% {
    transform: translate(165px, -179px)
  }

  to {
    transform: translate(-346px, 617px)
  }
}

@keyframes animationFramesFour {
  0% {
    transform: translate(-300px, 151px) rotate(0deg)
  }

  to {
    transform: translate(251px, -200px) rotate(180deg)
  }
}

.app-card {
  border: 2px solid #eee;
  background: #f9f9f9;

  &-header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  &-title {
    margin: 0;
  }

  &-content {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    padding-top: 0;

    .nav-block {
      margin-bottom: 10px;
    }
  }

  .iconfont {
    cursor: pointer;
  }
}

.nav-block {
  display: flex;
  align-items: center;
  padding: 5px;
  background: #f1f3f6;
  border: 1px solid transparent;
  color: #666;

  &:hover {
    opacity: .8;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  .nav-name {
    margin: 0;
    @include text-overflow(1);
  }
}


@media screen and (max-width: 568px) {
  .site-info {
    margin-top: 0;

    .item {
      margin-bottom: 40px;
    }
  }
}
</style>
