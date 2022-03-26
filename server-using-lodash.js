const http=require('http');
const fs=require('fs');
const _=require('lodash');

const server=http.createServer((request,response)=>{

    //lodash
    const num=_.random(0,20);       //generates random no. between 0 and 20
    console.log(num);

    const greet= _.once( ()=>{      //makes sure that greet is called only once
        console.log("hello greet");
    });
    greet();
    greet();        //not executed
    
    response.setHeader('Content-Type','text/html');

    let path="./views/";
    switch(request.url){
        case '/':
            path+='index.html';
            response.statusCode=200;
            break;
        case '/about':
            path+='about.html';
            response.statusCode=200;
            break;
        
        //redirect about-me to about
        case '/about-me':
            response.statusCode=301;        //redirect status code
            response.setHeader('Location','/about');
            break;
        default:
            path+='404.html';
            response.statusCode=404;
            break;
    }

    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            response.end();
        }else{
            response.end(data);
        }
        
    });

    
});

server.listen(3000,'localhost',()=>{
    //This callback function is called when server starts listening to requests
    console.log('Listening to requests');
});


//run npm init to initialize package.json

