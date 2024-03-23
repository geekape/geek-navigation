const content = {
  pageType: "jh-page", pageId: "categoryManagement", table: "category", pageName: "分类管理",
  resourceList: [
    {
      actionId: "selectItemList",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅查询列表-category",
      resourceData: {
        table: "category",
        operation: "select"
      }
    },
    {
      actionId: "insertItem",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅添加-category",
      resourceHook: {
        before: [
          { service: 'common', serviceFunction: 'generateBizIdOfBeforeHook'}
        ]
      },
      resourceData: {
        table: "category",
        operation: "jhInsert"
      }
    },
    {
      actionId: "updateItem",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅更新-category",
      resourceData: {
        table: "category",
        operation: "jhUpdate"
      }
    },
    {
      actionId: "deleteItem",
      resourceType: "sql",
      resourceHook: {},
      desc: "✅删除-category",
      resourceData: {
        table: "category",
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
    { tag: 'jh-page-title', value: "category", attrs: { cols: 12, sm: 6, md:4 }, helpBtn: true, slot: [] },
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
        { text: "分类id", value: "categoryId", type: "v-text-field", width: 80, sortable: true },
        { text: "分类名称", value: "categoryName", type: "v-text-field", width: 80, sortable: true },
        { text: "分类图标", value: "categoryIcon", type: "v-text-field", width: 80, sortable: true },
        { text: "创建时间", value: "createAt", type: "v-text-field", width: 80, sortable: true },
        { text: "操作", value: "operation", type: "v-text-field", width: 80, sortable: true },
        { text: "操作者用户名", value: "operationByUser", type: "v-text-field", width: 80, sortable: true },
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
      title: '新增班级',
      headSlot: [],
      contentList: [
        {
          label: "新增",
          type: "form",
          formItemList: [
            { label: "分类ID", model: "categoryId", tag: "v-text-field", idGenerate: { prefix: 'FR', bizId: 'categoryId', startValue: 1000 }, hidden: true  },
            { label: "分类名称", model: "categoryName", tag: "v-text-field", rules: "validationRules.requireRules"  },
            { label: "父分类id", model: "parentId", tag: "v-text-field"   },
            { label: "分类图标", model: "categoryIcon", tag: "v-text-field"   },
            { label: "分类描述", model: "categoryDesc", tag: "v-text-field"   },
            { label: "排序", model: "sort", tag: "v-text-field"   },
            { label: "状态 0", model: "status", tag: "v-text-field"   },
            { label: "创建时间", model: "createAt", tag: "v-text-field"   },

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
      title: '编辑班级',
      headSlot: [],
      contentList: [
        {
          label: "编辑",
          type: "form",
          formItemList: [
            { label: "分类名称", model: "categoryName", tag: "v-text-field", rules: "validationRules.requireRules",   },
            { label: "父分类id", model: "parentId", tag: "v-text-field"   },
            { label: "分类图标", model: "categoryIcon", tag: "v-text-field"   },
            { label: "分类描述", model: "categoryDesc", tag: "v-text-field"   },
            { label: "排序", model: "sort", tag: "v-text-field"   },
            { label: "状态 0", model: "status", tag: "v-text-field"   },
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
