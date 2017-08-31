//Counter code
var button = document.getElementById('counter');
var counter=0;
button.onclick= function () {
    //Make a request to counter endpoint
    
    //capture endpoint result and store in variable
    
    //assign result to count variable and return count 
    
    counter=counter+1;
    var span=document.getElementById('count');
    span.innerHTML=counter.toString();
    
};

