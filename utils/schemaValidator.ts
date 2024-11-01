import { APIResponse } from "playwright-core";
import { ZodType } from "zod";

export async function validateSchema(useData:boolean,response: APIResponse, schema: ZodType) {
  const data = await response.json();
  if (useData===false) {
    await schema.parse(data);
  } else {
    await schema.parse(data.data);
  }
}