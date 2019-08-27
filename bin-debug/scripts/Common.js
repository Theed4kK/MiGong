var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Common = (function () {
    function Common() {
    }
    Common.getRandomInt = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    /**把数组字段转换成数组
     * breakWord:分隔符
     * toNum:返回的是数值数组还是字符串数组
     */
    Common.ParseField = function (field, breakWord, toNum) {
        if (breakWord === void 0) { breakWord = ","; }
        if (toNum === void 0) { toNum = true; }
        var arr = field.split(breakWord);
        if (toNum) {
            var nums_1 = [];
            arr.forEach(function (v) {
                nums_1.push(Number(v));
            });
            return nums_1;
        }
        else {
            return arr;
        }
    };
    Common.SaveData = function (key, data) {
        var dataStr = JSON.stringify(data);
        egret.localStorage.setItem(key, dataStr);
    };
    Common.LoadData = function (key) {
        var dataStr = egret.localStorage.getItem(key);
        var data = JSON.parse(dataStr);
        return data;
    };
    return Common;
}());
__reflect(Common.prototype, "Common");
//# sourceMappingURL=Common.js.map