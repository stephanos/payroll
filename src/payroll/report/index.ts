import { Reporter } from './reporter';
import { ITimeReportLoader, PayrollReportService } from './service';


export { IPayrollReport, IPayrollReportEntry } from './model';
export { PayrollReportService } from './service';

export function createPayrollReportService(timeReportLoader: ITimeReportLoader) {
    return new PayrollReportService(timeReportLoader, new Reporter());
}
