require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"GlobalFunc":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7e8fdEWICJGxaXXSBKAhQ23', 'GlobalFunc');
// Script/GlobalFunc.js


var GlobalFunc = {};
window.GlobalFunc = GlobalFunc;

GlobalFunc.OCCallBack = function (args) {};
GlobalFunc.JavaCallBack = function (args) {};
GlobalFunc.CppCallBack = function (args) {};
//输出table
GlobalFunc.dump = function (arr, maxLevel) {
    if (!maxLevel) maxLevel = 2;

    function _dump(_arr, level) {
        var dumpedText = '';
        if (!level) level = 0;

        var levelPadding = '';
        //空格和\t在编辑器里会不显示，dump无法对齐，使用~代替
        for (var j = 0; j < level + 1; j++) levelPadding += '~~~~';

        if (level >= maxLevel) return levelPadding + "...\n";

        if (typeof _arr == 'object') {
            for (var key in _arr) {
                var value = _arr[key];

                if (typeof value == 'object') {
                    dumpedText += levelPadding + key + " {\n";
                    dumpedText += _dump(value, level + 1);
                    dumpedText += levelPadding + '}\n';
                } else if (typeof value == "function") {
                    dumpedText += levelPadding + key + ":   function\n";
                } else {
                    dumpedText += levelPadding + key + ": " + value + '\n';
                }
            }
        } else if (typeof value == "function") {
            dumpedText += levelPadding + "key" + ":   function\n";
        } else {
            dumpedText += levelPadding + key + ": " + value + '\n';
        }
        return dumpedText;
    }
    var show_text = _dump(arr);
    if (typeof arr == "object") show_text = "dump: <var> = \n{\n" + show_text + "}\n";
    cc.log(show_text);
};

cc._RFpop();
},{}],"LanguageCall":[function(require,module,exports){
"use strict";
cc._RFpush(module, '280c3rsZJJKnZ9RqbALVwtK', 'LanguageCall');
// Script/LanguageCall.js

cc.Class({
    "extends": cc.Component,

    properties: {
        label: {
            "default": null,
            type: cc.Label
        }
    },

    onLoad: function onLoad() {
        this.OCCallIndex = 0;
    },

    callToOC: function callToOC() {
        if (cc.sys.os == cc.sys.OS_IOS) {
            if (this.OCCallIndex == 0) {
                //类名，方法名（静态方法）  ，参数
                //带参数的方法名后面得带冒号
                var ocReturned = jsb.reflection.callStaticMethod("TestStatic", "jsCalledWithParam:", "this is from js");
                this.label.string = ocReturned;

                this.OCCallIndex = (this.OCCallIndex + 1) % 3;
            } else if (this.OCCallIndex == 1) {
                //多参数
                var ocReturned = jsb.reflection.callStaticMethod("TestStatic", "jsCallWithString:AndInt:AndFloat:AndBool:", "this is from js", 10, 0.1, true);
                this.label.string = ocReturned;
                this.OCCallIndex = (this.OCCallIndex + 1) % 3;
            } else {
                //不带参数的直接方法名
                var ocReturned = jsb.reflection.callStaticMethod("TestStatic", "jsCalledNoParam");
                this.label.string = ocReturned;
                this.OCCallIndex = (this.OCCallIndex + 1) % 3;
            }
        }
    },

    callToJava: function callToJava() {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            //包名+类名，方法名，参数、返回值类型声明，参数
            //包名不能用点得用/
            var javaReturned = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/TestStatic", "jsCalledWithParam", "(Ljava/lang/String;IFZ)Ljava/lang/String;", "this is from js", 10, 0.1, true);
            this.label.string = javaReturned;
        }
    },

    callToCpp: function callToCpp() {},

    startAnimation: function startAnimation() {
        //编辑器里先做好前20帧的动画
        this.animation.play("frame_clip_1");
        //播放完成回调
        this.animation.on("finished", this.playNext.bind(this));

        this.loadedFrames = [];
        this.loadIndex = 21;
        this.loadedClipIndex = 1;
        this.playingClipIndex = 1;

        //假设总共200帧，180是去除编辑器里弄好的20，0.02看是否卡顿调整
        this.schedule(this.loadFrames, 0.02, 180);
    },

    loadFrames: function loadFrames() {
        var filename = "frame_" + this.loadIndex;
        cc.loader.loadRes(filename, cc.SpriteFrame, (function (err, frame) {
            if (err) {
                return;
            }
            //todo帧序可能错乱，待测试
            this.loadedFrames.push(frame);

            //大于20取前20创建clip并加到animatin里去
            if (this.loadedFrames.length > 20) {
                var tmpFrames = [];
                for (var i = 0; i < 20; i++) {
                    var itemFrame = this.loadedFrames.shift();
                    tmpFrames.push(itemFrame);
                };
                //0.04s每帧持续时间，跟你编辑器做的保持一致
                var clip = cc.AnimationClip.createWithSpriteFrames(tmpFrames, 1 / 0.04);
                this.loadedClipIndex = this.loadedClipIndex + 1;
                var clipName = "frame_clip_" + this.loadedClipIndex;
                this.animation.addClip(clip, clipName);
            }
        }).bind(this));
        this.loadIndex = this.loadIndex + 1;
    },
    playNext: function playNext(event) {
        var state = event.detail;
        var lastclip = state.clip;
        //各种删除
        this.animation.removeClip(lastclip, true);
        lastclip.destroy();

        //播放下一段
        this.playingClipIndex = this.playingClipIndex + 1;
        if (this.playingClipIndex > this.loadedClipIndex) {
            cc.log("播放完成或者加载太慢，下个clip还没创建");
            return;
        }
        var clipName = "frame_clip_" + this.loadedClipIndex;
        this.animation.play(clipName);
    }
});

cc._RFpop();
},{}]},{},["LanguageCall","GlobalFunc"]);
