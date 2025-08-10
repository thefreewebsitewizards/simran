#!/usr/bin/env python3
import http.server
import socketserver
import mimetypes
import os
from urllib.parse import unquote

class VideoHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def do_GET(self):
        # Handle range requests for video streaming
        path = self.translate_path(self.path)
        if os.path.isfile(path) and path.endswith('.mp4'):
            self.send_video_response(path)
        else:
            super().do_GET()
    
    def send_video_response(self, path):
        file_size = os.path.getsize(path)
        range_header = self.headers.get('Range')
        
        if range_header:
            # Parse range header
            range_match = range_header.replace('bytes=', '').split('-')
            start = int(range_match[0]) if range_match[0] else 0
            end = int(range_match[1]) if range_match[1] else file_size - 1
            
            self.send_response(206)  # Partial Content
            self.send_header('Content-Type', 'video/mp4')
            self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
            self.send_header('Content-Length', str(end - start + 1))
            self.end_headers()
            
            with open(path, 'rb') as f:
                f.seek(start)
                self.wfile.write(f.read(end - start + 1))
        else:
            # Send full file
            self.send_response(200)
            self.send_header('Content-Type', 'video/mp4')
            self.send_header('Content-Length', str(file_size))
            self.end_headers()
            
            with open(path, 'rb') as f:
                self.wfile.write(f.read())

# Add MIME type for MP4
mimetypes.add_type('video/mp4', '.mp4')

PORT = 8083
Handler = VideoHTTPRequestHandler

with socketserver.TCPServer(('', PORT), Handler) as httpd:
    print(f'Video server running at http://localhost:{PORT}/')
    httpd.serve_forever()