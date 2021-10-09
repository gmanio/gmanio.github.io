export type BaseApiResponseType = {
  error: boolean;
  errorMessage: string | unknown;
  result: any;
  statusCode: number;
};
