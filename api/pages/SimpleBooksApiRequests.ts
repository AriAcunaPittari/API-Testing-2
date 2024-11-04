import { APIRequestContext } from "playwright-core";
import { URLNeeded } from "./urlNeeded";

export class SimpleBooksRequest {
  request: APIRequestContext;
  urlNeeded: URLNeeded;
  constructor(request: APIRequestContext) {
    this.request = request;
    this.urlNeeded = new URLNeeded(this.request);
  }
  async getStatus() {
    const requestURL = await this.urlNeeded.urlStatus;
    const response = await this.request.get(requestURL);
    return response;
  }
  async getBooks(json: boolean = false) {
    const requestURL = await this.urlNeeded.urlBooks;
    const response = await this.request.get(requestURL);
    if (json === true) {
      const getBooks = await response.json();
      console.log(response.json());
      return getBooks;
    } else {
      return response;
    }
  }
  async getBookId(json: boolean = false) {
    const requestURL = await this.urlNeeded.urlSingleBook;
    const response = await this.request.get(requestURL);
    if (json === true) {
      const getBooks = await response.json();
      console.log(response.json());
      return getBooks;
    } else {
      return response;
    }
  }
  async postBookOrder(createPayLoad: { bookId: number; customerName: string }) {
    const requestURL = await this.urlNeeded.urlOrders;
    const response = await this.request.post(requestURL, {
      data: createPayLoad,
    });
    return response;
  }
  async getAllBookOrder(json: boolean = false) {
    const requestURL = await this.urlNeeded.urlOrders;
    const response = await this.request.get(requestURL);
    if (json === true) {
      const getBooks = await response.json();
      console.log(response.json());
      return getBooks;
    } else {
      return response;
    }
  }
  async getSingleBookOrder(json: boolean = false) {
    const requestURL = await this.urlNeeded.urlSingleOrder;
    const response = await this.request.get(requestURL);
    if (json === true) {
      const getBooks = await response.json();
      console.log(response.json());
      return getBooks;
    } else {
      return response;
    }
  }
  async patchOrder(updatePayload: { customerName: string },json:boolean=false) {
    const requestURL = await this.urlNeeded.urlSingleOrder!;
    const response = await this.request.patch(requestURL, {
      data: updatePayload,
    });

    if (json===true){
      const patchUpdate = await response.json();
      return patchUpdate;
    }else {
      return response;
    }
  }
  async deleteOrder(deletePayload: { bookId: number; customerName: string }) {
    const requestURL = await this.urlNeeded.urlSingleOrder!;
    const response = await this.request.patch(requestURL, {
      data: deletePayload,
    });
    return response;
  }
}
