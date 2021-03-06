﻿import { Component, OnInit } from '@angular/core';
import { ArticleList, Article, UserInfoModel, CommentReply} from './detail.model';
import { appBase } from '../../../00-AQX_Frame.commons/appBase';
import { appService } from '../../../00-AQX_Frame.services/appService';

declare function unescape(s: string): string;

//注入器的两种：NgModule/Component(只在当前及子组件中生效)
@Component({
    selector: 'detail',
    templateUrl: 'app/70-community/71-topic/detail/detail.html',
    styleUrls: ['app/70-community/71-topic/detail/detail.css'],
    providers: []   //元数据中申明依赖
})

export class Detail implements OnInit {
    // 话题id
    topicId: string = appService.GetQueryString('articleUid');
    // 回复者id集合
    UserIdList: string[] = [];
    // 话题对象
    article: Article = {
        articleUid: "",
        articleTitle: "",
        articleContent: "",
        loginId: "",
        nickName: "",
        publishTime: "",
        clickCount: 0,
        praiseCount: 0,
        ArticleCategoryId: "",
        articleCategoryName: "",
        imageDatas: ""
    };
    // 回复对象
    commentReply: CommentReply = {
       commentUid: "",
       articleIdOrCommentId: 1,
       commentUserLoginId: "",
       commentContent: "",
       commentTime: ""
    };
    commentReplyList: CommentReply[] = [];
    // 用户状态
    navStatus: number = appBase.AppObject.centerStatus; //-1未登录；
    loginId: string = appService.getCookie("loginId");
    // 提示信息
    uploadErrorMsg: string = "";
    //模型绑定;
    userInfoModel: UserInfoModel = {
        loginId: appService.getCookie('loginId'),
        nickName: '',
        headImageUrl: "../../Images/20-management/user_default_img.png",
        email: "4527875@foxmail.com",
        phone: "18254688788",
        position: "天津市西青区",
        appKey: Number(appService.getCookie('appKey')),
        token: appService.getCookie('token'),
        age: 21,
        sexId: 0,
        birthday: '2017-04-16',
        bloodTypeId: 0,
        school: '',
        location: '',
        company: '',
        constellation: '',
        chineseZodiac: '',
        personalizedSignature: '',
        personalizedDescription: ''
    }
    // 获取话题
    GetTopic(): void {
        var self = this;
        $.ajax({
            url: appBase.DomainApi + "api/Article/" + this.topicId,
            type: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data:
            {
                "appKey": appService.getCookie("appKey"),
                "token": appService.getCookie("token"),
                "articleUid": this.topicId
            },
            success(data) {
                if (data.isSuccess) {
                    var dataList = data.data;
                       self.article.articleUid = dataList.articleUid;
                       self.article.articleTitle = dataList.articleTitle;
                       self.article.articleContent = dataList.articleContent;
                       self.article.loginId = dataList.publisherInfo.loginId;
                       self.article.nickName = dataList.publisherInfo.nickName;
                       self.article.publishTime = dataList.publishTime;
                       self.article.clickCount = dataList.clickCount;
                       self.article.praiseCount = dataList.praiseCount;
                       self.article.ArticleCategoryId = dataList.ArticleCategoryId;
                       self.article.articleCategoryName = dataList.articleCategory.CategoryName;
                       self.article.imageDatas = dataList.imageDatas[0];
                       // 设置头像
                       $("#dp").attr('src', self.article.imageDatas);
                       // 请求头像绝对路径
                      /* $.ajax({
                           url: appBase.DomainApi + 'api/Files/' + dataList.publisherInfo.headImageUrl,
                           type: "GET",
                           success: function (data) {
                               // 设置头像
                               $("#dp").attr('src', data);
                           },
                           error: function (data) {
                              
                           }
                       });*/
                       
                } else {
                    alert(data.msg);
                }
            },
            error(data) {
                alert("服务器错误！");
            }
        });
    }
    // 获取登陆用户信息；
    /*getUserInfo(): void {
        var self = this;
        var appKey = Number(appService.getCookie("appKey"));
        var token = appService.getCookie("token");
        //当cookie值为空时，未登录；
        if (appKey == 0 || appKey == null || appKey == NaN) this.navStatus = -1;
        if (this.navStatus != -1) {
            $.ajax({
                url: appBase.DomainApi + "api/User/" + this.loginId,
                type: "get",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: {
                    appKey: appKey,
                    token: token
                },
                success(json) {
                    if (json.isSuccess) {
                        self.userInfoModel.nickName = json.data.nickName;
                        self.userInfoModel.email = json.data.email;
                        self.userInfoModel.phone = json.data.phone;
                        self.userInfoModel.position = json.data.position;

                        if (json.data.headImageUrl != null) {
                            $.ajax({
                                url: appBase.DomainApi + 'api/Files/' + json.data.headImageUrl,
                                type: "GET",
                                success: function (data) {
                                    //$(".prePotrait img").eq(0).attr('src', data);
                                    self.userInfoModel.headImageUrl = data;
                                    $("#dp").attr('src', data);
                                },
                                error: function (data) {
                                    self.uploadErrorMsg = "头像获取失败~";
                                }
                            });
                        }


                    }
                },
                error(data) {

                }
            });
        }

    }*/
    // 增加点赞量
    addPraiseCount(): void {
        var self = this;
        $.ajax({
            url: appBase.DomainApi + "api/Article/3",
            type: "put",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(
            {
                "appKey": appService.getCookie("appKey"),
                "token": appService.getCookie("token"),
                "articleUid": this.topicId
            }),
            success(data) {
                if (data.isSuccess) {
                    console.log(data)
                    var dataList = data.data;
                    self.article.praiseCount = dataList.praiseCount;
                } else {
                    alert(data.msg);
                }
            },
            error(data) {
                alert("服务器错误！");
            }
        });
    }
    // 获取回复
    getCommentReply(): void {
        var self = this;
        $.ajax({
            url: appBase.DomainApi + "api/CommentReply",
            type: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data:
            {
                "appKey": appService.getCookie("appKey"),
                "token": appService.getCookie("token"),
                "articleUid": this.topicId,
                "PageIndex": 1,
                "PageSize": 5,
                "IsDESC": true
            },
            success(data) {
                if (data.isSuccess) {
                    var dataList = data.data;
                    // console.log(dataList)
                    // 条数
                    var dataCount = data.dataCount;
                    // 分页
                    self.getPage(5, dataCount);
                    
                    self.commentReplyList = [];
                    for (var i = 0; i < dataList.length; i++) {
                        var commentReplyObject = new CommentReply();
                        commentReplyObject.commentUid = dataList[i].commentUid;
                        commentReplyObject.articleIdOrCommentId = dataList[i].articleIdOrCommentId;
                        commentReplyObject.commentUserLoginId = dataList[i].commentUserLoginId;
                        commentReplyObject.commentContent = dataList[i].commentContent;
                        commentReplyObject.commentTime = dataList[i].commentTime;
                        self.commentReplyList.push(commentReplyObject);
                        self.UserIdList[i] = dataList[i].commentUserLoginId;
                    }
                } else {
                    alert(data.msg);
                }
            },
            error(data) {
                alert("服务器错误！");
            }
        });
        self.getReplyImg();
        var use = setInterval(function () {
            if (self.UserIdList.length !== 0) {
                self.getReplyImg();
                clearInterval(use)
            }
        }, 200);

    }
    // 获取回复者头像
    getReplyImg(): void {
        var self = this;
        //console.log(self.UserIdList.length)
    }
    // 分页
    getPage(pageDataCount: number, dataCount: string): void {
        var pageCount = Number(dataCount) / pageDataCount;
        //console.log(pageCount);
    }
    // 回复
    addCommentReply(): void {
        var self = this;
        var commentText = $("#editor_id").val();
        var id = self.article.articleUid;
        console.log(this.topicId)
        console.log(this.loginId)
        console.log(commentText)
        $.ajax({
            url: appBase.DomainApi + "api/CommentReply",
            type: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(
            {
                "appKey": appService.getCookie("appKey"),
                "token": appService.getCookie("token"),
                "articleIdOrCommentId": this.topicId,
                "commentUserLoginId": this.loginId,
                "commentContent": commentText
            }),
            success(data) {
                if (data.isSuccess) {
                    // 查询回复列表
                    self.getCommentReply();
                } else {
                    
                }
            },
            error(data) {
                alert("服务器错误！");
            }
        });
    }
    // 修改话题
    modefiyTopic(): void {
        var topicId = appService.GetQueryString('articleUid');
        $.ajax({
            url: appBase.DomainApi + "api/Article/1",
            type: "put",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(
            {
                "appKey": appService.getCookie("appKey"),
                "token": appService.getCookie("token"),
                "articleUid": topicId,
                "articleTitle": $("#topicName").val(),
                "articleContent": $("#topicContent").val(),
               // "ArticleCategoryId": $("#topicType").val(),
                "imagesUrls": ""
            }),
            success(data) {
                if (data.isSuccess) {
                    var dataList = data.data;
                    console.log(data)
                } else {
                    alert(data.msg);
                }
            },
            error(data) {
                alert("服务器错误！");
            }
        });
    }
    ////the final execute ...
    ngOnInit(): void {
        this.GetTopic();
        this.getCommentReply();
        $('#modefiyTopic').on('click', this.modefiyTopic);
    }
}