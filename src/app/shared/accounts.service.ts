import { Injectable, EventEmitter } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable()
export class AccountsService {
    statusUpdated = new EventEmitter<string>();

    constructor(private loggingService: LoggingService) {}
    
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
    ];

    addAccount(name: string, status: string): void {
        this.accounts.push({name, status})
        this.loggingService.logStatusChange(status);
    
    }

    updateStatus(id: number, status: string): void {
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
    }
}