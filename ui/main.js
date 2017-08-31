//Counter code
var button = document.getElementById('counter');

button.onclick= function () {
    //Create Request Object
    var request = new XMLHttpRequest();
    //capture endpoint result and store in variable
     request.onreadystatechange = function() {
         if (request.readystate == XMLHttpRequest.DONE)
           {
              // do something
              if (request.status == 200)
                {
                    var counter = request.responseText;
                     var span=document.getElementById('count');
                      span.innerHTML=counter.toString();
                }
           }
         //nothing
     };
     
    //assign result to count variable and return count 
    
    //Make a requst object
    
    request.open ('GET', 'http://srikensway.imad.hasura-app.io/counter',true);
    request.send(null);
   
    
};

//Capture Submit values

var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('submit_btn');
submit.oncick = function() {
var names=['name1','name2','name3','name4'];
var list='';
for (var i=0; i <names.length; i++)
{
 list += '<li>'+names[i]+'</li>'   ;
    
}

var ui=document.getElementById('namelist');
ui.innerHTML=list;
};