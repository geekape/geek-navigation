const content = {
  pageType: "jh-page", pageId: "navManagement", table: "nav", pageName: "导航管理",
  resourceList: [
    {
      actionId: "selectItemList",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅查询列表-nav",
      resourceData: {
        table: "nav",
        operation: "select"
      }
    },
    {
      actionId: "insertItem",
      resourceType: "sql",
      desc: "✅添加-nav",
      resourceHook: {
        before: [
          { service: 'common', serviceFunction: 'generateBizIdOfBeforeHook'}
        ]
      },
      resourceData: {
        table: "nav",
        operation: "jhInsert"
      }
    },
    {
      actionId: "updateItem",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅更新-nav",
      resourceData: {
        table: "nav",
        operation: "jhUpdate"
      }
    },
    {
      actionId: "deleteItem",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅删除-nav",
      resourceData: {
        table: "nav",
        operation: "jhDelete"
      }
    }
  ], // { actionId: '', resourceType: '', resourceData: {}, resourceHook: {}, desc: '' }
  drawerList: [], // { key: '', title: '', contentList: [] }
  includeList: [], // { type: < js | css | html | vueComponent >, path: ''}
  common: { 
    
    data: {
      constantObj: {},
      validationRules: {
        requireRules: [
          v => !!v || '必填',
        ],
      },
      testString: '测试字符串',
      serverSearchWhereLike: { className: '' },
    },
    dataExpression: {
      isMobile: 'window.innerWidth < 500'
    }, // data 表达式
    watch: {},
    computed: {},
    doUiAction: {}, // 额外uiAction { [key]: [action1, action2]}
    methods: {}
  },
  headContent: [
    { tag: 'jh-page-title', value: "nav", attrs: { cols: 12, sm: 6, md:4 }, helpBtn: true, slot: [] },
    { 
      tag: 'jh-search', 
      attrs: { cols: 12, sm: 6, md:8 },
      value: [
        { tag: "v-text-field", model: "serverSearchWhereLike.className", attrs: {prefix: '前缀'} },
      ], 
      searchBtn: {}
    }
  ],
  pageContent: [
    {
      tag: 'jh-table',
      attrs: {  },
      value: [
        { text: "id", value: "id", type: "v-text-field", width: 80, sortable: true, class: "fixed", cellClass: "fixed" },
        { text: "导航id", value: "navId", type: "v-text-field", width: 80, sortable: true },
        { text: "导航名称", value: "navName", type: "v-text-field", width: 80, sortable: true },
        { text: "导航地址", value: "navUrl", type: "v-text-field", width: 80, sortable: true },
        { text: "导航图标", value: "navIcon", type: "v-text-field", width: 80, sortable: true },
        { text: "导航描述", value: "navDesc", type: "v-text-field", width: 80, sortable: true },
        { text: "分类id", value: "categoryId", type: "v-text-field", width: 80, sortable: true },
        { text: "标签", value: "tags", type: "v-text-field", width: 80, sortable: true },
        { text: "排序", value: "sort", type: "v-text-field", width: 80, sortable: true },
        { text: "状态 0", value: "status", type: "v-text-field", width: 80, sortable: true },
        { text: "创建时间", value: "createAt", type: "v-text-field", width: 80, sortable: true },
        { text: "操作", value: "operation", type: "v-text-field", width: 80, sortable: true },
        { text: "操作者userId", value: "operationByUserId", type: "v-text-field", width: 80, sortable: true },
        { text: "操作者用户名", value: "operationByUser", type: "v-text-field", width: 80, sortable: true },
        { text: "操作时间", value: "operationAt", type: "v-text-field", width: 80, sortable: true },
        { text: "操作", value: "action", type: "action", width: 'window.innerWidth < 500 ? 70 : 120', align: "center", class: "fixed", cellClass: "fixed" },

        // width 表达式需要使用字符串包裹
      ],
      headActionList: [
        { tag: 'v-btn', value: '新增', attrs: { color: 'success', class: 'mr-2', '@click': 'doUiAction("startCreateItem")', small: true } },
        { tag: 'v-spacer' },
        // 默认筛选
        {
          tag: 'v-col',
          attrs: { cols: '12', sm: '6', md: '4', class: 'pa-0' },
          value: [
            { tag: 'v-text-field', attrs: {prefix: '筛选', 'v-model': 'searchInput', class: 'jh-v-input', ':dense': true, ':filled': true, ':single-line': true} },
          ],
        }
      ],
      rowActionList: [
        { text: '编辑', icon: 'mdi-note-edit-outline', color: 'success', click: 'doUiAction("startUpdateItem", item)' }, // 简写支持 pc 和 移动端折叠
        { text: '删除', icon: 'mdi-trash-can-outline', color: 'error', click: 'doUiAction("deleteItem", item)' } // 简写支持 pc 和 移动端折叠
      ],
    }
  ],
  actionContent: [
    {
      tag: 'jh-create-drawer',
      key: "create",
      attrs: {},
      title: '新增导航',
      headSlot: [],
      contentList: [
        { 
          label: "新增", 
          type: "form", 
          formItemList: [
            { label: "导航id", model: "navId", tag: "v-text-field",idGenerate: { prefix: 'DH', bizId: 'navId', startValue: 1000 }, hidden: true   },
            { label: "导航名称", model: "navName", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "导航地址", model: "navUrl", tag: "v-text-field"   },
            { label: "导航图标", model: "navIcon", tag: "v-text-field"   },
            { label: "导航描述", model: "navDesc", tag: "v-text-field"   },
            { label: "分类id", model: "categoryId", tag: "v-text-field"   },
            { label: "标签", model: "tags", tag: "v-text-field"   },
            { label: "排序", model: "sort", tag: "v-text-field"   },
            { label: "状态 0", model: "status", tag: "v-text-field"   },
            { label: "创建时间", model: "createAt", tag: "v-text-field"   },
            { label: "操作", model: "operation", tag: "v-text-field"   },
            { label: "操作者userId", model: "operationByUserId", tag: "v-text-field"   },
            { label: "操作者用户名", model: "operationByUser", tag: "v-text-field"   },
            { label: "操作时间", model: "operationAt", tag: "v-text-field"   },

          ], 
          action: [{
            tag: "v-btn",
            value: "新增",
            attrs: {
              color: "success",
              ':small': true,
              '@click': "doUiAction('createItem')"
            }
          }],
        },

      ]
    },
    {
      tag: 'jh-update-drawer',
      key: "update",
      attrs: {},
      title: '编辑导航',
      headSlot: [],
      contentList: [
        { 
          label: "编辑", 
          type: "form", 
          formItemList: [
            { label: "导航名称", model: "navName", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "导航地址", model: "navUrl", tag: "v-text-field"   },
            { label: "导航图标", model: "navIcon", tag: "v-text-field"   },
            { label: "导航描述", model: "navDesc", tag: "v-text-field"   },
            { label: "分类id", model: "categoryId", tag: "v-text-field"   },
            { label: "标签", model: "tags", tag: "v-text-field"   },
            { label: "排序", model: "sort", tag: "v-text-field"   },
            { label: "状态 0", model: "status", tag: "v-text-field"   },
            { label: "创建时间", model: "createAt", tag: "v-text-field"   },
            { label: "操作", model: "operation", tag: "v-text-field"   },
            { label: "操作者userId", model: "operationByUserId", tag: "v-text-field"   },
            { label: "操作者用户名", model: "operationByUser", tag: "v-text-field"   },
            { label: "操作时间", model: "operationAt", tag: "v-text-field"   },

          ], 
          action: [{
            tag: "v-btn",
            value: "编辑",
            attrs: {
              color: "success",
              ':small': true,
              '@click': "doUiAction('updateItem')"
            }
          }],
        },
        { label: "操作记录", type: "component", componentPath: "recordHistory" },
      ]
    },
  ]
  
};

module.exports = content;
