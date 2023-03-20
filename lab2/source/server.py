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
		audio_flag = 0
		video_flag = 0
        
		self.protocol_version = 'HTTP/1.1'
		self.send_response(200)
		self.send_header("Content-type", "text/html; charset=UTF-8")
		self.end_headers() 
		
		params = self.path.split("?")
		try:
			parsed_url = parse_qs(params[1])
			
			try:
				parsed_url['imgFile'][0]
				self.wfile.write(b"<img id=\"posterImage\" src=\"")
				self.wfile.write(bytes(parsed_url['imgFile'][0], encoding="utf-8"))
				self.wfile.write(b"\">")
						 
			except:
				self.wfile.write(b"NO IMAGE\n")
				
			try:
				parsed_url['videoFile'][0]
				self.wfile.write(b"<video id=videoPlayer width=\"320\" height=\"240\" controls>")
				self.wfile.write(b"<source src=\"")
				self.wfile.write(bytes(parsed_url['videoFile'][0], encoding="utf-8"))
				self.wfile.write(b"\" type=\"video\">")
				self.wfile.write(b"</video>")
				video_flag = 1
				
			except:
				self.wfile.write(b"NO VIDEO\n")
				
			try:
				parsed_url['audioFile'][0]
				self.wfile.write(b"<audio id=\"audioPlayer\" controls>")
				self.wfile.write(b"<source src=\"")
				self.wfile.write(bytes(parsed_url['audioFile'][0], encoding="utf-8"))
				self.wfile.write(b"\" type=\"audio\">")
				self.wfile.write(b"</audio>")
				audio_flag = 1
			except:
				self.wfile.write(b"NO AUDIO\n")
		except:
			self.wfile.write(b"NO ARGUMENTS\n")
			
			
		if video_flag == 1:
			self.wfile.write(b"<button id = \"videoCancel\" onclick = cancelVideo()> Video cancel </button>")
			self.wfile.write(b"""<script>""")
			self.wfile.write(b"""function cancelVideo() {""")
			self.wfile.write(b"""var para1 = document.getElementById("videoPlayer"); """)
			self.wfile.write(b"""para1.innerHTML = "<source src=\"cancel.mp4\" type=\"video\">"; """)
			self.wfile.write(b"""}""")
			self.wfile.write(b"""</script>""")
			
			
		if audio_flag == 1:
			self.wfile.write(b"<button id = \"audioCancel\" onclick = \"cancelAudio()\"> Audio cancel </button>")
			self.wfile.write(b"<script>")
			self.wfile.write(b"function cancelAudio() {")
			self.wfile.write(b"var para1 = document.getElementById(\"vaudioPlayer\");\n")
			self.wfile.write(b"para1.innerHTML = \"<source src=\"cancel.mp3\" type=\"video\">\";\n")
			self.wfile.write(b"}\n</script>")
		        
    
# --- main ---

PORT = 4080

print(f'Starting: http://localhost:{PORT}')

tcp_server = socketserver.TCPServer(("",PORT), web_server)
tcp_server.serve_forever()
