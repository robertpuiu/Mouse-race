import { GameController } from './game/game.controller';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StartController } from './start/start.controller';
import { StartService } from './start/start.service';
import { GameService } from './game/game.service';
import { ShapesController } from './shapes/shapes.controller';
import { ShapesService } from './shapes/shapes.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
  ],
  controllers: [StartController, GameController, ShapesController],
  providers: [StartService, GameService, ShapesService],
})
export class AppModule {}
