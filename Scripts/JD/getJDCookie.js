/*
 * @file getJDCookie.js
 * @author Award-Winning Writer
 * @description This script captures pt_key and pt_pin from JD.com app requests and displays them as a notification.
 */

// 确保请求对象和头部信息存在
if ($request && $request.headers) {
    // 从请求头中获取完整的Cookie字符串
    const cookie = $request.headers['Cookie'];
    
    // 检查Cookie是否存在
    if (cookie) {
        // 使用正则表达式精确匹配pt_key和pt_pin的值
        const ptKeyMatch = cookie.match(/pt_key=([^;]*)/);
        const ptPinMatch = cookie.match(/pt_pin=([^;]*)/);

        // 如果成功匹配到两个关键值
        if (ptKeyMatch && ptPinMatch) {
            const ptKey = ptKeyMatch; // 结果为 "pt_key=..."
            const ptPin = ptPinMatch; // 结果为 "pt_pin=..."
            
            // 格式化通知内容
            const notificationBody = `${ptKey};\n${ptPin};`;
            
            // 调用Loon的API发送一个系统通知 [1]
            $notification.post(
                "京东 Cookie 已获取", 
                "请及时复制并保存", 
                notificationBody
            );
        }
    }
}

// 通知Loon脚本执行结束
$done();
