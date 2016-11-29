# LanguageCallSample
Cocos 跨语言调用示例。

## 参考资料
1. [JS到JAVA反射](http://www.cocos.com/docs/html5/v3/reflection/zh.html)
2. [JS到Object-C反射](http://www.cocos.com/docs/html5/v3/reflection-oc/zh.html)
3. [Cocos 中的自动绑定](https://zhuanlan.zhihu.com/p/20525109)
4. [cocos2d-x从c++到js](http://blog.csdn.net/Kaitiren/article/category/1935079)
5. [如何让Java和C++接口互相调用：JNI使用指南](http://www.cocos.com/docs/native/v2/sdk-integration/android-jni/zh.html)
6. [如何使用JNI](http://www.cocos.com/docs/native/v2/scripting-and-translating-between-programming-languages/for-c++-programmers/how-to-use-jni/zh.html)

## 文件说明

## Js&Java
1.	Js调用Java

	```var returnValue = jsb.reflection.callStaticMethod(className, methodName, methodSignature, parameters...)```
	
	* `className`必须是包含Java包路径的完整类名，包名用`/`代替`.`
	* `methodSignature`是一个字符串，格式是`(参数类型列表)返回值`，如`(IF)Ljava/lang/String;`是返回值为字符串，参数为整数和浮点数。类型签名对应表：
<table class="table table-bordered table-striped table-condensed">
    <tr>
      	<td>Java类型</td>
		<td>签名</td>
    </tr>
    <tr>
       <td>int</td>
		<td>I</td>
    </tr>
</table>


	
2. Java调用Js
	
## Js调用OC
可以直接调用OC类的静态方法。

```var returnValue = jsb.reflection.callStaticMethod(className, methodName, arg1, arg2, .....);```

需要注意的地方是methodName如果有参数的要带上冒号；int和float对应OC的NSNumber。
> ps: 才发现原来OC多参数的方法名是这么坑爹的。

## Js调用C++
## C++调用Js
## Java调用C++
## C++调用Java
