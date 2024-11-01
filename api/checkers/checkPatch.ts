import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class CheckPatch {
    request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async patchChecker(returnData: APIResponse) {
    await expect(returnData).toBeOK();
  }
}