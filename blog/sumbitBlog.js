'use strict';
var Nightmare = require('nightmare');
var request = require('request');
var md5 = require('md5');
var fs = require('fs');
var path = require('path');
var moment = require('moment');
var count = 0;

let ntScript = function(url){

    var nightmare = new Nightmare({ //eslint-disable-line
        waitTimeout: 500000,
        show: true
    });

    var useragent = {
        'chrome': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
    };

    nightmare
    .useragent(useragent.chrome)
    .viewport(1000, 800)
    .goto(url)
    .type('.editor_title', '大家好!很高兴认识大家')
    .click('.poster_submit')
    .wait(5000)
    .type('#TANGRAM__PSP_9__userName', '252833653@qq.com')
    .type('#TANGRAM__PSP_9__password', '05906107')
    .click('#TANGRAM__PSP_9__submit')
    .wait(10000)
    .type('.editor_title', '送福利了！！！')
    .evaluate(function () {
        document.getElementById('ueditor_replace').innerHTML = '<p>&nbsp;关注“贝贝拼好货”公众号，和8000万妈妈一起拼团，首单还送188元的超级新人大礼包！&nbsp;<img class="BDE_Image" src="https://imgsa.baidu.com/forum/pic/item/6b082266d016092464572e1ade0735fae7cd34b3.jpg" unselectable="on" pic_type="0" width="560" height="306"><br></p>';
    })
    .wait(5000)
    .click('.poster_submit')
    .wait(3000)
    .end()
    .catch((e) => {
        console.log(e);
    });  //eslint-disable-line
};

let urls = [
    'https://tieba.baidu.com/f?ie=utf-8&kw=宝宝树',
    'http://tieba.baidu.com/f?ie=utf-8&kw=%E5%A6%88%E5%A6%88%E5%B8%AE',
    'https://tieba.baidu.com/f?ie=utf-8&kw=妈妈网',
    'https://tieba.baidu.com/f?ie=utf-8&kw=辣妈帮',
    'https://tieba.baidu.com/f?ie=utf-8&kw=育儿网'
]

function sumbit(){
    if(moment().format('HH')<8 || moment().format('HH')>=22){
        ntScript(urls[count%5]);
        count ++;    
    }
}

sumbit();
setInterval(sumbit, 30*60*1000);

