var register = document.getElementById('register');
var login = document.getElementById('login');

var rb = document.getElementById('rb');
var lb = document.getElementById('lb');
var ob = document.getElementById('ob');

var logBtn = document.getElementById('logBtn');
var regBtn = document.getElementById('regBtn');

var nI = document.getElementsByClassName('nI');
var passI = document.getElementsByClassName('passI');
var emailI = document.getElementsByClassName('emailI');

var nameD = document.getElementById('name');

var game = document.getElementsByClassName('game');

function reqLogin(){
login.className = 'form';
}
function reqReg(){
register.className = 'form';
}
function closeReq(){
login.className = 'form hide';
register.className = 'form hide';
}

lb.onclick = function(){
reqLogin();
}

rb.onclick = function(){
reqReg();
}


logBtn.onclick = function(){
    if( !emailI[0].validity.valid ){
        alert('Valid email!');
    }else{
        if(passI[0].value.length < 8){
        alert('Short password! Min length 8');
        }else{
            firebase.auth().signInWithEmailAndPassword(emailI[0].value, passI[0].value).catch(function(error) {
            errorCode = error.code;
            if(errorCode == "auth/wrong-password"){
                alert('Wrong password!')
            }else{
                if(errorCode == "auth/invalid-email"){
                    alert('Wrong email!')
                }else{
                 window.location.reload();   
                }
            }
        });
        }
    }
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

regBtn.onclick = function(){
    if(findNickname(nI[0].value)){
        if(Boolean(JSON.parse(httpGet('https://app.verify-email.org/api/v1/otnge6so7NnClqfHmIVPr5wmZ4DxJTIdKHyGfbCkZXTiAEaveL/credits')).credits==0) != Boolean(!JSON.parse(httpGet('https://app.verify-email.org/api/v1/otnge6so7NnClqfHmIVPr5wmZ4DxJTIdKHyGfbCkZXTiAEaveL/verify/' + emailI[1].value)))){
    if( !emailI[1].validity.valid ){
        alert('Valid email!');
    }else{
        if(passI[1].value.length < 8){
        alert('Short password! Min length 8');
        }else{
            firebase.auth().createUserWithEmailAndPassword(emailI[1].value, passI[1].value).catch(function(error) {});
        }
    }}else{
        alert('This email is a fake!')
    }
}else{
    alert('This nickname already contains in system!');
}}

function findNickname(niks){
	var i=1;
	while(Number(get['users']['guid'].length)+1!=i){
		if(get['users'][get['users']['guid'][i]].nickname == undefined){
		set(get['users']['guid'][i] + '/nickname',randNick());	
		}
		if(get['users'][get['users']['guid'][i]].nickname == niks){
			return false;
		}
		i++;
	}
	return true;
}

ob.onclick = function(){
firebase.auth().signOut().then(function() {
  window.location.reload();
}).catch(function(error) {
  console.error('Something weird when you trying log out.');
  console.error(String(error));
});
}

closeReq();
firebase.auth().onAuthStateChanged(function(user) {
if (firebase.auth().currentUser !== null){
    
    setTimeout(function(){if(nI[0].value != ""){if(findNickname(nI[0].value)){
        set('users/' + firebase.auth().currentUser.uid + '/nickname',nI[0].value);

        set('users/' +'guid' + '/length', (Number(get['users']['guid'].length) + 1).toString());
        set('users/guid/' + get['users']['guid'].length,firebase.auth().currentUser.uid);
        window.location.reload();
    }}},3000);
                
    ob.className = '';
    lb.className = 'hide';
    rb.className = 'hide';
    nameD.innerText = 'Logged in ' + firebase.auth().currentUser.email;
    nameD.className = '';
    
    game[0].onclick = function(){
        window.open("https://simakyr.github.io/drawMe/","_self");
    }
}else{
    game[0].onclick = function(){
        alert('To use games, please login!');
    }
}
    
});
