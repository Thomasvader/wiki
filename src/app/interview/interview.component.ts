import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/apiService';
import md from 'markdown-it';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

const markdown = md({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: false,
  typographer: false,
  quotes: '“”‘’',
  highlight: function (/*str, lang*/) { return ''; }
});

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  public InitText: any = "";
  public tempUrl: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('%cinterview组件创建中', 'color: #1976d2');

  }

  public DisplayText(): void {
    this.route.params.subscribe(param => {
      this.tempUrl = `interview/${param.wikiPath}`
    });

    // console.log(`%c${this.tempUrl}  数据请求中`, 'color: #1976d2');
    console.log(this.tempUrl)
    this.api.InterviewTempContent(this.tempUrl).subscribe(response => {
      // console.log(response)
      this.InitText = markdown.render(response);
      
      // console.log(`%c${this.tempUrl} 数据加载完成`, 'color: #1976d2')
    });
  }
  
  ngOnInit() {
    console.log('%cinterview组件载入成功', 'color: #1976d2');

    this.DisplayText();
    setTimeout(() => {
      this.api.HighlightCode();
    }, 800);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.DisplayText();
        setTimeout(() => {
          this.api.HighlightCode();
        }, 800);
      }
    });
  }

}
