document.forms[0].addEventListener('submit', function(e) {
    var key = document.getElementById('key').value;
    var xhr = new XMLHttpRequest();
    xhr.open('post', document.forms[0].action);
    xhr.addEventListener('load', function() {
        data = JSON.parse(xhr.responseText);
        if (data['success']) {
            document.getElementById('error').style.display = 'none';
            document.getElementById('news').style.display = 'block';
            document.getElementById('newstext').innerHTML = data['response'];
        } 
        else {
            document.getElementById('error').innerHTML = data['response'];
        }
    });
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('key=' + encodeURIComponent(key)/* + '&debug'*/)
    e.preventDefault();
    return false;
});
document.getElementById('key').focus();
