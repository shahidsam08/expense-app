import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000)
  
}
bootstrap()
// this  is main entry point in the nest js app.


