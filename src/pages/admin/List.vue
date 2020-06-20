<template>
  <div>
    <section
      class="mb-15"
      v-for="(item, index) in tableNavData"
      :key="item._id"
    >
      <h3 class="title">{{ item.classify }}</h3>
      <el-table :data="item.sites">
        <el-table-column
          label="网站名字"
          width="180"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="网站链接"
          width="180"
          prop="href"
        ></el-table-column>
        <el-table-column
          label="网站描述"
          width="180"
          prop="desc"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(index, scope.row, item._id)"
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, item._id, scope.row, index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <AddNavPopup
      @reloadData="getData"
      :data="tableNavData"
      :show.sync="isNavPopup"
      :type="1"
      :editItem="editItem"
    />
  </div>
</template>

<script>
import AddNavPopup from '@/components/AddNavPopup'
export default {
  components: {
    AddNavPopup
  },
  data() {
    return {
      isNavPopup: false,
      editItem: {},
      active: 0,
      tableData: [],
      tableNavData: [],
      activeName: 'two',
    }
  },
  methods: {
    async getData() {
      const res = await this.$api.getHome()
      this.tableNavData = res.data
    },
    handleEdit(index, item, id) {
      this.isNavPopup = true
      item.classify = this.tableNavData[index].classify
      item.navId = id
      this.editItem = item
    },
    async handleDelete(index, id, item, tableNavDataIndex) {
      const name = item.name
      this.tableNavData[tableNavDataIndex].sites.splice(index, 1)
      this.$message('删除成功')
      const data = await this.$api.delNav(id, name)
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
.title {
  text-align: left;
  font-size: 14px;
  line-height: initial;
  margin: 20px 0;
}
</style>
