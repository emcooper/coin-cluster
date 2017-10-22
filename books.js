

module.exports = {helloWorld}

function helloWorld(){
  date = new Date().toTimeString()
  return "<h1>" + date + "</h1>"
}
