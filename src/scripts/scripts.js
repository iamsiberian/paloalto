/*
//https://github.com/chrislkeller/projects.chrislkeller.com/tree/master/demos/ajax-handlebars

var jqueryNoConflict = jQuery;

//begin main function
jqueryNoConflict(document).ready(function(){
    retriveData();
});
//end main function

// grab data
function retriveData() {
    var dataSource = './mockapi/structure.json';
    jqueryNoConflict.getJSON(dataSource, renderDataVisualsTemplate);
};


// render compiled handlebars template
function renderDataVisualsTemplate(data){
    handlebarsDebugHelper();
    renderHandlebarsTemplate('./partials/render/posts.hbs', '#posts', data);
};

// render handlebars templates via ajax
function getTemplateAjax(path, callback) {
    var source, template;
    jqueryNoConflict.ajax({
        url: path,
        success: function (data) {
            debugger;
            source = data;
            template = Handlebars.compile(source);
            if (callback) callback(template);
        }
    });
};

// function to compile handlebars template
function renderHandlebarsTemplate(withTemplate,inElement,withData){
    getTemplateAjax(withTemplate, function(template) {
        jqueryNoConflict(inElement).html(template(withData));
    })
};

// add handlebars debugger
function handlebarsDebugHelper(){
    Handlebars.registerHelper("debug", function(optionalValue) {
        console.log("Current Context");
        console.log("====================");
        console.log(this);
    });
};

*/

$(document).ready(function () {

  $.ajax({
    url: './mockapi/structure.json',
    success: function(data) {
      this.articles = $('.posts');
      var self = this;

      if (data.posts && data.posts.length) {
        data.posts.forEach(function(article) {
          self.articles.append(
            blocks.templates['posts'](article)
          );
        });
      }
    }
  });

});