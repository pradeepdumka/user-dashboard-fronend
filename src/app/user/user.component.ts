import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  selectedTab : number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  registerAction(action:any): void{
       this.selectedTab = action;
  }
  loginAction(action:any): void{
    this.selectedTab = action;
  }
   onTabClick(event: any): void { 
     console.log(event.index)
     this.selectedTab = event.index;
  }
}
