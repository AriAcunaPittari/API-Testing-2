import { APIRequestContext } from "playwright-core";

export class URLNeeded {
  request: APIRequestContext;
  urlHome: string;
  urlStatus: string;
  urlSingleBook: string;
  urlBooks: string;
  urlOrders: string;
  urlSingleOrder: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.urlHome = process.env.URL_HOME!;
    this.urlStatus = process.env.URL_GET_STATUS!;
    this.urlSingleBook = process.env.URL_GET_SINGLE_BOOK!;
    this.urlBooks = process.env.URL_GET_BOOKS!;
    this.urlOrders = process.env.URL_ORDERS!;
    this.urlSingleOrder = process.env.URL_SINGLE_ORDER!;
  }
}
