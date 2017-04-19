"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const appBase_1 = require("../../00-AQX_Frame.commons/appBase");
const appService_1 = require("../../00-AQX_Frame.services/appService");
//注入器的两种：NgModule/Component(只在当前及子组件中生效)
let Topic = class Topic {
    //注入器的两种：NgModule/Component(只在当前及子组件中生效)
    constructor() {
        this.articleList = {
            appKey: 1001,
            token: "",
            articleTitle: "人名",
            pageIndex: 1,
            pageSize: 3,
            isDesc: false
        };
    }
    // 点击回到顶部按钮
    toTop() {
        $('html, body').animate({ scrollTop: 0 }, 1000); //回到顶端
    }
    GetTopic() {
        $.ajax({
            url: appBase_1.appBase.DomainApi + "api/Article",
            type: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: {
                "appKey": appService_1.appService.getCookie("appKey"),
                "token": appService_1.appService.getCookie("token"),
                "articleTitle": "",
                "pageIndex": 1,
                "pageSize": 10,
                "isDesc": true
            },
            success(data) {
                if (data.isSuccess) {
                    alert(data.data);
                }
                else {
                    alert(data.msg);
                }
            },
            error(data) {
                alert("服务器错误！");
            }
        });
    }
    ////the final execute ...
    ngOnInit() {
        this.GetTopic();
        var App = {
            int: function () {
                // 向上箭头淡入淡出功能
                $(window).scroll(App.scrollFromTop);
            },
            scrollFromTop: function () {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                if (scrollTop + windowHeight > scrollHeight) {
                    $('#back-to-top').fadeIn("1000");
                }
                if (scrollTop == 0) {
                    $('#back-to-top').fadeOut("1000");
                }
            },
        };
        App.int();
    }
};
Topic = __decorate([
    core_1.Component({
        selector: 'topic',
        templateUrl: 'app/70-community/71-topic/topic.html',
        styleUrls: ['app/70-community/71-topic/topic.css'],
        providers: [] //元数据中申明依赖
    })
], Topic);
exports.Topic = Topic;
//# sourceMappingURL=topic.js.map