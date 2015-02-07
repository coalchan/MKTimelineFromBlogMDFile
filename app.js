var Article = require('./Article');
var fs = require('fs');
    
String.prototype.startWith=function(str){     
  var reg=new RegExp("^"+str);     
  return reg.test(this);        
} 

String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}

//深度优先遍历指定目录下的所有文件路径
function getFileList(path){
    var fileList = [];
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item){
        if(fs.statSync(path + '/' + item).isDirectory()){
            getFileList(path + '/' + item);
        }else{
            fileList.push(path + '/' + item);
        }
    });
    return fileList;
}

/*
var startDate = "2012,1,26";
var headline = "The Constitution of the United States: A Transcription";
var text = "The following text";
var media = "https://vine.co/v/b55LOA1dgJU";

var article = new Article(startDate, headline, text, media);

console.log(article.toString());

title: 读读《美国宪法》
date: 2014-12-11 20:10:30
categories: [书籍]
tags: [英文]
description: 
---
#The Constitution of the United States: A Transcription
Note: The following text is a transcription of the Constitution as it was inscribed by Jacob Shallus on parchment (the document on display in the Rotunda at the National Archives Museum.) Items that are hyperlinked have since been amended or superseded. The authenticated text of the Constitution can be found on the website of the Government Printing Office.<!--more-->
*/

var fileList = getFileList('../MyHexo/source/_posts/');
var articles = [];

for(var i in fileList) {
  var content = fs.readFileSync(fileList[i], 'utf8').split('<!--more-->')[0].split('---');
  // console.log(content);
  var properties = content[0].split(/\r?\n/ig);

  var startDate,headline,text,media = "";
  for(var j in properties) {
      var line = properties[j];
      if(line.startWith('title: ')) {
        headline = line.substr('title: '.length);
      } else if(line.startWith('date: ')) {
        startDate = line.substr('date: '.length,10).replace(/-/g,",");
      } else if(line.startWith('categories: ')) {
        var categories = line.substr('categories: '.length);
        //过滤categories
      } else if(line.startWith('feature: ')) {
        media = 'http://luckypeng.com/' + line.substr('feature: '.length);
      }
  }

  //<a href='http://luckypeng.com/2014/11/27/weixin-crawler' target='blank'>微信公众平台爬取网页内容</a>
  headline = "<a href=\"http://luckypeng.com/" + startDate.replace(/,/g,"\/") + "/"
    + fileList[i].split('\/').pop().substr(0, fileList[i].split('\/').pop().length - 3) 
    + "\" target=\"blank\">" + headline + "</a>";
  
  if(media === "") {
    text = content[1].substr(0, 200);
  } else {
    text = content[1].substr(0, 50);
  }
  text = text.replace(/\r\n/g,'<br/>').replace(/\n\n/g,'<br/>').replace(/\n/g,'<br/>');

  var article = new Article(startDate, headline, text, media);
  articles.push(article.toString());
  
}

console.log(articles);
fs.writeFileSync('./articles.json',JSON.stringify(articles),'utf8');  









