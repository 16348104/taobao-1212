auto.waitFor();
var height = device.height;
var width = device.width;
toast("开启2020京东双十二")
setScreenMetrics(width, height);
// toastLog(isActPage())

start()

function gotoAct() {
    log('准备启动京东APP')
    launch('com.jingdong.app.mall')
    log('京东APP打开成功')
    MySleep(4, 5);
    log('准备进入京东双十二活动页面，如果页面有其他弹窗，请手动关闭下')
    let actWid = descContains('浮层活动').clickable(true).findOne(500);
    click(actWid.bounds().centerX(), actWid.bounds().centerY());
    MySleep(4, 5);
    if (!isActPage()) {
        actWid = descContains('浮层活动').clickable(true).findOne(500);
        click(actWid.bounds().centerX(), actWid.bounds().centerY());
        MySleep(4, 5);
    }
}

function gotoActFromIndex() {
    let actWid = descContains('浮层活动').clickable(true).findOne(500);
    click(actWid.bounds().centerX(), actWid.bounds().centerY());
    MySleep(4, 5);
}

function isIndexPage() {
    let actWid = descContains('浮层活动').clickable(true).findOne(500);
    if (actWid) {
        return true;
    } else {
        return false;
    }
}

function start() {
    console.show();
    log('运行脚本请先将京东商城APP从后台杀掉,保证运行过程中出现错误较少')
    MySleep(4, 6);
    gotoAct();
    while (!isActPage()) {
        log('程序未正确进入活动页面，请手动进入')
        MySleep(2, 3);
    }
    if (isActPage()) {
        log('进入活动页面成功')
    }

    finishTask();
    lingHB();
    alert("任务已完成", "所有任务貌似都做完啦！\n若仍有任务请重新运行噢！");
}



function lingHB() {
    if (isActPage()) {
        let kaihongbao = text('开红包').depth(14).clickable(true).findOne(1000);
        while (kaihongbao) {
            kaihongbao.click();
            MySleep(2, 3);
            let shouxia = text('开心收下').findOne(1000);
            click(shouxia.bounds().centerX(), shouxia.bounds().centerY())
            MySleep(2, 3);
            kaihongbao = text('开红包').depth(14).clickable(true).findOne(1000);
        }
    }
}

function finishTask() {
    let taskBS = ['去完成', '去浏览']
    for (let i = 0; i < taskBS.length; i++) {
        lingHB();
        let task = taskBS[i];
        let taskWid = text(task).depth(14).clickable(true).findOne(1000);

        while (taskWid) {
            let textWid = className('android.view.View').indexInParent(taskWid.indexInParent() - 2).depth(14).findOne(500);
            taskWid.click();
            log('去完成:' + textWid.text())
            MySleep(2, 3)
            let count = 0;
            while (count++ < 5) {
                MySwipe();
                MySleep(0.5, 2);
            }
            back();
            MySleep(2, 3);
            if (isIndexPage()) {
                gotoActFromIndex();
            }
            while (!isActPage()) {
                back();
                MySleep(2, 3);
            }
            taskWid = text(task).depth(14).clickable(true).findOne(1000);
            MySleep(2, 3);
        }
    }
}

function isActPage() {
    let actPage = textContains('db0b3143293bbbb7').depth(14).findOne(500);
    if (actPage) {
        return true;
    } else {
        return false;
    }
}


function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function MySwipe() {
    var sX = random(100, width - 100);
    var sY = random(height / 2 + 100, height - 100);
    var eY = random(100, height / 2 - 100);
    swipe(sX, sY, sX, eY, random(100, 120));
}

function MySleep(Min, Max) {
    sleep(random(Min * 1000, Max * 1000));
}