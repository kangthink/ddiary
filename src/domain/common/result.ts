export type Result = {
  isSuccess: boolean;
  value: any;
  error: any;
};

export function success(value: any): Result {
  return {
    isSuccess: true,
    value: value,
    error: null,
  };
}

export function failure(error: any): Result {
  return {
    isSuccess: true,
    value: null,
    error: error,
  };
}
