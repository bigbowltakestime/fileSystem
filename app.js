import http from "http";
import fs from "fs";

function htmlBox(data){
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    ${data}
  </body>
  </html>`
}
function imagetag(link){
  return `<img src="/${link}" alt="" style = "width:50px"></img>`
}

const innerbody = {
    main : `<script src="./style.js"></script>`,
}



const server = http.createServer(function(request, response){
  // 최초접속
  let body = '';
  if(request.method === 'GET' && request.url === '/') {
    response.writeHead(200);
    response.write(htmlBox(innerbody.main))
    let filelistCheck = fs.readdirSync("./filelist");
    for(let k = 0;k<filelistCheck.length;k++){
      let divtag = "<div>";
      divtag += imagetag(filelistCheck[k].split(".")[1]);
      divtag += `<p>${filelistCheck[k]}</p>`;
      divtag += '</div>';
      console.log(divtag);
      response.write(divtag);
    }
    console.log(filelistCheck)
    response.end();
  }
  // 무언가
  if(request.method === 'GET' && request.url.startsWith('/style')){
    fs.readFile(`./style.js`, function(err, data){
      response.writeHead(200);
      response.write(data);
      response.end();
    })
  }
  if(request.method === 'GET' && request.url.startsWith('/py')){
    fs.readFile(`./image/python.png`, function(err, data){
      response.writeHead(200);
      response.write(data);
      response.end();
    })
  }if(request.method === 'GET' && request.url.startsWith('/js')){
    fs.readFile(`./image/js.png`, function(err, data){
      response.writeHead(200);
      response.write(data);
      response.end();
    })
  }if(request.method === 'GET' && request.url.startsWith('/css')){
    fs.readFile(`./image/css.png`, function(err, data){
      response.writeHead(200);
      response.write(data);
      response.end();
    })
  }if(request.method === 'GET' && request.url.startsWith('/html')){
    fs.readFile(`./image/html.jpeg`, function(err, data){
      response.writeHead(200);
      response.write(data);
      response.end();
    })
  }
  if(request.method === 'POST' && request.url.startsWith('/edit')){
    
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      console.log(body);
      let querysplit = [];
      for(let i of body.split("&")){
        querysplit.push(i.split("="));
      }

      if(body.split("=")[3]==="delete"){
        fs.unlinkSync(`./filelist/${querysplit[0][1]}.${querysplit[1][1]}`);
        response.writeHead(200);
        response.end(htmlBox(`<h1>${querysplit[0][1]}.${querysplit[1][1]}${" 삭제완료"}</h1><button type="button" value="클릭하세요" onClick="location.href='http://localhost:2080/'">`));
      }else if(body.split("=")[3]==="add"){
        fs.writeFileSync(`./filelist/${querysplit[0][1]}.${querysplit[1][1]}` ,"helloWorld");
        response.writeHead(200);
        response.end(htmlBox(`<h1>${querysplit[0][1]}.${querysplit[1][1]}${" 생성완료"}</h1><button type="button" value="클릭하세요" onClick="location.href='http://localhost:2080/'">`));
      }
    });
    
  }
        
  });


  // 서버 포트 설정
  server.listen(2080, function(error) {
  if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
  });