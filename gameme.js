	  var config = {
		apiKey: "AIzaSyDnS0sAQ23PL2_Slys6mgRlzJHUGb-7WTU",
		authDomain: "drawme-9.firebaseapp.com",
		databaseURL: "https://drawme-9.firebaseio.com",
		projectId: "drawme-9",
		storageBucket: "drawme-9.appspot.com",
		messagingSenderId: "944726631004"
	  };
	  firebase.initializeApp(config);
	  function set(key,value){firebase.database().ref().child(key).set(value);}
	  get = {};
	  firebase.database().ref().on('value', snap => get = snap.val());
      ttt = get.users;
var register = document.getElementById('register');
var login = document.getElementById('login');
var forgotPs = document.getElementById('forgotPs');
var settings = document.getElementById('settings');

var rb = document.getElementById('rb');
var lb = document.getElementById('lb');
var ob = document.getElementById('ob');
var sb = document.getElementById('sb');

var saveSettings = document.getElementById('saveSettings');
var fogBtn = document.getElementById('fogBtn');

var logBtn = document.getElementById('logBtn');
var regBtn = document.getElementById('regBtn');

var fogBtn = document.getElementById('fogBtn');

var nI = document.getElementsByClassName('nI');
var passI = document.getElementsByClassName('passI');
var emailI = document.getElementsByClassName('emailI');

var nameD = document.getElementById('name');

var closeSettings = document.getElementById('closeSettings');

var game = document.getElementsByClassName('game');

var btnForgotPassword = document.getElementById('btnForgotPassword');

function reqLogin(){
login.className = 'form';
}
function reqReg(){
register.className = 'form';
}
function reqFog(){
forgotPs.className = 'form';
}
function reqSet(){
settings.className = 'form';
}
function closeReq(){
login.className = 'form hide';
register.className = 'form hide';
forgotPs.className = 'form hide';
settings.className = 'form hide';
}
closeReq();

lb.onclick = function(){
closeReq();
reqLogin();
}

rb.onclick = function(){
closeReq();
reqReg();
}
sb.onclick = function(){
closeReq();
reqSet();
}

logBtn.onclick = function(){
    if( !emailI[0].validity.valid ){
        alert('Valid email!');
    }else{
        if(passI[0].value.length < 8){
        alert('Short password! Min length 8');
        }else{
            firebase.auth().signInWithEmailAndPassword(emailI[0].value, passI[0].value).then(
                function(){closeReq();alert('You are login now.');}
            ).catch(function(error) {
            errorCode = error.code;
            if(errorCode == "auth/wrong-password"){
                alert('Wrong password!')
            }else{
                if(errorCode == "auth/invalid-email"){
                    alert('Wrong email!')
                }else{
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
    if(nI[0].value.length<64){
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
}}else{
    alert('Don\'t use long nickname!')
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
}).catch(function(error) {
  console.error('Something weird when you trying log out.');
  console.error(String(error));
});
}

closeReq();
firebase.auth().onAuthStateChanged(function(user) {
if (firebase.auth().currentUser !== null){
    
    if(nI[0].value != ""){if(findNickname(nI[0].value)){
        set('users/' + firebase.auth().currentUser.uid + '/nickname',nI[0].value);

        set('users/' +'guid' + '/length', (Number(get['users']['guid'].length) + 1).toString());
        set('users/guid/' + get['users']['guid'].length,firebase.auth().currentUser.uid);
        closeReq();
    }}
                
    ob.className = '';
    sb.className = '';
    lb.className = 'hide';
    rb.className = 'hide';
    nameD.innerText = 'Logged in ' + firebase.auth().currentUser.email;
    nameD.className = '';
    setTimeout(function(){while(typeof get.users != 'object'){
    }
    while(typeof get.users[firebase.auth().currentUser.uid] != 'object'){
    }
    nI[1].value = get.users[firebase.auth().currentUser.uid].nickname;
    },2000);
    
    game[0].onclick = function(){
        window.open("https://simakyr.github.io/drawMe/","_self");
    }
}else{
                    
    ob.className = 'hide';
    lb.className = '';
    rb.className = '';
    nameD.className = 'hide';
    sb.className = 'hide';
    game[0].onclick = function(){
        alert('To use games, please login!');
    }
}
    
});
btnForgotPassword.onclick = function(){
closeReq();
reqFog();
}
fogBtn.onclick = function(){
        if( !emailI[2].validity.valid ){
        alert('Valid email!');
            
}else{
        
firebase.auth().sendPasswordResetEmail(
    emailI[2].value)
    .then(function() {
      closeReq();
      alert('We send message to you email.');
    })
    .catch(function(error) {
      alert('You put wrong email!');
    });
    
}}

closeSettings.onclick = function(){
closeReq();
}

saveSettings.onclick = function(){
if(nI[1].value.length<64){
    if(findNickname(nI[1].value)){
  set('users/' + firebase.auth().currentUser.uid + '/nickname',nI[1].value);
  closeReq();
    }
    else{
    alert('Nickname using other people!');
    }
}else{
    alert('Very long nickname!')
}
}
