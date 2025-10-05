export interface Apiresponse<T> {
  success:boolean;
  message:string;
  data: T;
}

