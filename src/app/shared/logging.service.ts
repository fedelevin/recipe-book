export class LoggingService {
    logStatusChange(status: string): void {
        console.log('A server status changed, new status: ' + status);
    }

    logError(): void {
        console.log('Error!');
    }
}