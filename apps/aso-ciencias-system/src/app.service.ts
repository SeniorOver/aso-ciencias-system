import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World en breve vamos a subirlo a la nube!';
  } 
}
