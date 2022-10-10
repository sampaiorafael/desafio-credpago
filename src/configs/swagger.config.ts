import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export default class SwaggerConfig {
  static init(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('Desafio Credpago')
      .setDescription('API Desafio')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document, {
      explorer: false,
    });
  }
}
