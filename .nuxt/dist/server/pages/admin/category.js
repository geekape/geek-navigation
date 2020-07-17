exports.ids = [1];
exports.modules = {

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_category_vue_vue_type_style_index_0_id_76411a40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_category_vue_vue_type_style_index_0_id_76411a40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_category_vue_vue_type_style_index_0_id_76411a40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_category_vue_vue_type_style_index_0_id_76411a40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_category_vue_vue_type_style_index_0_id_76411a40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_category_vue_vue_type_style_index_0_id_76411a40_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".el-tree[data-v-76411a40]{margin-top:30px}.category .el-dialog[data-v-76411a40]{text-align:left}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/admin/category.vue?vue&type=template&id=76411a40&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('admin-layout',[_c('div',{staticClass:"category"},[_c('el-row',{attrs:{"type":"flex","justify":"start"}},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.dialogVisible = true}}},[_vm._v("\n        添加分类\n      ")])],1),_vm._v(" "),_c('el-tree',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],attrs:{"data":_vm.data,"show-checkbox":"","node-key":"_id","default-expand-all":"","expand-on-click-node":false},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var node = ref.node;
var data = ref.data;
return _c('span',{staticClass:"custom-tree-node"},[_c('span',[_vm._v(_vm._s(data.name))]),_vm._v(" "),_c('span',[_c('el-button',{attrs:{"type":"text","size":"mini"},on:{"click":function () { return _vm.handleDelete(data); }}},[_vm._v("\n            删除\n          ")])],1)])}}])}),_vm._v(" "),_c('el-dialog',{attrs:{"title":"提示","visible":_vm.dialogVisible,"width":"30%"},on:{"update:visible":function($event){_vm.dialogVisible=$event}}},[_c('el-form',{staticClass:"demo-form-inline",attrs:{"model":_vm.form}},[_c('el-form-item',{attrs:{"label":"分类名称","required":""}},[_c('el-input',{attrs:{"placeholder":"分类名称"},model:{value:(_vm.form.name),callback:function ($$v) {_vm.$set(_vm.form, "name", $$v)},expression:"form.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"父级分类"}},[_c('el-select',{attrs:{"placeholder":""},model:{value:(_vm.form.categoryId),callback:function ($$v) {_vm.$set(_vm.form, "categoryId", $$v)},expression:"form.categoryId"}},_vm._l((_vm.data),function(item){return _c('el-option',{key:item._id,attrs:{"label":item.name,"value":item._id}})}),1)],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.handleAdd}},[_vm._v("保存")])],1)],1)],1)],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/admin/category.vue?vue&type=template&id=76411a40&scoped=true&

// EXTERNAL MODULE: ./layouts/admin-layout.vue + 4 modules
var admin_layout = __webpack_require__(29);

// EXTERNAL MODULE: ./plugins/axios.js
var axios = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/admin/category.vue?vue&type=script&lang=js&
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


/* harmony default export */ var categoryvue_type_script_lang_js_ = ({
  components: {
    adminLayout: admin_layout["a" /* default */]
  },

  data() {
    return {
      loading: false,
      data: [],
      dialogVisible: false,
      editId: "",
      form: {
        name: "",
        categoryId: ""
      }
    };
  },

  methods: {
    async handleAdd(id) {
      if (this.editId) {
        await this.$api.editCategory({
          id: this.editId,
          ...this.form
        });
      } else {
        await this.$api.addCategory(this.form);
      }

      this.dialogVisible = false;
      this.$message.error(this.editId ? "编辑成功" : "新增成功");
      this.form = {};
      this.editId = "";
      this.getData();
    },

    async handleEdit(index, row) {
      this.dialogVisible = true;
      this.form.name = row.name;
      this.editId = row._id;
    },

    async handleDelete(row) {
      await this.$api.delCategory(row._id);
      this.form = {};
      this.getData();
    },

    async getData() {
      this.loading = true;
      const res = await this.$api.getCategoryList();
      let resData = res.data;
      this.loading = false;
      this.data = resData;
    }

  },

  async asyncData() {
    const res = await axios["a" /* default */].get('/api/category/list');
    return {
      data: res.data
    };
  }

});
// CONCATENATED MODULE: ./pages/admin/category.vue?vue&type=script&lang=js&
 /* harmony default export */ var admin_categoryvue_type_script_lang_js_ = (categoryvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(4);

// CONCATENATED MODULE: ./pages/admin/category.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(107)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  admin_categoryvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "76411a40",
  "49784c7c"
  
)

/* harmony default export */ var category = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(108);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(7).default
module.exports.__inject__ = function (context) {
  add("0c2b57b2", content, true, context)
};

/***/ })

};;
//# sourceMappingURL=category.js.map