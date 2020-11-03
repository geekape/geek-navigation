<template>
  <el-col :xs="24" :sm="8" :md="6" class="website-item">
    <div class="wrap">
      <div class="info" @click="handleClick">
        <div class="info-header">
          <el-image class="logo" :src="navData.logo" fit="cover" lazy />
          <span class="title">{{ navData.name }}</span>
        </div>
        <div class="desc">
          {{ navData.desc || "这个网站什么描述也没有..." }}
        </div>
      </div>
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
            @click="handleStar"
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
    async handleClick() {
      const views = this.$storage.get("VIEWS") || {};
      const { href, view, _id: id } = this.navData;
      await this.$api.editNav({ id, view: view + 1 });
      views[id] = view + 1;
      this.$storage.set("VIEWS", views);
      window.open(href, "_blank");
    },
    async handleStar() {
      const stars = this.$storage.get("STARS") || {};
      let { star, _id: id } = this.navData;
      if (this.isStar || stars[id]) return;

      star++;
      await this.$api.editNav({ id, star });
      stars[id] = star;
      this.navData.star = star;
      this.isStar = true;
      this.$storage.set("STARS", stars);
    }
  }
};
</script>

<style lang="scss">
@mixin text-overflow($line) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $line;
}
.website-item {
  font-size: 13px;
  margin-bottom: 20px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  transition: all .3s;
  &:hover {
    transform: translate(0, -10px);
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
    @include text-overflow(2);
  }

  .iconfont {
    margin-left: 15px;
    cursor: pointer;
  }

  .desc {
    margin-top: 10px;
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
  padding: 10px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  &:hover {
  }

  &-header {
    display: flex;
    align-items: center;
    overflow: auto;
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
