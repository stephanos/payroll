interface ITimeReportEntry {
    employeeId: number;
    date: Date;
    hoursWorked: number;
    jobGroup: string;
}

interface ITimeReport {
    id: number;
    entries: ITimeReportEntry[];
}


export {
    ITimeReport,
    ITimeReportEntry,
};
