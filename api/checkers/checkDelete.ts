import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class CheckDelete {
    request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async deleteChecker(returnData: APIResponse) {
    await expect(returnData).toBeOK();
  }
}