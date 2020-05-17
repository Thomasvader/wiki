import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import md from 'markdown-it';
import { ApiService } from '../service/apiService';

const markdown = md({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  tables: true,
  linkify: false,
  typographer: false,
  quotes: '“”‘’',
  highlight: function (/*str, lang*/) { return ''; }
});

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.css']
})
export class CultureComponent implements OnInit {
  public InitText: any = "";
  private tempUrl: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public DisplayText(): void {
    this.route.params.subscribe(param => {
      this.tempUrl = `culture/${param.wikiPath}`
    });

    this.api.InterviewTempContent(this.tempUrl).subscribe(response => {
      // console.log(response)
      this.InitText = markdown.render(response);
    });
  }
  
  ngOnInit() {
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
