# API 명세서


# Base URL
-

>  # /input


## Request

**method** : POST  
**headers** : {
  Contnet-Type : application/json
}

**body** 
```
  {
    "input" : "오늘 여자친구가 생길까요??"
  }
```


## Response

```

{ // status 200
    "statusCode":200
	"message" : true,
	"data" : {
		"output":"여자친구요? 절대 안생겨요"
	}
}


{ // status 500
	"statusCode":500
	"message" : false,
	"data" : null
}
```
