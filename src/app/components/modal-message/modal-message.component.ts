import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent implements OnInit {

  constructor() { }

  @Input() mensagem: string = '';
  @Output() closeAlert = new EventEmitter();

  ngOnInit(): void {
  }

  closeModalMessage() {
    this.closeAlert.emit();
  }

}
