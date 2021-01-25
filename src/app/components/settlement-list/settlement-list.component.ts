import { Component, OnInit } from '@angular/core';
import { Settlement } from '../../models/settlement';
import { SettlementListService } from '../../services/settlement-list.service';

@Component({
  selector: 'app-settlement-list',
  templateUrl: './settlement-list.component.html',
  styleUrls: ['./settlement-list.component.css']
})

export class SettlementListComponent implements OnInit {
  settlements: Settlement[];
  loadingList: boolean = true;

  constructor(private SettlementListService: SettlementListService) { }

  ngOnInit(): void {
    this.getSettlementList();
  }

  getSettlementList(): void {
    this.SettlementListService.getsettlements().subscribe(
      settlements => {
        this.settlements = settlements['establishments'];
        this.loadingList = false;
      }
    );
  }

}
