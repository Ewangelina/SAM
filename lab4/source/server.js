const express = require('express')

const app = express()

function getQueryVariable(adress, variable) 
{
  var query = adress.split(`?`);
  if (query.length == 1) return null;
  var vars = query[1].split(`&`);

  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split(`=`);
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  
  return null;
}

app.get("/", function(req, res) {
    const videoFile = req.query.videoFile;
    const audioFile = req.query.audioFile;
    const posterImage = req.query.imgFile;
  
    res.set(`Content-Type`, `text/html`);

        
    if(videoFile)
    {
        res.write(`<video id = "videoPlayer" src="` + videoFile + `" controls></video>`);
        res.write(`<BR>`);
        
        res.write(`<script>function cancel_video(){ document.getElementById("videoPlayer").src = "cancel.mp4";}</script>`);
        
        
	let writable = `<script>function add_video(){let tableRef = document.getElementById('playlist_table').getElementsByTagName('tbody')[0]; let myHtmlContent = "<tr><td>" + tableRef.rows.length + "` 
	+ `</td><td>` + videoFile + `</td><td>Video</td></tr>"` +
	    `` +
		`let newRow = tableRef.insertRow(tableRef.rows.length);` +
		`newRow.innerHTML = myHtmlContent;` +
	`}</script>`;
	res.write(`<button id = "videoCancel" onclick = "cancel_video()">Cancel video</button>`);
	res.write(writable); //change in case of cancel
	res.write(`<button id = "videoAdd" onclick = "add_video()">Add video</button>`);
        
        
    }
    else
    {
        res.write(`<p>No video file</p><BR>`);
    }

    if(audioFile){
        res.write(`<audio id="audioPlayer" src="` + audioFile +`" controls/>`);
        res.write(`</audio><BR>`);

	res.write(`<script>function cancel_audio(){ document.getElementById("audioPlayer").src = "cancel.mp3";}</script>`);
        res.write(`<button id="audioCancel" onclick="cancel_audio()">Cancel audio</button>`);
        
        let writable = `<script>function add_audio(){let myHtmlContent = "<tr><td>" + document.getElementById("playlist_table").tBodies[0].rows.length.toString() + "` 
	+ `</td><td>` + audioFile + `</td><td>Audio</td></tr>"` +
	    `var tableRef = document.getElementById('playlist_table').getElementsByTagName('tbody')[0];` +
		`var newRow = tableRef.insertRow(tableRef.rows.length);` +
		`newRow.innerHTML = myHtmlContent;` +
	`}</script>`;
	    
        res.write(`<button id = "audioAdd" onclick = "add_audio()">Add audio</button>`);
        res.write(writable);
    }
    else
    {
        res.write(`<p>No audio file</p><BR>`);
    }


    if(posterImage)
    {
        res.write(`<img src="` + posterImage +`" id = "posterImage">`);
    }
    else
    {
        res.write(`<p>No poster image</p><BR>`);
    }
	
    //table
    res.write(`<table id = playlist_table><tr>`);
    res.write(`<th>No</th>`);
    res.write(`<th>URL</th>`);
    res.write(`<th>Type</th>`);
    res.write(`</tr>`);
    res.write(`</table>`);    
  });



app.listen(4080)
