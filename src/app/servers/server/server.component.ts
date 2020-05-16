import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  paramsSubscription: Subscription;

  constructor(private serversService: ServersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
    // const id = +this.activatedRoute.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);

    // this.activatedRoute.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
  }

  onEdit(): void {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParamsHandling: 'preserve'});
  }

}
