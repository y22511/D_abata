//-------------Cookie--------------//
function Cookie() {
    var key=[2];
    var p = 0;
    var r = document.cookie.split(';');
    r.forEach(function(value) {
        content = value.split('=');
        key[p] = content[0];
        p++;
    })
    return key;
}

//-------------Test--------------//
document.querySelector(".save").addEventListener("click", function(){
    document.cookie = 'key1= 1234; max-age= 5';
    document.cookie = 'key2= 5678';
    document.cookie = 'key3= 9999';
})
document.querySelector(".display").addEventListener("click", function(){
    // console.log(document.cookie);
    let iii = Cookie();
    console.log(iii);
})
