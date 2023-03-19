#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import urlparse
from urllib.parse import parse_qs

#print('source code for "http.server":', http.server.__file__)

class web_server(http.server.SimpleHTTPRequestHandler):
    
	def do_GET(self):

		print(self.path)
       
        
		self.protocol_version = 'HTTP/1.1'
		self.send_response(200)
		self.send_header("Content-type", "text/html; charset=UTF-8")
		self.end_headers() 
		
		params = self.path.split("?")
		try:
			parsed_url = parse_qs(params[1])
				
			try:
				parsed_url['videoFile'][0]
				self.wfile.write(b"<video width=\"320\" height=\"240\" controls>")
				self.wfile.write(b"<source src=\"")
				self.wfile.write(bytes(parsed_url['videoFile'][0], encoding="utf-8"))
				self.wfile.write(b"\" type=\"video\">")
				self.wfile.write(b"</video>")
				
			except:
				self.wfile.write(b"NO VIDEO\n")
				
			try:
				parsed_url['audioFile'][0]
				self.wfile.write(b"<audio controls>")
				self.wfile.write(b"<source src=\"")
				self.wfile.write(bytes(parsed_url['audioFile'][0], encoding="utf-8"))
				self.wfile.write(b"\" type=\"audio\">")
				self.wfile.write(b"</audio>")
			except:
				self.wfile.write(b"NO AUDIO\n")
		except:
			self.wfile.write(b"NO ARGUMENTS\n")
		        
    
# --- main ---

PORT = 4080

print(f'Starting: http://localhost:{PORT}')

tcp_server = socketserver.TCPServer(("",PORT), web_server)
tcp_server.serve_forever()
