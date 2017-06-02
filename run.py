import SimpleHTTPServer
import SocketServer
import cgi
import json
import cPickle as pickle

PORT = 8000

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_GET(self):
        SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
		form = cgi.FieldStorage(
			fp=self.rfile,
			headers=self.headers,
			environ={'REQUEST_METHOD':'POST',
			         'CONTENT_TYPE':self.headers['Content-Type'],
			         })

		if form.getvalue('blob') != None:
			# get name and blob of video data
			name = form.getvalue('name')
			blob = form.getvalue('blob')
			
			# pickle the blobs
			data = {"name": name, "blob": blob}
			pickle.dump( data, open("videos/vids.p", "wb") )

			# write blobs to file
			saved_data = pickle.load( open("videos/vids.p", "rb"))
			new_file = open("videos/"+saved_data["name"], "wb")
			new_file_bytes = bytearray(saved_data["blob"])
			new_file.write(new_file_bytes)

		SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

Handler = ServerHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()