import { Component, OnInit } from '@angular/core';
import md from 'markdown-it';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
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
  selector: 'app-docx',
  templateUrl: './docx.component.html',
  styleUrls: ['./docx.component.css']
})
export class DocxComponent implements OnInit {
  public InitText: any = "";
  public tempUrl: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public DisplayText(): void {
    this.route.params.subscribe(param => {
      this.tempUrl = `docs/${param.wikiPath}`
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
