package org.cocos2dx.javascript;
import org.cocos2dx.javascript.AppActivity;

public class TestStatic {
	static String jsCalledWithParam(String argc1, int argc2, 
			float argc3, boolean argc4) {
		String message = String.format("%s+%d+%f+%b", argc1, argc2,
				argc3, argc4);
		AppActivity.showAlertDialog("js调用Java", message);
		return "Java jsCalledWithParam返回的值";
	};
}
