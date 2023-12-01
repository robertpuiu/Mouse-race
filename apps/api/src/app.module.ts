import { GameController } from './game/game.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StartController } from './start/start.controller';
import { StartService } from './start/start.service';
import { GameService } from './game/game.service';
import { ElementsController } from './elements/elements.controller';
import { ElementsService } from './elements/elements.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
  ],
  controllers: [
    AppController,
    StartController,
    GameController,
    ElementsController,
  ],
  providers: [AppService, StartService, GameService, ElementsService],
})
export class AppModule {}
