import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaskModule, Task } from './features/Tasks/CreateTask';
import { GetTasksModule } from './features/Tasks/GetTasks';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pgadmin',
      database: 'test',
      entities: [Task],
      synchronize: true,
    }),
    CreateTaskModule,
    GetTasksModule,
  ],
})
export class AppModule {}
