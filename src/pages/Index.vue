<template>
  <div class="index container">
    <aside class="left-bar" id="leftBar">
            <div class="title">
                <p>猿梦极客导航</p>
            </div>
            <nav class="nav">
                <div class="item active"><a href=""><i class="iconfont icon-daohang2"></i>极客导航</a><i class="line"></i></div>
                <ul class="nav-item" id="navItem">
                    <li v-for="(a,i) in data" :key="i" @click="jumpId(i)"><a :href="'#' + a.title" :class="{active: i == selfIndex}"><i :class="a.icon"></i>{{a.title}}</a></li>
                </ul>
                <div class="item comment" @click="dialogFormVisible = true"><a><i class="iconfont icon-liuyan"></i>新增网站</a></div>

                
            </nav>
        </aside>


        <section class="main">
            <div id="mainContent">
                <!-- 手机端菜单 -->
                <div id="menu-box">
                   <div id="menu">
                       <input type="checkbox" id="menu-form">
                       <label for="menu-form" class="menu-spin">
                        <div class="line diagonal line-1"></div>
                        <div class="line horizontal"></div>
                        <div class="line diagonal line-2"></div>
                      </label>
                    </div>
                </div>
                <!-- 开发社区 -->
                <div class="box" v-for="(item,index) in data" :key="index">
                    <a href="#" :name="item.title"></a>
                    <div class="sub-category">
                        <div><i :class="item.icon"></i>{{item.title}}</div>
                    </div>
                    <div>
                        <a target="_blank" :href="catetory.href" v-for="(catetory,idx) in item.subData" :key="idx">
                            <div class="item">
                                <div class="logo"><img :src="catetory.logo" alt="CNDS">{{catetory.title}}</div>
                                <div class="desc">{{catetory.des}}</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <footer class="footer">
                <div class="copyright">
                    <div>
                        Copyright © 2018- 2050
                        <a href="http://www.zcbboke.com">极客猿梦导航 钟储兵博客</a>
                    </div>
                </div>
            </footer>
            <div id="fixedBar"><svg class="Zi Zi--BackToTop" title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg></div>
        </section>

    <el-dialog title="添加网站" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="网站名称" :label-width="formLabelWidth">
                        <el-input v-model="form.subData.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="网站分类" :label-width="formLabelWidth">
                    <el-select v-model="form.title" placeholder="请选择网站分类">
                        <el-option label="技术论坛" value="技术论坛"></el-option>
                        <el-option label="技术博客" value="技术博客"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="网站描述" :label-width="formLabelWidth">
                        <el-input v-model="form.subData.des" autocomplete="off"></el-input>
                    </el-form-item>
                  

                    <el-input placeholder="请输入内容" v-model="form.subData.href">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveData">确 定</el-button>
                </div>
                </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      data: [],
      selfIndex: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        title: "",
        subData: {title: "", href: "", des: "", logo: ""}
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    jumpId(idx) {
      this.selfIndex = idx;
    },
    saveData() {
      const _this = this;
      this.form.subData.logo = this.form.subData.href + '/favicon.ico'
      this.$http.post("/api/data", _this.form).then(res => {
        _this.$message({
          message: "保存网站成功",
          type: "success"
        });
      });
      this.dialogFormVisible = false
    }
  },
  created() {
    // this.$http.get("http://text.com").then(res => {
    //   _this.data = res.data.data;
    // });
    this.$http.get("/api/data").then(res => {
      console.log(res.data);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index {
  .el-form-item__label {
    text-align-last: left;
  }
}
</style>
