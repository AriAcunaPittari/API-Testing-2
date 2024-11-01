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
    // Obtener el status
    const requestURL = await this.urlNeeded.urlStatus;
    const response = await this.request.get(requestURL);
    return response;
  }
  async getBooks(json: boolean = false) {
    // Obtener la lista de Libros
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
    // Obtener UN solo libro por el ID.
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
    // Crear una nueva orden de "compra"
    const requestURL = await this.urlNeeded.urlOrders;
    const response = await this.request.post(requestURL, {
      data: createPayLoad,
    });
    return response;
  }
  async getAllBookOrder(json: boolean = false) {
    // Obtener todas las ordenes de compra.
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
    // Obtener solo una orden de compra.
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
    // Actualizar una orden de compra.
    const requestURL = await this.urlNeeded.urlOrders!;
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
    // Borrar una orden de compra.
    const requestURL = await this.urlNeeded.urlOrders!;
    const response = await this.request.patch(requestURL, {
      data: deletePayload,
    });
    return response;
  }
}
