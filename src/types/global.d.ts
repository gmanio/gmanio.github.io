declare module '*.json' {
  const value: any;
  export default value;
}
declare module '*.png' {
  const value: string;
  export = value;
}
declare module '*.jpg' {
  const value: string;
  export = value;
}
declare module '*.svg' {
  const value: string;
  export = value;
}
declare module '*.gif' {
  const value: string;
  export = value;
}

declare module 'ace-builds/src-min-noconflict/ace' {}

export {};
