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
  // peopleStore: any[];

  ngOnInit(): void {

    if(self.indexedDB){
      this.indexedDb = self.indexedDB.open("settleDb", 1);
    }

    // conecta-se ao banco
    this.indexedDb.onupgradeneeded = (event) => {
      // create object from event.target.result
      const data = event.target.result;
      // this.peopleStore = data.createObjectStore('people', {keyPath: 'id', autoIncrement: true});

      const dbStore = data.resultcreateObjectStore("people", {keyPath: 'id', autoIncrement: true});
      dbStore.createIndex('people_id_unqiue', 'id', {unique: true});
      const dataTransaction = this.indexedDb.transaction('people', 'readwrite');
      const dataStore = dataTransaction.objectStore('people');
      dataStore.getAll();
    }

    // usado para criar ou abrir o banco
    this.indexedDb.onsuccess = (event) => {
      //sucesso ao criar/abrir o banco de dados
      let store: IDBDatabase = event.target.result;
      console.info(" indexedDb ", this.indexedDb.result.objectStoreNames);
      const transaction = this.indexedDb.result.transaction('people', 'readwrite');
      const dataStore = transaction.objectStore('people');
      // console.log(" teste ", JSON.stringify(this.settlementForm));
      console.log(" teste ", this.settlementForm); // address // email
      dataStore.add({
        n: this.settlementForm.value.name, 
        m: this.settlementForm.value.email,
        k: this.settlementForm.value.phone,
        a: this.settlementForm.value.address
      });
    }

    this.indexedDb.onerror = (event) => {
      console.info(" Ocorreu um erro ", event.target.result);
    }
    

    this.loadInfoData();
    // this.peopleStore = this.getAllData();
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

  // getAllData(target: string) {
  //   return this.indexedDb.then((db: any) => {
  //     const tx = db.transaction(target, 'readonly');
  //     const store = tx.objectStore(target);
  //     return store.getAll();
  //   });
  // }

  closeAlert():void {
    this.mostrarModalMessage = false;
    this.mensagemModalMessage = '';
  }

}
