import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  constructor() {
    console.log('%cfeatures 首页内容创建中', 'color: #d43cc8');
  }
  
  ngOnInit() {
    console.log('%cfeatures 首页内容加载成功', 'color: #d43cc8');
  }

}
