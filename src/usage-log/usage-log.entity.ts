import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("usage_log") export class UsageLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    filterType: 'long_title' | 'short_title' | 'data_scrape';

    @Column({ type: 'integer' })
    resultCount: number;

    @Column({ length: 150 })
    userAgent: string;

    @Column({ length: 50 })
    ipAddress: string;

    @Column()
    sucess: boolean

    @Column({ length: 500 })
    errorMessage: string;

    @Column({ type: 'integer' })
    responseTime: number;

    @CreateDateColumn()
    createdAt: Date;

}