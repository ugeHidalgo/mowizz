import { Component, OnInit, HostBinding } from '@angular/core';

import { GlobalsService } from '../globals/globals.service';

import { slideInDownAnimation } from '../animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class DashboardComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  constructor(protected globals: GlobalsService) { }

  ngOnInit() {
  }
}
