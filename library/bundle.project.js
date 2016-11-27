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
},{}]},{},["LanguageCall","GlobalFunc"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL1NjcmlwdC9HbG9iYWxGdW5jLmpzIiwiYXNzZXRzL1NjcmlwdC9MYW5ndWFnZUNhbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc3ZThmZEVXSUNKR3hhWFhTQktBaFEyMycsICdHbG9iYWxGdW5jJyk7XG4vLyBTY3JpcHQvR2xvYmFsRnVuYy5qc1xuXG5cbnZhciBHbG9iYWxGdW5jID0ge307XG53aW5kb3cuR2xvYmFsRnVuYyA9IEdsb2JhbEZ1bmM7XG5cbkdsb2JhbEZ1bmMuT0NDYWxsQmFjayA9IGZ1bmN0aW9uIChhcmdzKSB7fTtcbkdsb2JhbEZ1bmMuSmF2YUNhbGxCYWNrID0gZnVuY3Rpb24gKGFyZ3MpIHt9O1xuR2xvYmFsRnVuYy5DcHBDYWxsQmFjayA9IGZ1bmN0aW9uIChhcmdzKSB7fTtcbi8v6L6T5Ye6dGFibGVcbkdsb2JhbEZ1bmMuZHVtcCA9IGZ1bmN0aW9uIChhcnIsIG1heExldmVsKSB7XG4gICAgaWYgKCFtYXhMZXZlbCkgbWF4TGV2ZWwgPSAyO1xuXG4gICAgZnVuY3Rpb24gX2R1bXAoX2FyciwgbGV2ZWwpIHtcbiAgICAgICAgdmFyIGR1bXBlZFRleHQgPSAnJztcbiAgICAgICAgaWYgKCFsZXZlbCkgbGV2ZWwgPSAwO1xuXG4gICAgICAgIHZhciBsZXZlbFBhZGRpbmcgPSAnJztcbiAgICAgICAgLy/nqbrmoLzlkoxcXHTlnKjnvJbovpHlmajph4zkvJrkuI3mmL7npLrvvIxkdW1w5peg5rOV5a+56b2Q77yM5L2/55SofuS7o+abv1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxldmVsICsgMTsgaisrKSBsZXZlbFBhZGRpbmcgKz0gJ35+fn4nO1xuXG4gICAgICAgIGlmIChsZXZlbCA+PSBtYXhMZXZlbCkgcmV0dXJuIGxldmVsUGFkZGluZyArIFwiLi4uXFxuXCI7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBfYXJyID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gX2Fycikge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IF9hcnJba2V5XTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVtcGVkVGV4dCArPSBsZXZlbFBhZGRpbmcgKyBrZXkgKyBcIiB7XFxuXCI7XG4gICAgICAgICAgICAgICAgICAgIGR1bXBlZFRleHQgKz0gX2R1bXAodmFsdWUsIGxldmVsICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIGR1bXBlZFRleHQgKz0gbGV2ZWxQYWRkaW5nICsgJ31cXG4nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBkdW1wZWRUZXh0ICs9IGxldmVsUGFkZGluZyArIGtleSArIFwiOiAgIGZ1bmN0aW9uXFxuXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZHVtcGVkVGV4dCArPSBsZXZlbFBhZGRpbmcgKyBrZXkgKyBcIjogXCIgKyB2YWx1ZSArICdcXG4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBkdW1wZWRUZXh0ICs9IGxldmVsUGFkZGluZyArIFwia2V5XCIgKyBcIjogICBmdW5jdGlvblxcblwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHVtcGVkVGV4dCArPSBsZXZlbFBhZGRpbmcgKyBrZXkgKyBcIjogXCIgKyB2YWx1ZSArICdcXG4nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkdW1wZWRUZXh0O1xuICAgIH1cbiAgICB2YXIgc2hvd190ZXh0ID0gX2R1bXAoYXJyKTtcbiAgICBpZiAodHlwZW9mIGFyciA9PSBcIm9iamVjdFwiKSBzaG93X3RleHQgPSBcImR1bXA6IDx2YXI+ID0gXFxue1xcblwiICsgc2hvd190ZXh0ICsgXCJ9XFxuXCI7XG4gICAgY2MubG9nKHNob3dfdGV4dCk7XG59O1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMjgwYzNyc1pKSktuWjlScWJBTFZ3dEsnLCAnTGFuZ3VhZ2VDYWxsJyk7XG4vLyBTY3JpcHQvTGFuZ3VhZ2VDYWxsLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLk9DQ2FsbEluZGV4ID0gMDtcbiAgICB9LFxuXG4gICAgY2FsbFRvT0M6IGZ1bmN0aW9uIGNhbGxUb09DKCkge1xuICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLk9DQ2FsbEluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgICAvL+exu+WQje+8jOaWueazleWQje+8iOmdmeaAgeaWueazle+8iSAg77yM5Y+C5pWwXG4gICAgICAgICAgICAgICAgLy/luKblj4LmlbDnmoTmlrnms5XlkI3lkI7pnaLlvpfluKblhpLlj7dcbiAgICAgICAgICAgICAgICB2YXIgb2NSZXR1cm5lZCA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJUZXN0U3RhdGljXCIsIFwianNDYWxsZWRXaXRoUGFyYW06XCIsIFwidGhpcyBpcyBmcm9tIGpzXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gb2NSZXR1cm5lZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuT0NDYWxsSW5kZXggPSAodGhpcy5PQ0NhbGxJbmRleCArIDEpICUgMztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5PQ0NhbGxJbmRleCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgLy/lpJrlj4LmlbBcbiAgICAgICAgICAgICAgICB2YXIgb2NSZXR1cm5lZCA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJUZXN0U3RhdGljXCIsIFwianNDYWxsV2l0aFN0cmluZzpBbmRJbnQ6QW5kRmxvYXQ6QW5kQm9vbDpcIiwgXCJ0aGlzIGlzIGZyb20ganNcIiwgMTAsIDAuMSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBvY1JldHVybmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuT0NDYWxsSW5kZXggPSAodGhpcy5PQ0NhbGxJbmRleCArIDEpICUgMztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy/kuI3luKblj4LmlbDnmoTnm7TmjqXmlrnms5XlkI1cbiAgICAgICAgICAgICAgICB2YXIgb2NSZXR1cm5lZCA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJUZXN0U3RhdGljXCIsIFwianNDYWxsZWROb1BhcmFtXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gb2NSZXR1cm5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLk9DQ2FsbEluZGV4ID0gKHRoaXMuT0NDYWxsSW5kZXggKyAxKSAlIDM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2FsbFRvSmF2YTogZnVuY3Rpb24gY2FsbFRvSmF2YSgpIHtcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xuICAgICAgICAgICAgLy/ljIXlkI0r57G75ZCN77yM5pa55rOV5ZCN77yM5Y+C5pWw44CB6L+U5Zue5YC857G75Z6L5aOw5piO77yM5Y+C5pWwXG4gICAgICAgICAgICAvL+WMheWQjeS4jeiDveeUqOeCueW+l+eUqC9cbiAgICAgICAgICAgIHZhciBqYXZhUmV0dXJuZWQgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvVGVzdFN0YXRpY1wiLCBcImpzQ2FsbGVkV2l0aFBhcmFtXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0lGWilMamF2YS9sYW5nL1N0cmluZztcIiwgXCJ0aGlzIGlzIGZyb20ganNcIiwgMTAsIDAuMSwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IGphdmFSZXR1cm5lZDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjYWxsVG9DcHA6IGZ1bmN0aW9uIGNhbGxUb0NwcCgpIHt9LFxuXG4gICAgc3RhcnRBbmltYXRpb246IGZ1bmN0aW9uIHN0YXJ0QW5pbWF0aW9uKCkge1xuICAgICAgICAvL+e8lui+keWZqOmHjOWFiOWBmuWlveWJjTIw5bin55qE5Yqo55S7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoXCJmcmFtZV9jbGlwXzFcIik7XG4gICAgICAgIC8v5pKt5pS+5a6M5oiQ5Zue6LCDXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLm9uKFwiZmluaXNoZWRcIiwgdGhpcy5wbGF5TmV4dC5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLmxvYWRlZEZyYW1lcyA9IFtdO1xuICAgICAgICB0aGlzLmxvYWRJbmRleCA9IDIxO1xuICAgICAgICB0aGlzLmxvYWRlZENsaXBJbmRleCA9IDE7XG4gICAgICAgIHRoaXMucGxheWluZ0NsaXBJbmRleCA9IDE7XG5cbiAgICAgICAgLy/lgYforr7mgLvlhbEyMDDluKfvvIwxODDmmK/ljrvpmaTnvJbovpHlmajph4zlvITlpb3nmoQyMO+8jDAuMDLnnIvmmK/lkKbljaHpob/osIPmlbRcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmxvYWRGcmFtZXMsIDAuMDIsIDE4MCk7XG4gICAgfSxcblxuICAgIGxvYWRGcmFtZXM6IGZ1bmN0aW9uIGxvYWRGcmFtZXMoKSB7XG4gICAgICAgIHZhciBmaWxlbmFtZSA9IFwiZnJhbWVfXCIgKyB0aGlzLmxvYWRJbmRleDtcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoZmlsZW5hbWUsIGNjLlNwcml0ZUZyYW1lLCAoZnVuY3Rpb24gKGVyciwgZnJhbWUpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RvZG/luKfluo/lj6/og73plJnkubHvvIzlvoXmtYvor5VcbiAgICAgICAgICAgIHRoaXMubG9hZGVkRnJhbWVzLnB1c2goZnJhbWUpO1xuXG4gICAgICAgICAgICAvL+Wkp+S6jjIw5Y+W5YmNMjDliJvlu7pjbGlw5bm25Yqg5YiwYW5pbWF0aW7ph4zljrtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvYWRlZEZyYW1lcy5sZW5ndGggPiAyMCkge1xuICAgICAgICAgICAgICAgIHZhciB0bXBGcmFtZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1GcmFtZSA9IHRoaXMubG9hZGVkRnJhbWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRtcEZyYW1lcy5wdXNoKGl0ZW1GcmFtZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLzAuMDRz5q+P5bin5oyB57ut5pe26Ze077yM6Lef5L2g57yW6L6R5Zmo5YGa55qE5L+d5oyB5LiA6Ie0XG4gICAgICAgICAgICAgICAgdmFyIGNsaXAgPSBjYy5BbmltYXRpb25DbGlwLmNyZWF0ZVdpdGhTcHJpdGVGcmFtZXModG1wRnJhbWVzLCAxIC8gMC4wNCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWRDbGlwSW5kZXggPSB0aGlzLmxvYWRlZENsaXBJbmRleCArIDE7XG4gICAgICAgICAgICAgICAgdmFyIGNsaXBOYW1lID0gXCJmcmFtZV9jbGlwX1wiICsgdGhpcy5sb2FkZWRDbGlwSW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uYWRkQ2xpcChjbGlwLCBjbGlwTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvYWRJbmRleCA9IHRoaXMubG9hZEluZGV4ICsgMTtcbiAgICB9LFxuICAgIHBsYXlOZXh0OiBmdW5jdGlvbiBwbGF5TmV4dChldmVudCkge1xuICAgICAgICB2YXIgc3RhdGUgPSBldmVudC5kZXRhaWw7XG4gICAgICAgIHZhciBsYXN0Y2xpcCA9IHN0YXRlLmNsaXA7XG4gICAgICAgIC8v5ZCE56eN5Yig6ZmkXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlbW92ZUNsaXAobGFzdGNsaXAsIHRydWUpO1xuICAgICAgICBsYXN0Y2xpcC5kZXN0cm95KCk7XG5cbiAgICAgICAgLy/mkq3mlL7kuIvkuIDmrrVcbiAgICAgICAgdGhpcy5wbGF5aW5nQ2xpcEluZGV4ID0gdGhpcy5wbGF5aW5nQ2xpcEluZGV4ICsgMTtcbiAgICAgICAgaWYgKHRoaXMucGxheWluZ0NsaXBJbmRleCA+IHRoaXMubG9hZGVkQ2xpcEluZGV4KSB7XG4gICAgICAgICAgICBjYy5sb2coXCLmkq3mlL7lrozmiJDmiJbogIXliqDovb3lpKrmhaLvvIzkuIvkuKpjbGlw6L+Y5rKh5Yib5bu6XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjbGlwTmFtZSA9IFwiZnJhbWVfY2xpcF9cIiArIHRoaXMubG9hZGVkQ2xpcEluZGV4O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KGNsaXBOYW1lKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7Il19
