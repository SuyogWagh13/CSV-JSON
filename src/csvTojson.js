const fs = require('fs')
csvfile = fs.readFileSync('../data/simple.csv')
const arr = csvfile.toString().split("\n")
var jsonObject = [];
var headers = arr[0].split(',')
for(var i =1; i<arr.length-1; i++)
{
  var data = arr[i].split(',');
  var object = {};
  for(var j = 0; j<data.length; j++)
  {
    object[headers[j].trim()] = data[j].trim();
  }
  jsonObject.push(object)
}
console.log((jsonObject))
