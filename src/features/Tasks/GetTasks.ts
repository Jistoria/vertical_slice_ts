import { Controller, Get, Body, Injectable, Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { query } from 'express';
import { Repository, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, In } from 'typeorm';

// Entidad Task
@Entity('tasks')
class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column('text')
    description: string;

    @CreateDateColumn()
    created_at: Date;

}

@Injectable()
class GetTasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async execute(): Promise<Task[]> {
        return await this.taskRepository.find();
    }
}

@Controller('tasks')
class GetTasksController {
    constructor(private readonly getTasksService: GetTasksService) {}

    @Get()
    async handle() {
        return await this.getTasksService.execute();
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [GetTasksService],
    controllers: [GetTasksController],
})
class GetTasksModule {}

export { GetTasksModule, Task };