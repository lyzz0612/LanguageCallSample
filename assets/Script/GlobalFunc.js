
var GlobalFunc = {}
window.GlobalFunc = GlobalFunc

GlobalFunc.OCCallBack = function (args) {

}
GlobalFunc.JavaCallBack = function (args) {

}
GlobalFunc.CppCallBack = function (args) {

}
//输出table
GlobalFunc.dump = function(arr, maxLevel) {
    if (!maxLevel)
        maxLevel = 2;

    function _dump(_arr, level) {
        var dumpedText = ''
        if (!level)
            level = 0

        var levelPadding = ''
        //空格和\t在编辑器里会不显示，dump无法对齐，使用~代替
        for (var j = 0; j < level + 1; j++)
            levelPadding += '~~~~'

        if (level >= maxLevel)
            return levelPadding + "...\n"

        if (typeof(_arr) == 'object') {
            for (var key in _arr) {
                var value = _arr[key]

                if (typeof(value) == 'object') {
                    dumpedText += levelPadding + key + " {\n"
                    dumpedText += _dump(value, level + 1)
                    dumpedText += levelPadding + '}\n'
                } else if (typeof(value) == "function") {
                    dumpedText += levelPadding + key + ":   function\n";
                } else {
                    dumpedText += levelPadding + key + ": " + value + '\n'
                }
            }
        } else if (typeof(value) == "function") {
            dumpedText += levelPadding + "key" + ":   function\n";
        } else {
            dumpedText += levelPadding + key + ": " + value + '\n'
        }
        return dumpedText
    }
    var show_text = _dump(arr);
    if (typeof(arr) == "object")
        show_text = "dump: <var> = \n{\n" + show_text + "}\n";
    cc.log(show_text);
}
