import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() viewMovie :any
  @Output() goBackState = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(this.viewMovie ,"uuuuuuuuu")
  }

  goBack(){
    this.goBackState.emit("back");
  }

}
