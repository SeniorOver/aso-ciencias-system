import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // 👇 Esta es la función que faltaba
  getData(): { message: string } {
    return { message: '¡Hola! Soy Erick y Gemini desde el Backend en AWS 🚀' };
  }
}
