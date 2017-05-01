import { Database } from '../../data/database';

import { Parser } from './parser';
import { Repository } from './repository';
import { PayrollTimeTrackService } from './service';


export { ITimeReport, ITimeReportEntry } from './model';
export { PayrollTimeTrackService } from './service';

export function createPayrollTimeTrackService(db: Database) {
    return new PayrollTimeTrackService(new Parser(), new Repository(db));
}
