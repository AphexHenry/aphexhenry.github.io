"use strict";
function Tentacles()
{
}

Tentacles.prototype.init = function(aOptions) {
  if(!aOptions) {
    aOptions = {};
  }
  var seed = aOptions.seed || 0;
  this.options = aOptions;

  this.lines = [];
  Tentacles.scroll = 0;

  this.timer = 0. + seed * 100;
  this.lastUpdate = new Date().getTime() / 1000;

  this.randomSeed = Math.random();
  this.lineThick = 1;

  var brightness = 255 * (0.3 + Math.random() * 0.8);
  var r = brightness;
  var g = brightness;
  var b = brightness;

  var amp = Math.random() * 1.2;
  r *= amp;
  g *= amp;
  b *= amp;

  this.r = Math.floor(r);
  this.g = Math.floor(g);
  this.b = Math.floor(b);

  this.frameIndex = 0;

  if(!this.options.webGl) {
    this.initCanvas(this.options);
  }

  if(this.options.webGl) {
    this.initWebGl(this.options);
  }
};

Tentacles.prototype.updateGlobal = function(){}

Tentacles.prototype.initCanvas = function(aOptions) {
  this.canvas = aOptions.element;
  this.ctx = this.canvas.getContext('2d');

  this.canvas.width = aOptions.element.clientWidth;
  this.canvas.height = aOptions.element.clientHeight;
};

Tentacles.prototype.initWebGl = function(aOptions) {
  this.geometry = new THREE.Geometry();
  var colors = [], material;

  var position, index;
  var points = this.lines;

  var spline = new THREE.Spline( points );
  var n_sub = 6;

  for (var i = 0; i < points.length * n_sub; i ++ ) {

    index = i / ( points.length * n_sub );
    position = spline.getPoint( index );

    this.geometry.vertices[ i ] = new THREE.Vector3( position.x, position.y, position.z );

    colors[ i ] = new THREE.Color( 0xffffff );
    colors[ i ].setHSL( 0.6, 1.0, Math.max( 0, - position.x / 200 ) + 0.5 );
  }

  this.geometry.colors = colors;
  this.geometry.dynamic = true;

  // lines
  material = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 1, linewidth: 3, vertexColors: THREE.VertexColors } );

  var line, p, scale = 0.3, d = 225;
  var parameters =  [
    [ material, scale*1.5, [-d,0,0],  this.geometry ]
  ];

  for ( i = 0; i < parameters.length; ++ i ) {
    p = parameters[ i ];
    line = new THREE.Line( p[ 3 ],  p[ 0 ] );
    line.scale.x = line.scale.y = line.scale.z =  p[ 1 ];
    line.position.x = p[ 2 ][ 0 ];
    line.position.y = p[ 2 ][ 1 ];
    line.position.z = p[ 2 ][ 2 ];
    aOptions.scene.add( line );
    this.line = line;
  }
};

Tentacles.prototype.getColorWithOpacity = function(aOpacity) {
  if(aOpacity >= 1) {
    return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
  }
  else {
    return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + aOpacity + ')';
  }
};

Tentacles.prototype.update = function(aDelta, aSkipDraw) {
  this.frameIndex++;
  var lTimer = new Date().getTime() / 1000;
  var lDelta = aDelta || (lTimer - this.lastUpdate);
  lDelta *= 2;
  lDelta = Math.min(lDelta, 0.03);
  this.lastUpdate = lTimer;
  this.timer += lDelta;

  switch(this.options.type) {
    case 'top':
    case "1":
      this.updateFixed(lDelta);
      break;
    case 'left':
    case "2":
      this.updateFixedSide(lDelta, false);
      break;
    case "3":
    case 'right':
      this.updateFixedSide(lDelta, true);
      break;
    default:
      this.updateInherited(lDelta, true);
      break;
  }

  if(!aSkipDraw) {
    if(this.options.webGl) {
      this.drawGl();
    }
    else {
      this.drawCanvas();
    }
  }
};

Tentacles.prototype.updateInherited = function() {
  console.log('call wrond updateInherited method.');
};

Tentacles.prototype.updateFixed = function(aDelta)
{
  var partCount = 50;
  if(this.lines.length <= 0) {

    var height = 0.4 +  0.1 * Math.cos(this.randomSeed * 10000);
    for(var i = 0; i < partCount; i++) {
      var lNewHead = {};
      lNewHead.x = (0.5 - this.randomSeed);
      lNewHead.y = height * i / partCount;
      this.lines.push(lNewHead);
    }
  }

  var spaceCoeff = this.canvas.width / 100;
  for(var i = 0; i < this.lines.length; i++) {
    this.lines[i].xDraw = (0.5 + this.lines[i].x) + (i / this.lines.length) * 0.1 * Math.cos(this.timer * 0.4 + this.lines[i].y * spaceCoeff + this.randomSeed * 1000);
    this.lines[i].yDraw = 1 - this.lines[i].y;// * (1 + Math.cos(this.timer * 0.4 + this.lines[i].x * spaceCoeff));

    this.lines[i].xDraw *= this.canvas.width;
    this.lines[i].yDraw *= this.canvas.height;
  }
};

Tentacles.prototype.updateFixedSide = function(aDelta, isRight)
{
  var partCount = 6;
  if(this.lines.length <= 0) {
    this.scrollFriction = 0;
    this.scrollFrictionSpeed = 0;
    this.lineThick = 2;
    this.secondSeed = Math.cos(this.randomSeed * 10000);
    var height = 0.7 +  0.25 * Math.cos(this.randomSeed * 10000);
    for(var i = 0; i < partCount; i++) {
      var lNewHead = new THREE.Vector3();
      lNewHead.x = (0.5 - this.randomSeed);
      lNewHead.y = height * i / partCount;
      this.lines.push(lNewHead);
    }
  }

  var spaceCoeff = this.options.element.clientHeight / 2900;
  var scrollPos = Tentacles.scroll * 0.3;
  var frictionDiff = (scrollPos - this.scrollFriction);
  this.scrollFrictionSpeed += frictionDiff * (10 - 8 * this.secondSeed)  * aDelta;
  this.scrollFriction += this.scrollFrictionSpeed * aDelta;
  this.scrollFrictionSpeed *= 0.96;
  var scrollEffect = frictionDiff / this.options.element.clientHeight;
  var limit = 0.3;
  scrollEffect = -Math.max(Math.min(scrollEffect, limit), -limit);
  var scrollEffectCoeff = 0.1;
  var scrollThresh = (Math.abs(scrollEffect) / limit) - 0.8;
  if(scrollThresh > 0) {
    this.scrollFriction += frictionDiff * 0.1;
  }
  var randomCoeff =  Math.random() * Math.max(0, scrollThresh) * 0.2;

  for(var i = 0; i < this.lines.length; i++) {
    var coeffStrength = (i / this.lines.length);
    coeffStrength *= coeffStrength;
    this.lines[i].yDraw = (0.5 + this.lines[i].x) + coeffStrength * (scrollEffect + scrollEffectCoeff * Math.cos(this.timer * 0.2 + this.lines[i].y * spaceCoeff + this.randomSeed * 1000));
    this.lines[i].xDraw = 1 - this.lines[i].y;// * (1 + Math.cos(this.timer * 0.4 + this.lines[i].x * spaceCoeff));
    this.lines[i].xDraw += randomCoeff * coeffStrength;
    this.lines[i].xDraw *= 0.9;
    this.lines[i].xDraw += 0.1;

    if(isRight) {
      this.lines[i].xDraw = (1-this.lines[i].xDraw) * this.options.element.clientWidth;
    }
    else {
      this.lines[i].xDraw = this.lines[i].xDraw * this.options.element.clientWidth;
    }
    this.lines[i].yDraw *= this.options.element.clientHeight;
  }
};

Tentacles.prototype.getDistanceHead = function(lNewHead) {
  if(this.lines.length < 2) {
    return null;
  }
  var xDis = (lNewHead.x - this.lines[1].x);
  var yDis = (lNewHead.y - this.lines[1].y);
  return xDis * xDis + yDis * yDis;
};

Tentacles.prototype.drawGl = function() {
  for (var i = 0; i < this.lines.length; i++) {
    var line = this.lines[i];
    var geo = this.geometry.vertices[i];
    geo.x = line.xDraw;//600 * Math.cos(3 * i / this.lines.length);
    geo.y = line.yDraw;//600 * Math.sin(3 * i / this.lines.length)
  }
  this.geometry.verticesNeedUpdate = true;
};

Tentacles.prototype.drawCanvas = function()
{
  this.ctx.lineWidth = 2;
  this.ctx.beginPath();
  var height = 0;
  if(this.options.scrollable) {
    height = Tentacles.scroll * 0.8;
  }

  this.ctx.moveTo(this.lines[0].xDraw, this.lines[0].yDraw - height);
  if(this.lines.length > 9 || this.lines.length < 3) {
    for(var i = 1; i < this.lines.length; i++)
    {
      var x = this.lines[i].xDraw;// + xMod;
      var y = this.lines[i].yDraw;// + yMod;
      this.ctx.lineTo(x, y - height);
    }
  }
  else {
    var indexMiddle = Math.floor(this.lines.length / 2);
    var indexEnd = this.lines.length - 1;
    this.ctx.quadraticCurveTo(this.lines[2].xDraw, this.lines[2].yDraw,this.lines[indexEnd].xDraw, this.lines[indexEnd].yDraw);
  }

  // linear gradient from start to end of line
  var scroll = Tentacles.scroll + 200;
  if(this.options.fog) {
    var limitTop = window.innerHeight * 0.6;
    var limitBottom = window.innerHeight * 1;
    var grad= this.ctx.createLinearGradient( 0, limitTop, 0,  limitBottom);
    grad.addColorStop(0, this.getColorWithOpacity(1));
    grad.addColorStop(1, this.getColorWithOpacity(0));
  }
  else {
    this.ctx.strokeStyle=this.getColorWithOpacity(1);
  }

  this.ctx.strokeStyle = grad;
  var lineThick = Math.max(1, Math.floor(this.lineThick * this.canvas.width / 900))
  this.ctx.lineWidth = 1;//this.lineThick;
  this.ctx.stroke();
};

Tentacles.setScroll = function(aValue) {
  Tentacles.scroll = aValue;
};