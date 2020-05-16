import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean;
  serverCreationStatus: string;
  serverName: string;
  serverCreated: boolean;
  servers: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setAllowNewServer(false);
    this.setServerCreationStatus('No server was created');
    this.setServerName('');
    this.setServerCreated(false);
  }

  private setAllowNewServer(allowNewServer: boolean): void {
    this.allowNewServer = allowNewServer;
  }

  private setServerCreationStatus(serverCreationStatus: string): void {
    this.serverCreationStatus = serverCreationStatus;
  }

  private setServerName(serverName: string): void {
    this.serverName = serverName;
  }

  private setServerCreated(serverCreated: boolean): void {
    this.serverCreated = serverCreated;
  }

  onCreateServer(): void {
    this.setServerCreated(true);
    this.servers.push(this.serverName);
    this.setServerCreationStatus('Server was created! The name is ' + this.serverName);
  }

  onUpdateServerName(event: Event): void {
    this.setServerName((<HTMLInputElement>event.target).value);
  }

  onRemoveServer(index: number): void {
    this.servers.splice(index, 1);
  }

}
