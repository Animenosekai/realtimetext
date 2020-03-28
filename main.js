function createDoc(){
    axios({
        method: 'post',
        url: 'https://jsonblob.com/api/jsonBlob',
    })
    .then(function(response){
        var document_url = response.headers.location
        window.localStorage.setItem('document_url', document_url)
        document.getElementById('document_url').innerHTML = 'The url of this document is: ' + "https://realtimetextedit.netlify.com/index.html?id=" + document_url.replace('https://jsonblob.com/api/jsonBlob/', '')
        console.log('Document created!')
    })
}

var getTextInterval
function getText(){
    getTextInterval = setInterval(function(){
    axios({
        method: 'get',
        url: window.localStorage.getItem('document_url')
    })
    .then(function(response){
        var newText = response.data.text
        document.getElementById('mainText').value = newText
    })
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
}else if(proceed === false){
    setTimeout(putText(),100)
}
}

window.onload = function(){
    const urlParams = new URLSearchParams(window.location.search);
    const documentID = urlParams.get('id');
    window.localStorage.setItem('document_url', 'https://jsonblob.com/api/jsonBlob/' + documentID);
    document.getElementById('document_url').innerHTML = 'The url of this document is: ' + "https://realtimetextedit.netlify.com/index.html?id=" + documentID
    window.localStorage.setItem('proceed', 'true');
    console.log('Initialization...')
}