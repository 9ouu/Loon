/*
 * @file getJDCookie_v2.js
 * @author Award-Winning Writer
 * @description [V2] This script captures pt_key and pt_pin from specific JD.com app requests and displays them as a notification.
 */

// 脚本的核心逻辑：从请求头中提取Cookie
// $request 对象是由Loon在http-request类型的脚本运行时提供的全局变量
const cookie = $request.headers['Cookie'];

// 确保Cookie存在且包含关键信息，再进行处理
if (cookie && cookie.includes('pt_key') && cookie.includes('pt_pin')) {
    // 使用正则表达式分别捕获 pt_key 和 pt_pin 的完整表达式
    const ptKey = cookie.match(/pt_key=([^;]+)/);
    const ptPin = cookie.match(/pt_pin=([^;]+)/);

    // 确认ptKey和ptPin都成功提取
    if (ptKey && ptPin) {
        const cookieInfo = `${ptKey};\n${ptPin};`;
        
        // 使用Loon的API发送一个系统通知 [1]
        $notification.post(
            "京东 Cookie 已成功获取 (v2)",
            "请及时复制您的Cookie信息",
            cookieInfo
        );
    }
}

// 无论是否成功获取，都必须调用$done()来通知Loon脚本执行结束，否则可能导致网络请求超时 [2]
$done();
