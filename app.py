import http.server
import socketserver
import os

PORT = 2081

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    innerbody = {
    "main" : '<script src="./style.js"></script>'
    }
    @staticmethod
    def htmlBox(data):
      return f'''<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          {data}
        </body>
        </html>'''


    # HTTP GET 요청을 처리합니다.
    def do_GET(self):
        # 최초접속
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            page = self.htmlBox(self.innerbody["main"])
            self.wfile.write(page.encode('utf-8'))
            self.wfile.write(f'''<div>파일 리스트 </br> {os.listdir("./filelist")} </div>'''.encode('utf-8'))
            return

        # 무언가
        if self.path.startswith('/style'):
            self.path = "./style.js"
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        if self.path.startswith('/js'):
            self.path = "./image/js.png"
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        if self.path.startswith('/html'):
            self.path = "./image/html.jpeg"
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        if self.path.startswith('/css'):
            self.path = "./image/css.png"
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        if self.path.startswith('/py'):
            self.path = "./image/python.png"
            return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        if self.path.startswith('/edit'):
            content_length = int(self.headers.get('Content-Length'))
            postbody = [x.split("=") for x in str(self.rfile.read(content_length)).split("&")]
            if postbody[-1][-1][:-1] == "add":
              print("add")
              f = open(f'''./filelist/{postbody[0][1]}.{postbody[1][1]}''',"w");
              f.close()
              self.send_response(200)
              self.send_header('Content-Type', 'text/html')
              self.end_headers()
              page = self.htmlBox(f'''<h1>{postbody[0][1]}.{postbody[1][1]}   생성완료</h1><button type="button" value="클릭하세요" onClick="location.href='http://localhost:2080/'">''')
              self.wfile.write(page.encode('utf-8'))
              return

            elif postbody[-1][-1][:-1] == "delete":
              os.remove(f'''./filelist/{postbody[0][1]}.{postbody[1][1]}''')
              self.send_response(200)
              self.send_header('Content-Type', 'text/html')
              self.end_headers()
              page = self.htmlBox(f'''<h1>{postbody[0][1]}.{postbody[1][1]}   삭제완료</h1><button type="button" value="클릭하세요" onClick="location.href='http://localhost:2080/'">''')
              self.wfile.write(page.encode('utf-8'))
              return

# 서버 포트 설정
Handler = MyHttpRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()