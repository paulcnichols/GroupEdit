$(document).ready(function () {
  
  var socket = io.connect('http://localhost', {'reconnect': true});
  
  var disabled = false;
  var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "python",
    lineNumbers: true,
    // seems to be a bug with indent mode, next event adds space at the wrong line
    // tabMode: "indent",  
    onChange:  function (inst, text) {
      if (!disabled) {
        text.document_id = document_id;
        text.socket_id = socket.id;
        console.log(text);
        socket.emit('update', text); 
      }
    }
  });
  
  socket.on('update-'+document_id, function (update) {
    disabled = true;

    var d = update;
    do {
      editor.replaceRange(d.text.join('\n'), d.from, d.to);
      d = d.next;
    } while (d != undefined);
    
    disabled = false;
  });
  socket.on('bound', function (binding) {
    socket.id = binding.id;
  });
  socket.on('connect', function ()  {
    socket.emit('bind', {document_id:document_id});
  })
  
});