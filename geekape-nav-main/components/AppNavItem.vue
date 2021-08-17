<template>
  <el-col :xs="24" :sm="8" :md="6" :lg="4" class="website-item">
    <div class="wrap">
      <div class="link" target="_blank" @click="$emit('handleNavClick', navData)">
        <el-tooltip content="链接直达" property="top">
          <i class="iconfont icon-tiaozhuan"></i>
        </el-tooltip>
      </div>
      <nuxt-link :to="`/nav/${navData._id}`" class="info" >
        <div class="info-header">
          <el-image class="logo" :src="navData.logo" fit="cover" lazy />
          <div class="info-header-right">
            <strong class="title">{{ navData.name }}</strong>
            <div class="desc">
              {{ navData.desc || "这个网站什么描述也没有..." }}
            </div>
          </div>
        </div>


      </nuxt-link>
      <div class="website-item__footer">
        <div class="left" v-if="navData.authorUrl">
          <a :href="navData.authorUrl" target="_blank">
            <span class="iconfont icon-zuozhe"></span>
            <span>{{ navData.authorName }}</span>
          </a>
        </div>
        <div class="right">
          <span class="website-item__icon" :class="isView && 'active'">
            <span class="iconfont icon-attentionfill"></span>
            {{ navData.view }}
          </span>
          <span
            class="website-item__icon"
            :class="isStar && 'active'"
            @click="handleNavStar"
          >
            <span class="iconfont icon-appreciatefill"></span>
            {{ navData.star }}
          </span>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      isStar: false,
      isView: false,
      navData: this.data
    };
  },
  methods: {
    handleNavStar(navData) {
      this.$emit('handleNavStar', this.navData, ()=> {
        this.navData.star += 1
        this.isStar = true
      })
    }
  }
};
</script>

<style lang="scss">

.website-item {
  font-size: 12px;
  margin-bottom: 20px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  color: #999;
  position: relative;
  &:hover {
    .link {
      display: block;
    }
  }

  .link {
    position: absolute;
    right: 20px;
    top: 10px;
    display: none;
    z-index: 10;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 26px 40px -24px rgba(#000, .2);
    transition: all 0.3s ease;
  }
  .wrap {
    box-shadow: 1px 2px 3px 7px 13px 11px 9px #f2f6f8;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
  }

  a {
    color: #999;
  }

  .title {
    color: #3273dc;
    font-size: 16px;
    @include text-overflow(1);
  }

  .iconfont {
    margin-left: 15px;
    cursor: pointer;
    color: #999;
    font-size: 12px;
    padding-left: 0;
  }

  .desc {
    margin-top: 5px;

    @include text-overflow(1);
  }

  &__footer {
    border-top: 1px solid #f2f2f2;
    background: #fff;
    padding: 10px 15px;
    text-align: right;
    display: flex;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    .left {
      font-size: 12px;
      .iconfont {
        margin-left: 0;
      }
      a {
        display: flex;
        align-items: center;
      }
    }
    .right {
      flex: 1;
    }
  }
  &__icon.active {
    &,
    .iconfont {
      color: #2a97ff;
    }
  }
}

.info {
  display: block;
  transition: all 0.3s;
  background: #fff;
  padding: 20px 10px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;




  &-header {
    display: flex;
    align-items: center;
    overflow: auto;

    &-right {
      display: flex;
      flex-direction: column;
    }
  }
}

.logo {
  min-width: 35px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 15px;
}
</style>
