import { Component, OnInit } from '@angular/core';
import { FabricJsService } from 'src/app/services/board/fabric-js.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {

  constructor(readonly fabricService: FabricJsService){
  }
  ngOnInit(): void {
    this.fabricService.initCanvas();
  }
}
