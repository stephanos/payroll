import { ITimeReportEntry } from '../track';

import { IPayrollReport } from './model';
import { Reporter } from './reporter';


interface ITimeReportLoader {
    load(): Promise<ITimeReportEntry[]>;
}


class PayrollService {

    constructor(
        private timeReportLoader: ITimeReportLoader,
        private reporter: Reporter,
    ) {}


    public async generateReport(): Promise<IPayrollReport> {
        const entries = await this.timeReportLoader.load();
        return this.reporter.generate(entries);
    }
}


export { PayrollService };
