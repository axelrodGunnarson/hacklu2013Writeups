var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;
var express=require("express");

var app=express();

app.use(express.bodyParser());

app.get("/", function (request, response) {
    fs.readFile("index.html", function (err, data) {
        if (err) {
            throw err;
        }
        response.send(data.toString());
    })
});
app.get("/key.js", function (request, response) {
    fs.readFile("key.js", function (err,data) {
        if (err) {
            throw err;
        }
        response.send(data.toString());
    });
});
app.post("/gimmetv", function (request, response) {
    var key = request.body.key;
    var debug = false;
    if (request.body.hasOwnProperty("debug")) {
        debug = true;
    }
    var password = "AXMNP91"; //I don't remember if it's actually that password, but in the end nothing changes
    var obj = {};
    obj["success"]=false;
    obj["response"]="wrong key";
    if (key ===password) {
        console.log("given res to "+key);
        obj["success"] = true;
        obj["response"] = "OH_THAT_ARTWORK!";
    }
    if (debug) {
        var now = Date.now();
        var end = now;
        for (i=0; i < Math.min(password.length, key.length); i+=1){
            if (key[i]=== password[i]) {
                end += 100;
            }
            else {
                break;
            }
        }
        obj["start"]=now;
        obj["end"]=end;
    }
    response.send(obj);
});

console.log("created");
app.listen(port);
console.log("listening..");
