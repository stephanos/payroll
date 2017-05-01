class DuplicateReportError extends Error {

    constructor(id: number) {
        super(`duplicate report: already have a report with ID '${id}'`);
    }
}


export { DuplicateReportError };
