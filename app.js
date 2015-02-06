var Article = require('./Article');
var readline = require('readline'),
    fs = require('fs');
    
String.prototype.startWith=function(str){     
  var reg=new RegExp("^"+str);     
  return reg.test(this);        
} 

String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
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

var content = fs.readFileSync('read-constitution-of-the-US.md', 'utf8').split('<!--more-->')[0].split('---');
// console.log(content);
var properties = content[0].split(/\r?\n/ig);

var startDate,headline,text,media = "";
for(var i in properties) {
    var line = properties[i];
    if(line.startWith('title: ')) {
      headline = line.substr('title: '.length);
    } else if(line.startWith('date: ')) {
      startDate = line.substr('date: '.length).replace(/-/g,",");
    } else if(line.startWith('categories: ')) {
      var categories = line.substr('categories: '.length);
      //过滤categories
    } else if(line.startWith('feature: ')) {
      media = 'http://luckypeng.com/' + line.substr('feature: '.length);
    }
}

text = content[1];

var article = new Article(startDate, headline, text, media);
console.log(article.toString());













