import { Controller, Post, Body, Injectable, Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, MaxLength, IsInt } from 'class-validator';

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

    //   @ManyToOne(() => User)
    //   user: User;
}

// DTO CreateTaskDto
class CreateTaskDto {
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsNotEmpty()
    description: string;

    // @IsInt()
    // userId: number;
}

// Repositorio TaskRepository
@Injectable()
class TaskRepository {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async save(task: Task): Promise<Task> {
        return await this.taskRepository.save(task);
    }
}

// Servicio CreateTaskService
@Injectable()
class CreateTaskService {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        console.log(title, description);
        const task = new Task();
        task.title = title;
        task.description = description;
        return await this.taskRepository.save(task);
    }
}

// Controlador CreateTaskController
@Controller('tasks')
class CreateTaskController {
    constructor(private readonly createTaskService: CreateTaskService) {}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.createTaskService.execute(createTaskDto);
    }
}

// Módulo CreateTaskModule
@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskRepository, CreateTaskService],
    controllers: [CreateTaskController],
})
class CreateTaskModule {}

// Exportar el módulo para ser usado en AppModule
export { CreateTaskModule, Task };
