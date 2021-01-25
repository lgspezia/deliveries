import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Settlement } from '../../models/settlement';
import { FormGroup, FormBuilder } from  '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-settlement-detail',
  templateUrl: './settlement-detail.component.html',
  styleUrls: ['./settlement-detail.component.css']
})


export class SettlementsDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    private dbService: NgxIndexedDBService) {
    this.criaFormSettlement();
  }

  settlement: Settlement;
  settlementForm: FormGroup;
  possuiItemSalvo: boolean;
  mostrarModalMessage: boolean = false;
  mensagemModalMessage: string = '';
  indexedDb: any;
  peopleStore: any[];

  ngOnInit(): void {

    if(self.indexedDB){
      console.log('IndexedDB is supported');
      this.indexedDb = self.indexedDB.open("settleDb", 1);
    }

    this.indexedDb.onupgradeneeded = (event) => {
      // create object store from db or event.target.result
      const data = event.target.result;
      this.peopleStore = data.createObjectStore('people', {keyPath: 'id'});

      const dbStore = data.resultcreateObjectStore("people", {keyPath: 'id'});
      dbStore.createIndex('people_id_unqiue', 'id', {unique: true});
      const dataTransaction = this.indexedDb.transaction('people', 'readwrite');
      const dataStore = dataTransaction.objectStore('people');
      dataStore.getAll();
    }

    this.indexedDb.onsuccess = (event) => {
      //sucesso ao criar/abrir o banco de dados
      let store: IDBDatabase = event.target.result;
      // store = event.target.result;
      console.info(" indexedDb ", this.indexedDb.result.objectStoreNames);

      const data = event.target.result;
      const transaction = this.indexedDb.result.transaction('people', 'readwrite');
      const dataStore = transaction.objectStore('people');
      // dataStore.add();

      // self.localStorage.forEach((element) => {
      //   dataStore.add(element);
      // });
    }

    this.indexedDb.onerror = (event) => {
      //erro ao criar/abrir o banco de dados
      console.info(" Ocorreu um erro ", event.target.result);
    }

    this.loadInfoData();
  }

  criaFormSettlement(): void {
    this.settlementForm = this.formBuilder.group({
      name: [''],
      cidade: [''],
      address: [''],
      banco: [''],
      tipoConta: [''],
      cpfCnpj: [''],
      agencia: [''],
      agenciaDv: [''],
      conta: [''],
      contaDv: [''],
      formaPgto: [''],
      pago: [false],
      phone: [''],
      email: [''],
      latitude: [''],
      longitude: ['']
    });
  }

  loadInfoData(): void {
    let self = this;
    this.route.queryParams.subscribe(params => {
      self.settlement = JSON.parse(params.settlement);
      let itemSalvo = JSON.parse(localStorage.getItem('settlement-'+self.settlement.id));
      let dados;
      if(itemSalvo) {
        dados = itemSalvo;
        this.possuiItemSalvo = true;
      } else {
        dados = self.settlement;
        this.possuiItemSalvo = false;
      }
      self.settlementForm.setValue({
        name: dados.name || '',
        cidade: dados.cidade || '',
        address: dados.address || '',
        banco: dados.banco || '',
        tipoConta: dados.tipoConta || '',
        cpfCnpj: dados.cpfCnpj || '',
        agencia: dados.agencia || '',
        agenciaDv: dados.agenciaDv || '',
        conta: dados.conta || '',
        contaDv: dados.contaDv || '',
        formaPgto: dados.formaPgto || '',
        pago: dados.pago || '',
        phone: dados.phone || '',
        email: dados.email || '',
        latitude: dados.latitude || '',
        longitude: dados.longitude || ''
      });
    });
  }

  updateItem():void {
    if(this.possuiItemSalvo) {
      localStorage.removeItem('settlement-'+this.settlement.id);
    }
    localStorage.setItem('settlement-'+this.settlement.id,
      JSON.stringify(this.settlementForm.value));
    this.settlement.name = this.settlementForm.value.name;
    this.mensagemModalMessage = 'Os dados foram atualiados.';
    this.mostrarModalMessage = true;
  }

  closeAlert():void {
    this.mostrarModalMessage = false;
    this.mensagemModalMessage = '';
  }

}
