import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/apiService';

@Component({
  selector: 'app-media-menu',
  templateUrl: './media-menu.component.html',
  styleUrls: ['./media-menu.component.css']
})
export class MediaMenuComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.api.MenuHomeS();
    }, 800);
  }

}
