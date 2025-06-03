export type DeepPartial<T> =
  // Preserve Date, RegExp, Map, Set, etc. as-is (with optionality)
  T extends Date | RegExp | File | Blob | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>
    ? T | undefined
    : T extends Array<infer U>
      ? Array<DeepPartial<U>> | undefined
      : T extends object
        ? {
            [K in keyof T]?: DeepPartial<T[K]>;
          }
        : T;
