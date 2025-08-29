import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    rank: number;

    @Column()
    points: number;

    @Column()
    comments: number;

    @CreateDateColumn()
    createdAt: Date;
}