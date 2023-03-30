import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/server/app/app.module";
import * as http from "http";
import { NextApiHandler } from "next";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export module Main {
  let app: INestApplication;

  export async function getApp() {
    if (!app) {
      app = await NestFactory.create(AppModule, { bodyParser: false });

      const config = new DocumentBuilder()
        .setTitle('Swagger Example')
        .setDescription('Swagger study API description')
        .setVersion('1.0.0')
        .addTag('swagger')
        .build();

      // config를 바탕으로 swagger document 생성
      const document = SwaggerModule.createDocument(app, config);
      // Swagger UI에 대한 path를 연결함
      // .setup('swagger ui endpoint', app, swagger_document)
      SwaggerModule.setup('api', app, document);

      //app.setGlobalPrefix("api");
      await app.init();
    }

    return app;
  }

  export async function getListener() {
    const app = await getApp();
    const server: http.Server = app.getHttpServer();
    const [listener] = server.listeners("request") as NextApiHandler[];

    return listener;
  }
}