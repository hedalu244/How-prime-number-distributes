function geti(id) { return document.getElementById(id); }

var timer = 0;
function draw(plot, order) {
  var canvas = geti('canvas');
  var ctx = canvas.getContext('2d');

  var imageData = new ImageData(canvas.width, canvas.height);
  var data = imageData.data;

  var a = 0;
  clearTimeout(timer);
  loop();
  function loop(){
    for(var j = 0; j < 1000; j++) {
      var i = a + j;
      if (data.length <= i) {
        break;
      }
      var x = i % canvas.width;
      var y = Math.floor(i / canvas.width);
      var color = plot(order(x, y)) ? 255 : 0;
      data[i * 4 + 0] = color;
      data[i * 4 + 1] = color;
      data[i * 4 + 2] = color;
      data[i * 4 + 3] = 255;
    }
    a += 1000;
    ctx.putImageData(imageData, 0, 0);
    if(a < data.length) timer = setTimeout(loop, 0);
  }
}

function triangleOrder(x, y){
  return (x + y) * (x + y + 1) / 2 + x + 1;
}
function squareOrder(x, y){
  return Math.max(x, y) * Math.max(x, y) + (x < y ? x : 2 * x - y) + 1;
}

function prime(x)
{
  if (x < 2) return false;
  else if (x == 2) return true;
  else if (x % 2 == 0) return false;
  var sqrtNum = Math.sqrt(x);
  for (var i = 3; i <= sqrtNum; i += 2)
    if (x % i == 0) return false;
  return true;
}
﻿function multiple(m){
  return x=>(value = x % m == 0);
}
function indexDebug(index) {
  var a = [[]];
  for(var x = 0; x < 20; x++, a[x]=[])
    for (var y = 0; y < 20; y++)
   a[x][y] = index(x, y);
  return JSON.stringify(a, (key, value)=>typeof value[0] === 'number' ? ""+value.map(x=>("000"+x).substr(-3)) : value, " ");
}
function update(){
  var plot;
  var order;

  if(geti("prime").checked) plot = prime;
  if(geti("multiple").checked) plot = multiple(geti("mod").value);

  if(geti("triangleOrder").checked) order = triangleOrder;
  if(geti("squareOrder").checked) order = squareOrder;

  draw(plot, order);
}

onload = update;
