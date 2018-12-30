function test(){
    alert('test');
}

function validateHangman(){
    // should validate that only a single alphabetic char was input
    var guess = document.getElementById("guess");
    guess.value=guess.value.toLowerCase();



    // shouldn't be allowed, just in case
    if (guess.value.toString().length > 1){
        alert("Please only enter a single letter!");
        return false;
    }

    if (!guess.value.match(/[a-z]/i)){
        alert("Please enter a letter");
        return false;
    }

    return true;
}