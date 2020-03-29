//author: Anime no Sekai © - 2020



function createDoc(){
    axios({
        method: 'post',
        url: 'https://jsonblob.com/api/jsonBlob',
    })
    .then(function(response){
        var document_url = response.headers.location
        window.localStorage.setItem('document_url', document_url)
        var newDocURL = "https://realtimetextedit.netlify.com/?id=" + document_url.replace('https://jsonblob.com/api/jsonBlob/', '')
        document.getElementById('document_url').setAttribute('value', newDocURL)
        console.log('Document created!')
        window.open(newDocURL, '_self')
    })
}

var getTextInterval
function getText(){
    getTextInterval = setInterval(function(){
    if(window.localStorage.getItem('proceed') === 'true'){
    axios({
        method: 'get',
        url: window.localStorage.getItem('document_url')
    })
    .then(function(response){
        if(response.data.text !== undefined){
        var newText = response.data.text
        document.getElementById('mainText').value = newText
    }
    })
    .catch(function(error){
        if(error.response.status === 404){
            console.log('Document has been deleted and/or is not found on the server')
            document.getElementById('mainText').value = '//Current document has been deleted';
            document.getElementById('mainText').setAttribute('readonly', true)
            clearInterval(getTextInterval)
            document.getElementById('link').style.display = 'none';
            document.getElementById('delete_btn').style.display = 'none';
        }
    })
}
    },1000)
}

function putText(){
    var proceed = window.localStorage.getItem('proceed')
    if(proceed === 'true'){
    window.localStorage.setItem('proceed', 'false')
    clearInterval(getTextInterval)
    var sentText = document.getElementById('mainText').value
    axios({
        method: 'put',
        url: window.localStorage.getItem('document_url'),
        data: {
            text: sentText
        }
    })
    .then(function(){
        window.localStorage.setItem('proceed', 'true')
        console.log('Data send!')
        setTimeout(getText(), 100)
    })
    .catch(function(error){
        if(error.response.status === 404){
            console.log('Document not found')
            console.log('Trying to retrieve document infos...')
            setTimeout(getText(), 100) 
        }
    })
}else if(proceed === false){
    setTimeout(putText(),100)
}
}

function deleteDoc(){
    axios({
        method: 'delete',
        url: window.localStorage.getItem('document_url')
    })
    .then(function(){
        clearInterval(getTextInterval)
        console.log('Document deleted')
        document.getElementById('link').style.display = 'none';
        document.getElementById('delete_btn').style.display = 'none';
        document.getElementById('mainText').value = 'Deleted!'
        document.getElementById('mainText').setAttribute('readonly', true)
    })
}


window.onload = function(){
    window.localStorage.setItem('proceed', 'true');
    console.log('Initialization...')
    const urlParams = new URLSearchParams(window.location.search);
    const documentID = urlParams.get('id');
    if(documentID !== null){
    window.localStorage.setItem('document_url', 'https://jsonblob.com/api/jsonBlob/' + documentID);
    document.getElementById('document_url').setAttribute('value', "https://realtimetextedit.netlify.com/?id=" + documentID)
    this.getText()
}else if(documentID === null){
    this.createDoc()
}
}



function copyText(){
    var copyText = document.getElementById("document_url");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    
    var tooltip = document.getElementById("copyingtoclipboard");
    tooltip.innerHTML = "URL Copied!";
  }
  
function outFunc(){
    var tooltip = document.getElementById("copyingtoclipboard");
    tooltip.innerHTML = "Copy to clipboard";
  }