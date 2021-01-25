import { Component, OnInit, Input } from '@angular/core';
import { Settlement } from '../../models/settlement';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-settlement',
  templateUrl: './card-settlement.component.html',
  styleUrls: ['./card-settlement.component.css']
})
export class CardSettlementComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() settlement: Settlement;

  ngOnInit(): void {
    this.readItem();
  }

  expandDetails(): void {
    this.router.navigate(['/settlement-detail'], { queryParams: { settlement: JSON.stringify(this.settlement) }});
  }

  readItem() {
    let itemSalvo: Settlement =
      JSON.parse(localStorage.getItem('settlement-'+this.settlement.id));

      if(itemSalvo) {
      this.settlement.address = itemSalvo.address;
      this.settlement.cidade = itemSalvo.cidade;
      this.settlement.name = itemSalvo.name;
      this.settlement.phone = itemSalvo.phone;
      this.settlement.email = itemSalvo.email;
    }
  }

}
