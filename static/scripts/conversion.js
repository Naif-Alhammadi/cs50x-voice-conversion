// file 
const inputFile = document.querySelector("#input-file");
const fileName = document.querySelector("#file-name");
let dragDrop = document.querySelector(".drag-drop-container");

const conversionList = document.querySelectorAll(".conversion-list");
let convertTo = "";
let userFile;
const listParagraph =document.querySelector("#consersion-p");

conversionList.forEach(list => {
    list.addEventListener("click", function(e){
        convertTo = e.target.textContent;

        // if user choose a file
        if (userFile)
        {
            listParagraph.innerHTML = "";

            // process the voice according to the user's chosen list
            const formData = new FormData();
            formData.append("file" , userFile);
            formData.append("convertTo", convertTo);

            fetch("/process",{
                method: "POST",
                body: formData
            }).then(response => response.json()).then(data => {
                console.log(data)
            }).catch(error => console.log(error));
        }

        // if user did not choose a file yet
        else 
        {
            listParagraph.innerHTML = "Choose file first";
        }
    });
});

const wavesurfer = WaveSurfer.create({
    container: '#waveform', // connect the wave with the dev
    waveColor: '#1e0af8',   // the primary color
    progressColor: '#745ce9', // color when turing on
    cursorColor: '#adacb3',   // indctor color
    barWidth: 2,            // columns widht
    barRadius: 3            // around the edges
});


// on off button
document.querySelector('#playButton').addEventListener('click', () => {
    wavesurfer.playPause();
});


// drag drop file

const checkFileExtention = function(fileName)
{
    if(fileName.name.slice(-4) !== '.wav')
        return false

    return true
}

dragDrop.addEventListener('dragover', function(e)
{
    e.preventDefault()
});

dragDrop.addEventListener('drop', function(e)
{
    e.preventDefault();
    const fileSrc = document.querySelector('#file-preview');
    const file = e.dataTransfer.files[0];
    const dropMessage = document.querySelector("#drag-drop-message");
    if(checkFileExtention(file))
    {

        fileSrc.src = URL.createObjectURL(e.dataTransfer.files[0]);
        wavesurfer.load(URL.createObjectURL(e.dataTransfer.files[0]));
        fileName.innerHTML = file.name;
        dropMessage.innerHTML = "";
        userFile = e.dataTransfer.file[0];
    }

    else {
        dropMessage.innerHTML = "You have to enter a .wav file";
    }
});


inputFile.addEventListener("change", function(){
    const file = inputFile.files[0];
    const fileSrc = document.querySelector('#file-preview');
    const dropMessage = document.querySelector("#drag-drop-message");

    if(checkFileExtention(file))
    {
        fileSrc.src = URL.createObjectURL(file);
        wavesurfer.load(URL.createObjectURL(file));
        dropMessage.innerHTML = "";
        fileName.innerHTML = file.name;
        userFile = file;
    }

    else {
        dropMessage.innerHTML = "You have to enter a .wav file";
    }
    
});

