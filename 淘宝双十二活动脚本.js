/**
 * 淘宝双十二活动脚本
 *
 * Author: YBQ789
 * Date: 2020/12/01
 * Versions: 1.1.0
 * Github: https://github.com/YBQ789/taobao-1212
 */

//无障碍判定
try {
    auto();
} catch (error) {
    toast("请手动开启无障碍并授权给Auto.js");
    sleep(2000);
    exit();
}

//获取控件是否存在操作
function get(txt)
{
    return descContains(txt).exists() || textContains(txt).exists();
}
var width = device.width;//获取设备的宽度
var height = device.height;//获取设备的高度

//开始运行
function run()
{
    setScreenMetrics(width, height);
    toast("设备宽："+width+"，高："+height);
    launchApp("手机淘宝");
    sleep(3000);
    //进入搜索界面
    var text = "搜索";
    if(get(text)){
        descContains(text).click();
        sleep(1000);
        setText("欢乐造红包");
        sleep(1000);
        textContains(text).click();
        sleep(1000);
        start();
    }
}
//任务开始
function start()
{
    console.show();
    console.setPosition(0, 0);
    sleep(1000);
    console.setSize(width/1.5,height/5);
    textContains("领欢乐币").waitFor();
    sleep(1500);
    if(get("领欢乐币")){
        textContains("领欢乐币").click();
    }    
    sleep(1500);
    if(get("去打卡")){
        console.info("去打卡");
        textContains("去打卡").click();
    }   
    sleep(1500);
    var title = ["去完成"];
    for(var i = 0; i < title.length; i++){
        num = 1;
        j=0;
        while(true){
            var flag = get(title[i]);
            toast("["+title[i]+"]返回值为："+flag);
            if(text(title[i]).findOnce(j)!=null){
                console.info("第"+num+"次"+title[i]);
                num++;
                textContains(title[i]).findOnce(j).click();    
                // goto(title[i])
                while(true){
                    sleep(random(6500,8500));
                    if (textContains("开通即享").exists()) {
                        log("跳过开通任务");
                        j++;
                        back();break;
                    }
                    if (textContains("复制链接").exists()) {
                        log("跳过分享任务");
                        j++;
                        back();sleep(1500);back();break;
                    }
                    if (textContains("点击施肥").exists()) {
                        log("跳过施肥任务");
                        j++;
                        back();break;
                    }
                    if (descContains("流量").exists()) {
                        log("跳过充值任务");
                        j++;
                        back();break;
                    }
                    if (textContains("开通连续包月").exists()) {
                        log("跳过开通连续包月任务");
                        j++;
                        back();sleep(1500);
                        textContains("忍痛离开").click();
                        break;
                    }
                    if (textContains("淘宝特价版送红包").exists()) {
                        log("跳过打开APP任务");
                        j++;
                        back();break;
                    }
                    if(textContains("浏览").exists()||descContains("浏览").exists()){
                        var txt = ["任务完成","任务已完成","任务已经全部完成啦"];     
                        sleep(17000);
                        if(get(txt[0]) || get(txt[1]) || get(txt[2])){
                            toast("浏览完成"); back(); break;
                        }
                    }else{
                        back();break;
                    }
                }
            }else{
                break;   
            }
            sleep(3000);
        }
    }
    console.info("脚本结束")
    sleep(500);
    console.hide();
    exit();
}
 
//开始执行run
alert("【淘宝双十二活动脚本】\n\n脚本执行过程请勿手动点击屏幕，否则脚本执行可能会错乱，导致任务失败\n执行过程中可按音量+键终止\n\n执行淘宝任务时请确保使用低版本淘宝（V9.0.0及以下），否则无法获取奖励\n\n最新版脚本请到GitHub获取\nhttps://github.com/YBQ789/taobao-1212\n\nPowered By YBQ789");
run();
alert("任务已完成")