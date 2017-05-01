import { PayrollReportService } from '../payroll/report';
import { PayrollTimeTrackService } from '../payroll/track';

import { Router } from './router';
import { Server } from './server';


export { Server } from './server';

export function createServer(track: PayrollTimeTrackService, report: PayrollReportService) {
    return new Server(new Router(track, report));
}
