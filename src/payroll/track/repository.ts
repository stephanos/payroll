import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { ITimeReport, ITimeReportEntry } from './model';

import { Database } from '../../data/database';


@Entity()
class TimeReport {

    @PrimaryColumn('int')
    public id: number;

    @Column('date')
    public createdAt: Date;
}

@Entity()
class TimeReportEntry {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('int')
    public reportId: number;

    @Column('int')
    public employeeId: number;

    @Column('float')
    public hoursWorked: number;

    @Column('date')
    public date: Date;

    @Column('string')
    public jobGroup: string;
}


class Repository {

    constructor(
        private database: Database,
    ) {
        this.database.registerEntity(TimeReport);
        this.database.registerEntity(TimeReportEntry);
    }

    public async save(report: ITimeReport) {
        const connection = await this.database.getConnection();
        await connection.entityManager.transaction(async (entityManager) => {
            const reportEntity = new TimeReport();
            reportEntity.createdAt = new Date();
            reportEntity.id = report.id;
            await entityManager.persist(reportEntity);

            const reportEntryEntities: TimeReportEntry[] =
                report.entries.map((entry) => {
                    const entity = new TimeReportEntry();
                    entity.date = entry.date;
                    entity.employeeId = entry.employeeId;
                    entity.hoursWorked = entry.hoursWorked;
                    entity.jobGroup = entry.jobGroup;
                    entity.reportId = report.id;
                    return entity;
                });
            await entityManager.persist(reportEntryEntities);
        });
    }

    public async load(): Promise<ITimeReportEntry[]> {
        const connection = await this.database.getConnection();
        const entries = await connection.getRepository(TimeReportEntry).find();
        return entries.map((entry) => ({
            date: entry.date,
            employeeId: entry.employeeId,
            hoursWorked: entry.hoursWorked,
            jobGroup: entry.jobGroup,
        }));
    }
}


export {
    Repository,
    TimeReport,
    TimeReportEntry,
};
