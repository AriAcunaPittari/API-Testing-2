import { test, APIRequestContext, request, BrowserContext, Browser } from "@playwright/test";
import { SimpleBooksApiManager } from "./simpleBooksApiManager";
import * as schemaInfo from "./schemas/SimpleBooksApiSchemas";
import { validateSchema } from "../utils/schemaValidator";
import * as fs from 'fs';
import { validateToken } from "../utils/getToken";

const schema = new schemaInfo.Schemas();
let apiManager: SimpleBooksApiManager;
let apiContext: APIRequestContext;
let validToken: string;
let orderID: string;

test.beforeAll(async () => {
  validToken = await validateToken();

  apiContext = await request.newContext({
    baseURL: 'https://simple-books-api.glitch.me',
    extraHTTPHeaders: {
      'Authorization': `Bearer ${validToken}`,
    },
  });

  apiManager = new SimpleBooksApiManager(apiContext);
});

test.describe("API Tests for SimpleBooks", () => {
  test(
    "Get: Status",
    {
      tag: "@Get",
    },
    async () => {
      const status = await apiManager.getSimpleBooksRequest();
      const returnData = await status.getStatus();
      await apiManager.checkGet.positiveCheck(returnData);
    }
  );
  test(
    "Get: List of Books",
    {
      tag: "@Get",
    },
    async () => {
      const listBooks = await apiManager.getSimpleBooksRequest();
      const returnData = await listBooks.getBooks();
      await apiManager.checkGet.positiveCheck(returnData);
      console.log("Return Data:", returnData);
      await validateSchema(false, returnData, schema.booksList);
    }
  );
  test(
    "Get: Single Book",
    {
      tag: "@Get",
    },
    async () => {
      const singleBook = await apiManager.getSimpleBooksRequest();
      const returnData = await singleBook.getBookId();
      await apiManager.checkGet.positiveCheck(returnData);
      console.log("Return Data:", returnData);
      await validateSchema(false, returnData, schema.books);
    }
  );
  test(
    "Get: All Orders",
    {
      tag: "@Get",
    },
    async () => {
      const allOrders = await apiManager.getSimpleBooksRequest();
      const returnData = await allOrders.getAllBookOrder();
      await apiManager.checkGet.positiveCheck(returnData);
      console.log("Return Data:", returnData);
      await validateSchema(false, returnData, schema.ordersList);
    }
  );
  test(
    "Get: Single Book Order",
    {
      tag: "@Get",
    },
    async () => {
      const singleOrder = await apiManager.getSimpleBooksRequest();
      const returnData = await singleOrder.getSingleBookOrder();
      await apiManager.checkGet.positiveCheck(returnData);
      await validateSchema(false, returnData, schema.order);
    }
  );
  test(
    "Post: Create Order",
    {
      tag: "@Post",
    },
    async () => {
      const createOrder = await apiManager.getSimpleBooksRequest();
      const createPayLoad = {
        bookId: 3,
        customerName: "Ariana",
      };
      const returnData = await createOrder.postBookOrder(createPayLoad);
      await apiManager.checkPost.positiveCheck(returnData);
      await validateSchema(false, returnData, schema.createOrder);
    }
    
  );
  test(
    "Patch: Update Order",
    {
      tag: "@Patch",
    },
    async () => {
      const updateOrder = await apiManager.getSimpleBooksRequest();
      const updatePayload = {
        customerName: "Nicolas",
      };
      const returnData = await updateOrder.patchOrder(updatePayload, false);
      await apiManager.checkPatch.patchChecker(returnData);
    }
  );
  test(
    "Delete: Order",
    {
      tag: "@Delete",
    },
    async () => {
      //Cada vez que se borre una orden hay que cambiar el ID en .env
      const deleteOrder = await apiManager.getSimpleBooksRequest();
      const deletePayload = {
        bookId: 1,
        customerName: "Ariana",
      };

      const returnData = await deleteOrder.deleteOrder(deletePayload);
      await apiManager.checkDelete.deleteChecker(returnData);
    }
  );
});
