import SimpleHTTPServer
import SocketServer
import logging
import cgi
import json
import cPickle as pickle

PORT = 8000

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_GET(self):
        # logging.error(self.headers)
        SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        # logging.error(self.headers)
		form = cgi.FieldStorage(
			fp=self.rfile,
			headers=self.headers,
			environ={'REQUEST_METHOD':'POST',
			         'CONTENT_TYPE':self.headers['Content-Type'],
			         })

		name = form.getvalue('name')
		blob = form.getvalue('blob')
		
		data = {"name": name, "blob": blob}
		pickle.dump( data, open("videos/vids.p", "wb") )

		saved_data = pickle.load( open("videos/vids.p", "rb"))
		new_file = open("videos/"+saved_data["name"], "wb")
		new_file_bytes = bytearray(saved_data["blob"])
		new_file.write(new_file_bytes)


		SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

Handler = ServerHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()