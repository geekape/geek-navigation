// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCategory from '../../../app/controller/category';
import ExportCommon from '../../../app/controller/common';
import ExportNav from '../../../app/controller/nav';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    category: ExportCategory;
    common: ExportCommon;
    nav: ExportNav;
    user: ExportUser;
  }
}
