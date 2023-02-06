import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import PublisherData from './publisher.json';
import GroupData from './group.json';
import AddUnitData from './addunit.json';
import CreavtiveData from './creative.json'
declare module "*.json" {

}
interface publisher {
  id: number;
  name: string;
}
interface groupdisplay {
  id: number;
  name: string;
}
interface addunit {
  id: number;
  name: string;

}
interface creative {
  id: number;
  name: string;
}

@Component({
  selector: 'app-demotable',
  templateUrl: './demotable.component.html',
  styleUrls: ['./demotable.component.css']
})

export class DemotableComponent implements OnInit {

  name = 'Angular';
  lists: publisher[] = PublisherData; //store the publisher Data from json into array
  Group: groupdisplay[] = GroupData;         //store the GroupDisplay Data from json into array  
  add: addunit[] = AddUnitData;        //store the AddUnit Data from json into array  
  create: creative[] = CreavtiveData; // store the creative Data from json into array
  count: number[] = [];

  getvalue(val: any) {
    console.warn(val);
  }

  userForm: FormGroup;
  listData: any;
  constructor(private fb: FormBuilder) {
    this.listData = [{
      publisher: [''], //publisherdropdown
      GroupDisplay: [''], //GroupDisplayDropdown
      AddUnitdrp: [''], //AddUnit Dropdown
      creative: [''],  //Creative Dropdown
      startdate: [''],
      enddate: [''],
      lineitemid: [''],
      camp: [''],
      impr: [''],
      duration: [''],
      range: [''],
      adtype: [''],
      dspid: [''],
      adfee: [''],
    }];
    this.userForm = this.fb.group({
      publisher: ['', Validators.required], //publisherDropdown
      GroupDisplay: ['', Validators.required], //GroupDisplayDropdown
      AddUnitdrp: ['', Validators.required],  //AddUnitDropdown
      creative: ['', Validators.required],  //CreativeDropdown
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      lineitemid: ['', Validators.required],
      camp: ['', Validators.required],
      impr: ['', Validators.required],
      duration: ['', Validators.required],
      range: ['', Validators.required],
      adtype: ['', Validators.required],
      dspid: ['', Validators.required],
      adfee: ['', Validators.required],
    })
  }

  public addItem() {  //function for the add table row
    if (this.count.length < 1000) {
      this.count.push(this.count.length + 1);
    }
    return;
  }
  remove(id: any) {
    if (id == 1) {
      return;
    }
    this.count.pop();

  }
  save(data: object): void // save function for the save the data of form into console.
  {
    console.warn(data)
    this.resetform();

  }

  resetform() {        //function for the reset the value of input fields after save the info
    this.userForm.reset();
  }
  selected(e: any) {
    console.log(e);
  }

  ngOnInit() {

    this.addItem(); //for default input field of data

  }

}
