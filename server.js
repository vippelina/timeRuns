//***************************************************
// Bootstrap to public modules
//***************************************************
var express = require('express'),
app = express(),
path = require('path'),
bodyParser = require('body-parser')
//***************************************************
// App settings and middleware
//***************************************************
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//----------------------------------------
//Run server
//----------------------------------------
app.listen(app.get('port'), function(){
	console.log("Server is running on port ", app.get('port'));
});