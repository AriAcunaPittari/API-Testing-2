import { APIRequestContext } from "@playwright/test";
import { URLNeeded } from "./pages/urlNeeded";
import { SimpleBooksRequest } from "./pages/SimpleBooksApiRequests";
import { CheckDelete } from "./checkers/checkDelete";
import { CheckGet } from "./checkers/checkGet";
import { CheckPatch } from "./checkers/checkPatch";
import { CheckPost } from "./checkers/checkPost";

export class SimpleBooksApiManager {
  request: APIRequestContext;
  urlNeeded: URLNeeded;
  simpleBooksRequest: SimpleBooksRequest;
  checkDelete : CheckDelete;
  checkGet : CheckGet;
  checkPatch: CheckPatch;
  checkPost: CheckPost;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.urlNeeded = new URLNeeded(this.request);
    this.simpleBooksRequest = new SimpleBooksRequest(this.request);
    this.checkDelete = new CheckDelete(this.request);
    this.checkGet = new CheckGet(this.request);
    this.checkPatch = new CheckPatch(this.request);
    this.checkPost = new CheckPost(this.request);
  }
  getUrlNeeded() {
    return this.urlNeeded;
  }
  getSimpleBooksRequest() {
    return this.simpleBooksRequest;
  }
  getCheckDelete() {
    return this.checkDelete;
  }
  getCheckGet() {
    return this.checkGet;
  }
  getCheckPatch() {
    return this.checkPatch;
  }
  getCheckPost() {
    return this.checkPost;
  }
}
