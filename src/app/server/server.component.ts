import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit{
    serverId: number;
    serverStatus: string;

    ngOnInit(): void {
        this.setServerId(10);
        this.setServerStatus(Math.random() > 0.5 ? 'online' : 'offline')
    }

    private setServerId(id: number): void {
        this.serverId = id;
    }

    private setServerStatus(status: string): void {
        this.serverStatus = status;
    }
}