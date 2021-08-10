// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/middleware/auth';
import ExportError from '../../../app/middleware/error';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    error: typeof ExportError;
  }
}
