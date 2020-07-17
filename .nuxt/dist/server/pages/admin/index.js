exports.ids = [2];
exports.modules = {

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6de17fba_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6de17fba_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6de17fba_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6de17fba_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6de17fba_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6de17fba_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".el-table[data-v-6de17fba]{margin-top:20px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/admin/index.vue?vue&type=template&id=6de17fba&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('admin-layout',[_c('div',[_c('el-row',[_c('el-col',{attrs:{"span":4}},[_c('el-select',{attrs:{"placeholder":"请选择状态"},model:{value:(_vm.selectedStatus),callback:function ($$v) {_vm.selectedStatus=$$v},expression:"selectedStatus"}},_vm._l((_vm.status),function(item){return _c('el-option',{key:item.value,attrs:{"value":item.value,"label":item.label}})}),1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}},[_c('el-button',{attrs:{"type":"danger"},on:{"click":_vm.clear}},[_vm._v("一键拒绝审核列表")])],1)],1),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],attrs:{"data":_vm.tableData}},[_c('el-table-column',{attrs:{"label":"提交日期","width":"180"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('i',{staticClass:"el-icon-time"}),_vm._v(" "),_c('span',{staticStyle:{"margin-left":"10px"}},[_vm._v("\n            "+_vm._s(_vm.$dayjs(scope.row.createAt).format("YYYY-MM-DD HH:ss"))+"\n          ")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"网站名称","width":"180","prop":"name"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"网站描述","width":"180","prop":"desc"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"网站链接","width":"180","prop":"url"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(!scope.row.status)?_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){return _vm.openDialog(0, scope.row._id, scope.$index)}}},[_vm._v("\n            通过\n          ")]):_vm._e(),_vm._v(" "),(!scope.row.status)?_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){return _vm.openDialog(1, scope.row._id, scope.$index)}}},[_vm._v("\n            拒绝\n          ")]):_vm._e()]}}])})],1)],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/admin/index.vue?vue&type=template&id=6de17fba&scoped=true&

// EXTERNAL MODULE: ./layouts/admin-layout.vue + 4 modules
var admin_layout = __webpack_require__(29);

// EXTERNAL MODULE: ./api/index.js
var api = __webpack_require__(39);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/admin/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var adminvue_type_script_lang_js_ = ({
  components: {
    adminLayout: admin_layout["a" /* default */]
  },

  data() {
    return {
      loading: false,
      status: [{
        value: 0,
        label: "审核中"
      }, {
        value: 1,
        label: "已通过"
      }, {
        value: 2,
        label: "已拒绝"
      }],
      selectedStatus: 0,
      isNavPopup: false,
      editItem: {},
      active: 0,
      tableData: [],
      tableNavData: [],
      activeName: "two"
    };
  },

  methods: {
    async getData(status) {
      this.loading = true;
      const res = await this.$api.getAuditList(status);
      this.tableData = res.data;
      this.loading = false;
    },

    // 拒绝－直接删除提交
    async delAuditNav(id) {
      const res = await this.$api.delAuditNav({
        id: id
      });
    },

    // 新增－展示到前台
    async addNav(data) {
      const res = await this.$api.addNav(data);
    },

    openDialog(type, id, index) {
      const that = this;

      if (type) {
        // 拒绝
        this.$confirm("确认拒绝这个提交？").then(_ => {
          this.$message("删除成功");
          this.delAuditNav(id);
          this.tableData.splice(index, 1);
        }).catch(_ => {});
      } else {
        let filterData = this.tableData.filter(item => item._id == id)[0];
        filterData.auditId = filterData._id;
        this.$confirm("确认添加到首页？").then(_ => {
          this.$message("添加成功");
          this.addNav(filterData);
          this.tableData.splice(index, 1);
        }).catch(_ => {});
      }
    },

    clear() {
      this.$confirm("确认清空审核列表？").then(res => {
        this.$api.fastRejectAudit();
        this.getData();
      });
    }

  },
  watch: {
    selectedStatus(val) {
      this.getData(val);
    }

  },

  async asyncData() {
    const res = await api["a" /* default */].getAuditList();
    return {
      tableData: res.data
    };
  }

});
// CONCATENATED MODULE: ./pages/admin/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_adminvue_type_script_lang_js_ = (adminvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(4);

// CONCATENATED MODULE: ./pages/admin/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(103)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_adminvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "6de17fba",
  "69030e84"
  
)

/* harmony default export */ var admin = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(104);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(7).default
module.exports.__inject__ = function (context) {
  add("5dc81bdc", content, true, context)
};

/***/ })

};;
//# sourceMappingURL=index.js.map