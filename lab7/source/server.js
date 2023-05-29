const express = require('express')

const app = express()

app.get('/', (req, res) => {
	const videoFile = req.query.videoFile;
    	const audioFile = req.query.audioFile;
    	const posterImage = req.query.imgFile;
    	
	let ret = '';
	if (audioFile) {
		ret += `<audio id = "audioPlayer" src = ${req.query.audioFile}></audio>`;
		ret += `<button type="button" id = "audioCancel">cancel audio</button>`;
		ret += `<button type="button" id = "audioAdd">Add audio</button>`;
		ret += `<script>let aud = document.getElementById("audioPlayer");`;
		ret += `function playAud() {    aud.play();}`;
		ret += `function pauseAud() {    aud.pause();}</script>`;
		ret += `<button type="button" id = "audioPlay" onclick = playAud() >Play Audio</button>`;
		ret += `<button type="button" id = "audioPause" onclick = pauseAud() >Pause Audio</button>`;
		ret += `<script>document.getElementById("audioCancel").addEventListener('click', 
		() => document.getElementById("audioPlayer").src = "cancel.mp3")</script>`

	}
	if (videoFile) {
		ret += `</br> <video id = "videoPlayer" src = ${req.query.videoFile}></video>`;
		ret += `<button type="button" id = "videoCancel">cancel video</button>`;
		ret += `<button type="button" id = "videoAdd">Add video</button>`;
		ret += `<script>let vid = document.getElementById("audioPlayer");`;
		ret += `function playVid() {    vid.play();}`;
		ret += `function pauseVid() {    vid.pause();}</script>`;
		ret += `<button type="button" id = "videoPlay" onclick = playVid() >Play Video</button>`;
		ret += `<button type="button" id = "videoPause" onclick = pauseVid() >Pause Video</button>`;
		ret += `<script>document.getElementById("videoCancel").addEventListener('click', 
		() => document.getElementById("videoPlayer").src = "cancel.mp4")</script>`
	}
	if (posterImage) {
		ret += `<img src=${req.query.imgFile} id = "posterImage">`;
		ret += `<button type="button" id = "imgCancel">cancel image</button>`;
		ret += `<button type="button" id = "imgAdd">Add img</button>`;
		ret += `<script>document.getElementById("imgCancel").addEventListener('click', 
		() => document.getElementById("posterImage").src = "cancel.jpg")</script>`
	}
	ret += (`<table id = playlist_table><tr>`);
    	ret += (`<th>No</th>`);
    	ret += (`<th>URL</th>`);
    	ret += (`<th>Type</th>`);
    	ret += (`<th>Action</th>`);
    	ret += (`</tr>`);
    	ret += (`</table>`);   

	ret += `
	<script>
	let addDeleteToDeleteButtons = () => {
        		const deleteButtons = document.querySelectorAll('.removeRowButton')
		deleteButtons.forEach( (button) => {
            
            button.addEventListener('click', () => {
                const row = button.parentElement.parentElement;
                row.remove();
            })
		})
	}
	</script>
	`

	ret += `
	<script>
	let addMoveRowUpToUpButton = (button) => {
            const row = button.parentElement.parentElement;
			let prevRow = row.previousElementSibling;
			if (prevRow.rowIndex > 0) {
				row.parentNode.insertBefore(row, prevRow)
			}
			else {
				row.parentNode.appendChild(row);
			}
	}
	</script>
	`

	ret += `
	<script>
		let insertAfter = (newNode, referenceNode) => {
			referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
	</script>`

	
	ret += `
	<script>
	let addMoveRowDownToDownButton = (button) => {
            
                const row = button.parentElement.parentElement;
				let prevRow = row.nextElementSibling;
				let firstRow = document.querySelector('tr');
				if (row.rowIndex < document.querySelectorAll('tr').length - 1) {
					insertAfter(row, prevRow);
				}
				else if (firstRow) {
					insertAfter(row, firstRow);
				}
	}
	</script>
	`

	if (audioFile) {
		ret += `<script>document.getElementById("audioAdd").addEventListener('click',
		() => {
    			let table = document.getElementById('playlist_table');
                let row = table.insertRow(table.rows.length);
    			let cell1 = row.insertCell(0);
				let cell2 = row.insertCell(1);
            	let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
            	
            	cell1.innerHTML = table.rows.length - 1;
            	cell2.innerHTML = document.getElementById('audioPlayer').src;
            	cell3.innerText = 'Audio';
                cell4.innerHTML = '<button type="button" class="removeRowButton">Delete</button> <button type="button" class="moveRowUpButton" onclick="addMoveRowUpToUpButton(this)">Up</button> <button type="button" class="moveRowDownButton" onclick="addMoveRowDownToDownButton(this)">Down</button>';
                addDeleteToDeleteButtons();
		})</script>`
	}

	if (videoFile) {
		ret += `<script>document.getElementById('videoAdd').addEventListener('click',
		() => {
    		let table = document.getElementById('playlist_table');
            let row = table.insertRow(table.rows.length);
			let cell1 = row.insertCell(0);
			let cell2 = row.insertCell(1);
			let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
			cell1.innerHTML = table.rows.length - 1;
			cell2.innerHTML = document.getElementById('videoPlayer').src
			cell3.innerText = 'Video';
            cell4.innerHTML = '<button type="button" class="removeRowButton">Delete</button> <button type="button" class="moveRowUpButton" onclick="addMoveRowUpToUpButton(this)">Up</button> <button type="button" class="moveRowDownButton" onclick="addMoveRowDownToDownButton(this)">Down</button>';
            addDeleteToDeleteButtons();
		})</script>`
	}

	if (posterImage) {
		ret += `<script>document.getElementById("imgAdd").addEventListener('click',
		() => {
    			let table = document.getElementById('playlist_table');
                let row = table.insertRow(table.rows.length);
    			let cell1 = row.insertCell(0);
				let cell2 = row.insertCell(1);
            	let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
            	cell1.innerHTML = table.rows.length - 1;
            	cell2.innerHTML = document.getElementById('posterImage').src;
            	cell3.innerText = 'Image';
                cell4.innerHTML = '<button type="button" class="removeRowButton">Delete</button> <button type="button" class="moveRowUpButton" onclick="addMoveRowUpToUpButton(this)">Up</button> <button type="button" class="moveRowDownButton" onclick="addMoveRowDownToDownButton(this)">Down</button>';
                addDeleteToDeleteButtons();
		})</script>`
	}



    res.send(ret);
})

app.listen(4080)
