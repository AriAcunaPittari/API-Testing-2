import { request } from '@playwright/test';
import * as fs from 'fs';

const tokenFilePath = "./token.json";

export async function validateToken(validToken: boolean = true): Promise<string> {
  if (validToken && fs.existsSync(tokenFilePath)) {
    const savedTokenData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));
    const token = savedTokenData.token;
    const tempContext = await request.newContext({
      baseURL: 'https://simple-books-api.glitch.me/',
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await tempContext.get('/status');
    await tempContext.dispose();

    if (response.ok()) {
      return token;
    } 
  }
    const newToken = await getNewToken();
    fs.writeFileSync(tokenFilePath, JSON.stringify({ token: newToken }));
    return newToken;
  
}

export async function getNewToken(): Promise<string> {
  const tempContext = await request.newContext({
    // no le puse el process.env.URL_HOME porque pro algun motivo me daba error 
    baseURL: 'https://simple-books-api.glitch.me/',
  });
  

  const response = await tempContext.post('https://simple-books-api.glitch.me/api-clients', {
    data: {
      clientName: process.env.NEW_USERNAME!,
      clientEmail: process.env.NEW_EMAIL!,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const responseData = await response.json();
  await tempContext.dispose();
  return responseData.token;
}