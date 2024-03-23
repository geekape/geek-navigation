-- 极客猿导航系统初始化SQL

-- 导航表
CREATE TABLE `nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `navId` varchar(255) NOT NULL COMMENT '导航id',
  `navName` varchar(255) NOT NULL COMMENT '导航名称',
  `navUrl` varchar(255) NOT NULL COMMENT '导航地址',
  `navIcon` varchar(255) NOT NULL COMMENT '导航图标',
  `navDesc` varchar(255) NOT NULL COMMENT '导航描述',
  -- 分类id
  `categoryId` int(11) NOT NULL COMMENT '分类id',
  -- 标签
  `tags` varchar(255) DEFAULT NULL COMMENT '标签',

  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 0:禁用 1:启用',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='导航表';

-- 分类表，有子分类
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` varchar(255) NOT NULL COMMENT '分类名称',
  `categoryName` varchar(255) NOT NULL COMMENT '分类名称',
  `parentId` int(11) NOT NULL DEFAULT '0' COMMENT '父分类id',
  -- 分类图标
  `categoryIcon` varchar(255) NOT NULL COMMENT '分类图标',
  -- 分类描述
  `categoryDesc` varchar(255) NOT NULL COMMENT '分类描述',

  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 0:禁用 1:启用',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='分类表';