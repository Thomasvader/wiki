import { Component, OnInit } from '@angular/core';
import Aftersoil from './../../assets/js/Aftersoil.js';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  // 控制选择颜色面板展开和关闭的按钮
  public themeActive: boolean = false;
  // 颜色主题
  public themeColor: object[] = [
    { 'name': 'pink', 'color': '#e91e63' },
    { 'name': 'blue', 'color': '#1976d2' },
    { 'name': 'DPurple', 'color': '#673ab7' },
    { 'name': 'Indigo', 'color': '#3f51b5' },
    { 'name': 'Purple', 'color': '#9c27b0' },
  ];

  constructor() { }

  /**
   * 给 Button 添加点击事件
   */
  public themeChange(e): void {
    // 获取当前元素
    let _this: any = e.target;
    // 获取要显示的 div
    let ThemeColor = _this.nextElementSibling;

    // 判断开挂关是否是关闭或开启状态
    if (this.themeActive === false) {
      this.themeActive = true;
      ThemeColor.className = "theme-color box-shadow theme-active";

    } else {
      this.themeActive = false;
      ThemeColor.className = "theme-color box-shadow";

    }

  }

  /**
   * 主题切换
   */
  public DoSwitchTheme(event): void {
    let _this = event.target;
    let ariaColor = _this.getAttribute("aria-color");
    let html = document.getElementsByTagName("html")[0];
    let head = document.getElementById("metaColor");

    // 设置颜色
    html.style.cssText = `--wiki-background-color: ${ariaColor}`;
    // 设置手机端顶部导航颜色
    head.setAttribute('content', ariaColor);

    // 存储颜色
    Aftersoil.setCookie({
      key: "backgroundColor",
      value: ariaColor,
      path: '/',
      cycle: 365
    });

  }

  ngOnInit() {
  }

}
