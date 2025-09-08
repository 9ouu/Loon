/*
 * @file getJingdouCookie.js
 * @author Award-Winning Writer
 * @description Captures pt_key and pt_pin from the JD Jingdou page request and displays them as a notification.
 */

// $request 对象由Loon在http-request类型的脚本运行时提供
const cookie = $request.headers['Cookie'];

// 首先确认Cookie是否存在
if (cookie) {
    // 使用正则表达式精确匹配 "pt_key=..." 和 "pt_pin=..." 直到分号为止
    const ptKeyMatch = cookie.match(/pt_key=[^;]+/);
    const ptPinMatch = cookie.match(/pt_pin=[^;]+/);

    // 确保两个关键参数都成功匹配
    if (ptKeyMatch && ptPinMatch) {
        // ptKeyMatch 的结果是 "pt_key=XXXXXXXX"
        // ptPinMatch 的结果是 "pt_pin=jd_XXXXXXXX"
        // 按照您要求的格式组合
        const result = `${ptKeyMatch}; ${ptPinMatch};`;
        
        // 调用Loon的通知API，将结果推送给您 [1]
        $notification.post(
            "京东京豆 Cookie 已获取",
            "请点击通知拷贝",
            result
        );
    }
}

// 无论是否成功，都必须调用$done()来结束脚本，避免网络请求卡住
$done();
