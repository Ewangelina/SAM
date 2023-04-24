const express = require('express')

const app = express()

app.get("/", function(req, res) {
    const videoFile = req.query.videoFile;
    const audioFile = req.query.audioFile;
    const posterImage = req.query.imgFile;
    
    let ret = "";
  
    res.set(`Content-Type`, `text/html`);

        
    if(videoFile)
    {
        ret += (`<video id = "videoPlayer" src="` + videoFile + `" controls></video>`);
        ret += (`<BR>`);
        
        ret += (`<script>function cancel_video(){ document.getElementById("videoPlayer").src = "cancel.mp4";}</script>`);
                
	ret += (`<script>`);
	ret += (`	function add_video()`);
	ret += (`	{`);
	ret += (`		let tableRef = document.getElementById('playlist_table').getElementsByTagName('tbody')[0]; `);
	ret += (`		let myHtmlContent = "<tr><td>" + tableRef.rows.length + "</td><td>";`);
	ret += (`		myHtmlContent += document.getElementById('videoPlayer').src;`);
	ret += (`		myHtmlContent += "</td><td>Video</td>";`);
	ret += (`		myHtmlContent += "<td> <button type='button' class = 'removeRowButton' onclick = this.parentElement.parentElement.remove()>Delete</button> </td></tr>";`);
	ret += (`		let newRow = tableRef.insertRow(tableRef.rows.length);`);
	ret += (`		newRow.innerHTML = myHtmlContent;`);
	ret += (`	}`);
	ret += (`</script>`);
	ret += (`<button id = "videoCancel" onclick = "cancel_video()">Cancel video</button>`);
	ret += (`<button id = "videoAdd" onclick = "add_video()">Add video</button><br>`);
        
        
    }
    else
    {
        ret += (`<p>No video file</p><BR>`);
    }

    if(audioFile){
        ret += (`<audio id="audioPlayer" src="` + audioFile +`" controls/>`);
        ret += (`</audio><BR>`);

	ret += (`<script>function cancel_audio(){ document.getElementById("audioPlayer").src = "cancel.mp3";}</script>`);
        ret += (`<button id="audioCancel" onclick="cancel_audio()">Cancel audio</button>`);
        
        ret += (`<script>`);
	ret += (`	function add_audio()`);
	ret += (`	{`);
	ret += (`		let myHtmlContent = "<tr><td>" + document.getElementById("playlist_table").tBodies[0].rows.length.toString() + "</td><td>";`);
	ret += (`		myHtmlContent += document.getElementById('audioPlayer').src;`);
	ret += (`		myHtmlContent += "</td><td>Audio</td>";`);
	ret += (`		myHtmlContent += "<td> <button type='button' class = 'removeRowButton' onclick = this.parentElement.parentElement.remove()>Delete</button> </td></tr>";`);
	ret += (`		var tableRef = document.getElementById('playlist_table').getElementsByTagName('tbody')[0];`);
	ret += (`		var newRow = tableRef.insertRow(tableRef.rows.length);`);
	ret += (`		newRow.innerHTML = myHtmlContent;`);
	ret += (`	}`);
	ret += (`</script>`);
	
	ret += (`<script>`);
	ret += (`	function delete_row(num)`);
	ret += (`	{`);
	ret += (`		document.getElementById('playlist_table').deleteRow(num); `);
	ret += (`	}`);
	ret += (`</script>`);
	    
        ret += (`<button id = "audioAdd" onclick = "add_audio()">Add audio</button><br>`);
    }
    else
    {
        ret += (`<p>No audio file</p><BR>`);
    }


    if(posterImage)
    {
        ret += (`<img src="` + posterImage +`" id = "posterImage">`);
    }
    else
    {
        ret += (`<p>No poster image</p><BR>`);
    }
	
    //table
    ret += (`<table id = playlist_table><tr>`);
    ret += (`<th>No</th>`);
    ret += (`<th>URL</th>`);
    ret += (`<th>Type</th>`);
    ret += (`<th>Action</th>`);
    ret += (`</tr>`);
    ret += (`</table>`);    
    
    res.send(ret);
  });



app.listen(4080)
