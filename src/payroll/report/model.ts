interface IPayrollReportEntry {
    employeeId: number;
    amount: number;
    payPeriod: {
        begin: Date;
        end: Date;
    };
}

interface IPayrollReport {
    entries: IPayrollReportEntry[];
}


export {
    IPayrollReport,
    IPayrollReportEntry,
};
