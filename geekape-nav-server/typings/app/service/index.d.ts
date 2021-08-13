// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportCategory from '../../../app/service/Category';
import ExportNav from '../../../app/service/Nav';
import ExportTag from '../../../app/service/Tag';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    category: AutoInstanceType<typeof ExportCategory>;
    nav: AutoInstanceType<typeof ExportNav>;
    tag: AutoInstanceType<typeof ExportTag>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
