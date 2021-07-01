import path from 'path';
import { createLogger, format, transports } from 'winston';
const PROJECT_ROOT = path.join(__dirname, '..');

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'invoice-generation' },
  transports: [new transports.File({ filename: 'invoiceGeneration.log' })],
});

// A custom logger interface that wraps winston, making it easy to instrument
// code and still possible to replace winston in the future.
export const log = (...args: any[]) => logger.debug.apply(logger, formatLogArguments(args));

export const info = (...args: any[]) => logger.info.apply(logger, formatLogArguments(args));

export const warn = (...args: any[]) => logger.warn.apply(logger, formatLogArguments(args));

export const error = (...args: any[]) => logger.error.apply(logger, formatLogArguments(args));

export const stream = logger.stream;

export default { log, info, warn, error, stream };

/**
 * Attempts to add file and line number info to the given log arguments.
 */
function formatLogArguments(args: any) {
  args = Array.prototype.slice.call(args);

  const stackInfo = getStackInfo(1);

  if (stackInfo) {
    // get file path relative to project root
    const calleeStr = '(' + stackInfo.relativePath + ':' + stackInfo.line + ')';

    if (typeof args[0] === 'string') {
      args[0] = calleeStr + ' ' + args[0];
    } else {
      args.unshift(calleeStr);
    }
  }

  return args;
}

/**
 * Parses and returns info about the call stack at the given index.
 */
function getStackInfo(stackIndex: number) {
  // get call stack, and analyze it
  // get all file, method, and line numbers
  const stacklist = new Error().stack.split('\n').slice(3);

  if (stacklist) {
    // stack trace format:
    // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
    // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
    const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

    const s = stacklist[stackIndex] || stacklist[0];
    const sp = stackReg.exec(s) || stackReg2.exec(s);

    if (sp && sp.length === 5) {
      return {
        method: sp[1],
        relativePath: path.relative(PROJECT_ROOT, sp[2]),
        line: sp[3],
        pos: sp[4],
        file: path.basename(sp[2]),
        stack: stacklist.join('\n'),
      };
    }
  }
}
