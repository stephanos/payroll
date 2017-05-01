import { Database } from './data';
import { createPayrollReportService } from './payroll/report';
import { createPayrollTimeTrackService } from './payroll/track';
import { createServer } from './web';


function init() {
    const db = new Database();
    const payrollTimeTrackService = createPayrollTimeTrackService(db);
    const payrollReportService = createPayrollReportService(payrollTimeTrackService);
    const server = createServer(payrollTimeTrackService, payrollReportService);
    server.start();
}

init();
