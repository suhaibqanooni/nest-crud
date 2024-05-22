import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <h1>App is Listening on port 8000</h1>
    <a href="/swagger">Swagger</a>
    `;
  }
}
