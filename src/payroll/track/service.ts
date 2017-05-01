import { ITimeReport, ITimeReportEntry } from './model';
import { Parser } from './parser';
import { Repository } from './repository';


class PayrollTimeTrackService {

    constructor(
        public parser: Parser,
        public repository: Repository,
    ) {}


    public async import(report: ITimeReport) {
        await this.repository.save(report);
    }

    public async importCSV(csv: string) {
        await this.import(this.parser.parseCSV(csv));
    }

    public async load(): Promise<ITimeReportEntry[]> {
        return await this.repository.load();
    }
}


export {
    ITimeReport,
    ITimeReportEntry,
    PayrollTimeTrackService,
};
