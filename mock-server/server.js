var express = require('express');
var app = express();
var port = 8080;

var cors = require('cors');
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/*', function (req, res, next) {
  res.header("authentication", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDg0NzMzNzcsIm5hbWUiOiJ6aGFuZ3lvbmdfbmV3IiwidXNlcl9pZCI6MX0.1dc_hmifgwd0kDMdZXiPbO82wlbCwSHBj7dv07mz-xk");
  next();
})

//登录
app.post('/dashboard/usercentre/login',function(req, res){
  var result = {
      "code": 0,
      "detail": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDg0NzMzNzcsIm5hbWUiOiJ6aGFuZ3lvbmdfbmV3IiwidXNlcl9pZCI6MX0.1dc_hmifgwd0kDMdZXiPbO82wlbCwSHBj7dv07mz-xk"
  }
  res.json(result);
})

//登出
app.post('/dashboard/usercentre/logout',function(req, res){
  var result = {
    "code": 0,
    "detail": "logout success"
  }
  res.json(result);
})

//获取检测车辆所有车型
app.get('/car/cartype', function(req, res){
  var result = {
    "Errcode" : 100,
    "List": [
      {
        "CarBrand": "奥迪",
        "CarType": "Q5"
      },
      {
        "CarBrand": "奥迪",
        "CarType": "A4L"
      },
      {
        "CarBrand": "奥迪",
        "CarType": "A3两厢"
      }
    ]
  }
  res.json(result);
})

//获取车型评分分析
app.get('/car/score-analysis', function(req, res){
  var result = {
    "Errcode" : 100,
    "Data": {
      "Engine": {
        "100-90": 45,
        "89-60":30,
        "59-20":20,
        "19-0":5,
      },
      "Battery":{
        "100-70": 45,
        "69-50":30,
        "49-20":20,
        "19-0":5,
      },
      "Coolant":{
        "100-70": 45,
        "69-50":30,
        "49-20":20,
        "19-0":5,
      },
      "Oil":{
        "100-70": 45,
        "69-50":30,
        "49-20":20,
        "19-0":5,
      },
      "Carbon":{
        "100-90": 45,
        "89-60":30,
        "59-20":20,
        "19-0":5,
      },
    }
  }
  res.json(result);
})

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

function errorHandler(err, req, res, next) {
  var error = {
    errorCode: "500",
    errorMessage: "call api error"
  }
  res.status(500);
  res.json(error);
}

app.listen(port, function () {
  console.log('server start, listen on port ' + port);
});
