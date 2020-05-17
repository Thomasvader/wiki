import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  friendlyAddressUrl: object[] = [
    { "title": "Aftersoil", "href": "https://github.com/Aftersoil/" },
    { "title": "Wiki", "href": "./" },
    { "title": "Issues", "href": "https://github.com/Aftersoil/Home/issues/new" },
    { "title": "Github", "href": "https://github.com/Aftersoil/" },
  ];
  
  constructor(
    private router: Router
  ) {
    console.log(`%c${router.url.split('/')[1]}底部组件创建中`, 'color: #f00');
  }

  ngOnInit() {
    console.log(`%c${this.router.url.split('/')[1]}底部组件载入/创建成功`, 'color: #f00');
  }

  ngOnDestroy() {
    console.log(`%c${this.router.url.split('/')[1]}底部组件已销毁`, 'color: #f00')
  }

}
