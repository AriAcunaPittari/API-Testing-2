import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class CheckGet {
    request: APIRequestContext;
    statusNotFound: number;
  constructor(request: APIRequestContext) {
    this.request = request;
    this.statusNotFound = 404;
  }
  async positiveCheck(returnData: APIResponse) {
    await expect(returnData).toBeOK();
  }
  async notFoundCheck(returnData: APIResponse) {
    await expect(returnData.status()).toBe(this.statusNotFound);
  }
}