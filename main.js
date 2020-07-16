const socketio = io();
const form = document.getElementById("form");
const input = document.getElementById("msg");
const chats = document.getElementById("chats");

const nameform = document.getElementById("nameform");
const name = document.getElementById("name");

let username='';
nameform.addEventListener('submit', function(event){
  username = name.value;
  event.preventDefault();
  nameform.style.display ="none";
  form.style.display ="block";
})

form.addEventListener('submit', function(event){
  const msg = JSON.stringify({msg: input.value, name: username})
  socketio.emit('message', msg);
  input.value='';
  event.preventDefault();
})
socketio.on('message',function(msg){
  const obj = JSON.parse(msg);

  const dt = document.createElement("dt");
  const dd = document.createElement("dd");
  dt.append(obj.name);
  chats.append(dt);
  dd.append(obj.msg);
  chats.append(dd);
  dd2.append(formatDate(new Date(msg.date), 'yyyy/MM/dd HH:mm:ss'));
});

function formatDate (date, format) {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
  return format;
};