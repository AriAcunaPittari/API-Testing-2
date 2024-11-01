import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class CheckPost {
    request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async positiveCheck(returnData: APIResponse) {
    await expect(returnData).toBeOK();
  }
  async negativeCheck(returnData: APIResponse) {
    await expect(returnData.status()).toBe(400);
  }
}