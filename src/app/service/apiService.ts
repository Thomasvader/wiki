import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiStructure } from "../Serialization/Structure";
import { Observable } from "rxjs";
import * as hljs from 'highlight.js';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * MenuHomeS
   */
  public MenuHomeS() {
    let pres: any = document.querySelector('#Menu');
    let absoluteC: any = document.querySelector('.absolute-C');

    pres.onclick = function () {
      let aria = this.getAttribute('aria-expanded');
      
      if (aria === "false") {
        this.setAttribute('aria-expanded', true);
        absoluteC.className = 'absolute-C absolute-active';
      } else {
        this.setAttribute('aria-expanded', false);
        absoluteC.className = 'absolute-C';
      }

    }
  }

  /**
   * HighlightCode
   * 
   * 使用方法
   * setTimeout(() => {
   *   this.api.HighlightCode();
   * }, 400/自定义);
   */
  public HighlightCode() {
    let pres: any = document.querySelectorAll("pre>code");
    for (var i = 0; i < pres.length; i++) {
      hljs.highlightBlock(pres[i]);
    }
  }
  
  /**
   * InterviewTempContent
   */
  public InterviewTempContent(QueryParameters: string) {
    return this.http.get(
      `https://aftersoil.github.io/Home/${QueryParameters}`,
      {
        responseType: "text"
      }
    );
  }

  /**
   * 
   */
  public StructureCallApi(): Observable<ApiStructure> {
    return this.http.get<ApiStructure>('https://aftersoil.github.io/Home/structure.json');
  }
  
}
