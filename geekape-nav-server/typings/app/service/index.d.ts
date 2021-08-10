// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportCategory from '../../../app/service/Category';
import ExportCommon from '../../../app/service/Common';
import ExportNav from '../../../app/service/Nav';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    category: AutoInstanceType<typeof ExportCategory>;
    common: AutoInstanceType<typeof ExportCommon>;
    nav: AutoInstanceType<typeof ExportNav>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
