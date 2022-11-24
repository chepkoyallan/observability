export const logger = {
    error: (...args: any[]) => {
      // tslint:disable-next-line:no-console
      console.error(...args);
    },
    warn: (...args: any[]) => {
      // tslint:disable-next-line:no-console
      console.warn(...args);
    },
    verbose: (...args: any[]) => {
      // tslint:disable-next-line:no-console
      console.log(...args);
    },
  };
  