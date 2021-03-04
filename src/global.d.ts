declare module '*.json' {
  const value: Record<string, unknown>;
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