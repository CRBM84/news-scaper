import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("usage_log")
export class UsageLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    filterType: 'long_title' | 'short_title' | 'data_scrape';

    @Column({ type: 'integer', nullable: true })
    resultCount: number;

    @Column()
    success: boolean;

    @Column({ length: 500, nullable: true })
    errorMessage: string;

    @Column({ type: 'integer', nullable: true })
    responseTime: number;

    @CreateDateColumn()
    createdAt: Date;
}