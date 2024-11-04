import { z } from "zod";

export class Schemas {
  books = z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    available: z.boolean(),
  });
  booksList = z.array(this.books);

  order = z.object({
    id: z.string(),
    bookId: z.number(),
    customerName: z.string(),
    createdBy: z.string(),
    quantity: z.number(),
    timestamp: z.number()
  });
  ordersList = z.array(this.order);

  createOrder = z.object({
    created: z.boolean(),
    orderId: z.string(),
  });

  updateOrder = z.object({
    customerName: z.string(),
  });
}
