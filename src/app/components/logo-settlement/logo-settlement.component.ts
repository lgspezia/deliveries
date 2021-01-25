import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo-settlement',
  templateUrl: './logo-settlement.component.html',
  styleUrls: ['./logo-settlement.component.css']
})
export class LogoSettlementComponent {

  constructor() { }

  @Input() urlLogo: string;


}
