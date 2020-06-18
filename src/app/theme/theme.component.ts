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
    { 'name': '嫩粉', 'color': '#F48FB1' },
    { 'name': '珊瑚粉', 'color': '#EB686D' },
    { 'name': '荧光粉', 'color': '#FFAAB2' },
    { 'name': '芭比粉', 'color': '#FA92B5' },
    { 'name': 'Blue', 'color': '#1976d2' },
    { 'name': '深蓝色', 'color': '#627ABC' },
    { 'name': '晴空蓝', 'color': '#43BEC5' },
    { 'name': 'Red', 'color': '#F44336' },
    { 'name': '深红色', 'color': '#C92642' },
    { 'name': '金红色', 'color': '#EC8A64' },
    { 'name': '朱红色', 'color': '#E1534A' },
    { 'name': 'Orange', 'color': '#FF9800' },
    { 'name': '甜心橙', 'color': '#F5592C' },
    { 'name': 'Purple', 'color': '#9c27b0' },
    { 'name': '深紫', 'color': '#673ab7' },
    { 'name': 'Indigo', 'color': '#3f51b5' },
    { 'name': 'Black', 'color': 'black' },
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
