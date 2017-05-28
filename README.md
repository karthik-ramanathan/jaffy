# Jaffy - Userfriendly JS framework
framework developed in JS language for passionate JS developers. If you find anything messy ? [report me](https://karthik.pro/support)

## Rest Client
Basic example

```
var a = new jaffy.restAPI();
a.setUrl("http://yourresturl");
a.GET(function(response){
    console.log(response);
});
```

## Setup Rest URL

**setUrl(url)**

you can define relative or absolute url.

## REST Methods
* GET
* POST
* OPTIONS
* PUT
* DELETE
* PATCH

## Headers

* setHeader(variable, value)

for example

```
var a = new jaffy.restAPI();
a.setUrl("http://yourresturl");
a.setHeader("Authorization", "Bearer AJDYOWOJMXL273jsiJs72js82==");
a.GET(function(response){
    console.log(response);
});
```

## Query params

* setParam(variable, value)

for example

```
var a = new jaffy.restAPI();
a.setUrl("http://yourresturl");
a.setParam("test", "1234");
a.GET(function(response){
    console.log(response);
});
```

## Body as Formdata

* setBody(variable, value)

for example

```
var a = new jaffy.restAPI();
a.setUrl("http://yourresturl");
a.setBody("test", "1234");
a.POST(function(response){
    console.log(response);
});
```

## Body as Payload

* setParam(variable, value)

for example

```
var a = new jaffy.restAPI();
a.setUrl("http://yourresturl");
a.setPayload("test", "1234");
a.POST(function(response){
    console.log(response);
});
```
> Note: setParam() & setBody() will not work with only POST methods. also rest will be used as payload once you started using setParam()

## Advanced features

**sync(true|false)**

use to make syncronous rest request. but this feature will block the execution of main thread. use only if it is really necessary.


