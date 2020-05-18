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
