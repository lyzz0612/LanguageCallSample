require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"GlobalFunc":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7e8fdEWICJGxaXXSBKAhQ23', 'GlobalFunc');
// Script/GlobalFunc.js


var GlobalFunc = {};
window.GlobalFunc = GlobalFunc;

GlobalFunc.OCCallBack = function (args) {};
GlobalFunc.JavaCallBack = function (args) {};
GlobalFunc.CppCallBack = function (args) {};

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

    onLoad: function onLoad() {},

    callToOC: function callToOC() {},

    callToJava: function callToJava() {},

    callToCpp: function callToCpp() {}
});

cc._RFpop();
},{}]},{},["LanguageCall","GlobalFunc"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL1NjcmlwdC9HbG9iYWxGdW5jLmpzIiwiYXNzZXRzL1NjcmlwdC9MYW5ndWFnZUNhbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzdlOGZkRVdJQ0pHeGFYWFNCS0FoUTIzJywgJ0dsb2JhbEZ1bmMnKTtcbi8vIFNjcmlwdC9HbG9iYWxGdW5jLmpzXG5cblxudmFyIEdsb2JhbEZ1bmMgPSB7fTtcbndpbmRvdy5HbG9iYWxGdW5jID0gR2xvYmFsRnVuYztcblxuR2xvYmFsRnVuYy5PQ0NhbGxCYWNrID0gZnVuY3Rpb24gKGFyZ3MpIHt9O1xuR2xvYmFsRnVuYy5KYXZhQ2FsbEJhY2sgPSBmdW5jdGlvbiAoYXJncykge307XG5HbG9iYWxGdW5jLkNwcENhbGxCYWNrID0gZnVuY3Rpb24gKGFyZ3MpIHt9O1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMjgwYzNyc1pKSktuWjlScWJBTFZ3dEsnLCAnTGFuZ3VhZ2VDYWxsJyk7XG4vLyBTY3JpcHQvTGFuZ3VhZ2VDYWxsLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBjYWxsVG9PQzogZnVuY3Rpb24gY2FsbFRvT0MoKSB7fSxcblxuICAgIGNhbGxUb0phdmE6IGZ1bmN0aW9uIGNhbGxUb0phdmEoKSB7fSxcblxuICAgIGNhbGxUb0NwcDogZnVuY3Rpb24gY2FsbFRvQ3BwKCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiXX0=
