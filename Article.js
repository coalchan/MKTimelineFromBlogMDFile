module.exports = function Article(startDate, headline, text, media){
  //private
  var pri = {
    startDate : "",
    headline : "",
    text : "",
    asset : 
    {
        "media":"",
        "credit":"",
        "caption":""
    }
  }
  //public
  var pub = {
    setStartDate : function(startDate){
      pri.startDate = startDate;
    },
    getStartDate : function(){
      return pri.startDate;
    },
    setHeadline : function(headline){
      pri.headline = headline;
    },
    getHeadline : function(){
      return pri.headline;
    },
    setText : function(text){
      pri.text = text;
    },
    getText : function(){
      return pri.text;
    },
    setAsset : function(asset){
      pri.asset = asset;
    },
    getAsset : function(){
      return pri.asset;
    },
    toString : function() {
       return pri;     
    }
  }
  //construct code
  pri.startDate = startDate;
  pri.headline = headline;
  pri.text = text;
  pri.asset["media"] = media;
  
  return pub;
}