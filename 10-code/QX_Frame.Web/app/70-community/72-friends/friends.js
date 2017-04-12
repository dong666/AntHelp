"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
//注入器的两种：NgModule/Component(只在当前及子组件中生效)
let Friends = class Friends {
    ////the final execute ...
    ngOnInit() {
    }
};
Friends = __decorate([
    core_1.Component({
        selector: 'signup',
        templateUrl: 'app/70-community/72-friends/friends.html',
        styleUrls: ['app/70-community/72-friends/friends.css'],
        providers: [] //元数据中申明依赖
    })
], Friends);
exports.Friends = Friends;
//# sourceMappingURL=friends.js.map