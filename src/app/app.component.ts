import {MediaMatcher} from '@angular/cdk/layout';
import { Component, HostListener, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { routeAnimation } from './animations';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiService } from './service/apiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routeAnimation
  ]
})
  
export class AppComponent implements OnDestroy  {
  mobileQuery: MediaQueryList;
  matIconButtonActive: boolean = false;
  routerState: boolean = true;
  private path: string = "";
  public matListItemData = {};
  public active: boolean = false;
  public matSidenavMode: boolean = false;
  // get SecondaryData
  @ViewChild('SecondaryData')
  SecondaryData: ElementRef;

  @HostListener('window.beforeinstallprompt')
  beforeinstallprompt(event) {
    console.log(event);
    event.preventDefault();
    return false;
  }
  
  // 构造方法
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private location: Location,
    private router: Router,
    private title: Title,
    private api: ApiService
  ) {
    console.log('初始化程序中', arguments);
    console.log('%c左侧边栏创建中', 'color: #d27f19');

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();

      console.log(`已检测到屏幕尺寸发送变化`, this.mobileQuery);
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // console.log(event);
        this.routerState = !this.routerState;
        this.DisplayMessage();
        
        this.matSidenavMode = true
        setTimeout(() => {
          this.matListItem();
        }, 900);
      }
    });
  }

  private _mobileQueryListener: () => void;
  
  /**
   * matListItem
   */
  public matListItem() {
    let matList: any = document.querySelectorAll('.mat-list-active');

    for (const iterator of matList) {
      iterator.onclick = (event) => {
        let thisT = event.target;
        let aria: string = thisT.getAttribute('aria-expanded');
        let Sibling = thisT.nextElementSibling;
        let childrens = Sibling.children.length;
        
        if (aria === "false") {
          Sibling.style.cssText = `height: ${childrens *  45}px`;
          thisT.className = 'mat-list-title mat-list-active mat-list-active-img-rotate';

          setTimeout(() => {
            Sibling.setAttribute('aria-expanded', true)
            thisT.setAttribute('aria-expanded', true)
          }, 310);
        } else {
          Sibling.style = '';
          thisT.className = 'mat-list-title mat-list-active';

          setTimeout(() => {
            Sibling.setAttribute('aria-expanded', false)
            thisT.setAttribute('aria-expanded', false)
          }, 310);
        }

      }
    }

  }

  // get structure
  public DisplayMessage() {
    console.log(`%c正在请求左侧边栏`, 'color: #d27f19');
    this.api.StructureCallApi().subscribe(response => {
      
      for (const key in response) {
        if (this.path.split('/')[1] === key) {
          delete response[key]['title'];
          this.matListItemData = response[key];
        }
      }

      console.log('%c左侧边栏数据请求成功', 'color: #d27f19', this.path, this.matListItemData);
    })
  }
  
  public getHero(): void {
    this.path = this.location.path();
    this.path === "" ? this.matIconButtonActive = true : this.path === "/features" ? this.matIconButtonActive = true : this.matIconButtonActive = false;
    
    // set Title
    let tempTitle = "";
    this.path === "" ? tempTitle = "Aftersoil - wiki" : tempTitle = `Aftersoil - ${this.path.split("/")[1].toLocaleUpperCase()}`;
    this.title.setTitle(tempTitle);
    
  }

  prepareRoute(outlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit(): void {
    console.log('顶部导航创建成功');
    console.log('%c左侧边栏创建成功', 'color: #d27f19');
    console.log('首次加载数据在入中...');

  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  // Angular 检查投影到指令
  ngAfterContentChecked(){
    this.getHero();
  }

}
