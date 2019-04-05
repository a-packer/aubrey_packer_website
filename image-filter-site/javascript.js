
var imgCanvas = document.getElementById("can");
var ctx = imgCanvas.getContext("2d");


/* The following code was adapted by Zach Frisch's article "Fixing HTML5 2d Canvas Blur" https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da */

var dpi = window.devicePixelRatio;  


function fix_dpi() {
  let style = {

    height() {
      return +getComputedStyle(imgCanvas).getPropertyValue('height').slice(0,-2);  // slice to get rid of "px"
    },
    width() {
      return +getComputedStyle(imgCanvas).getPropertyValue('width').slice(0,-2);  // slice to get rid of "px"
    }
  }

  imgCanvas.setAttribute('width', style.width() * dpi);
  imgCanvas.setAttribute('height', style.height() * dpi);
}

function draw() {
  //call the dpi fix every time 
  //canvas is redrawn
  fix_dpi();
  ctx.fillStyle = "#3D3D3D";
  ctx.font = "60px Arial";
  ctx.fillText("Upload Photo,", 60,115);
  ctx.fillText("then add filters for fun!", 60,200);
  
}

requestAnimationFrame(draw);



ctx.fillStyle = "black";
ctx.font = "20px Arial";
ctx.fillText("Upload Photo,", 25,60);
ctx.fillText("then add filters for fun!", 40, 90);

function upload() { 
  var fileInput = document.getElementById("imgInput");
  imageUpload = new SimpleImage(fileInput);
  originalUpload = new SimpleImage(fileInput);
  originalUpload1 = new SimpleImage(fileInput);
  originalUpload2 = new SimpleImage(fileInput);
  originalUpload3 = new SimpleImage(fileInput);
  originalUpload4 = new SimpleImage(fileInput); 
  originalUpload5 = new SimpleImage(fileInput);
  
  imageUpload.drawTo(imgCanvas);
  
}

// Gray Scale function ****************************************************//
function grayScale() {
  var imgG = imageUpload;
  for (var pixel of imgG.values()) {
    avgPixel = ((pixel.getGreen()+pixel.getRed()+pixel.getBlue())/3)
    pixel.setGreen(avgPixel);
    pixel.setRed(avgPixel);
    pixel.setBlue(avgPixel);
  }
  imgG.drawTo(imgCanvas);
  
}
// Rose Colored Glasses function *******************************************//
function makeRose() {
  
  var imgR = imageUpload;
  
  for (var pixel of imgR.values()) {
    pixel.setGreen(pixel.getGreen() -20);
    pixel.setRed(pixel.getRed() + 60);
    pixel.setBlue(pixel.getBlue() -20);
    }
  imgR.drawTo(imgCanvas);
}
// Mirror function ********************************************************//

function mirrorEffect() {
  
  var img = imageUpload;
  var halfWidth = img.getWidth()/2;
   
  if (img.getWidth()%2 === 0) {
        var i = 0;
        var mirrorPixel = null;
        
        for (var pixel of img.values()) {
            
            var x = pixel.getX();
            var y = pixel.getY();
        
            if (x > halfWidth) {
                mirrorPixel = img.getPixel((halfWidth - i), y);
                
                if ((halfWidth - i) == -0.5) {
                    i = 0.5;
                }
                
                i = i + 1;
                img.setPixel(x,y,mirrorPixel);
                
                if (i == ((halfWidth) - 1 )) {
                    i = 0;
                }  
            }
        }
    
    }
    
    else {
        i = 0;
        halfWidth = halfWidth + 0.5;
        
        for (pixel of img.values()) {
            
            x = pixel.getX();
            y = pixel.getY();
            
            if (x > halfWidth) {
                mirrorPixel = img.getPixel(halfWidth - i, y);

                i = i + 1;
                
                img.setPixel(x,y,mirrorPixel);
                
                if (i == ((halfWidth) -2)) {
                    i = 0;
                }
                else {continue;}          
            }
            else {continue;}           
        }  
    }
    img.drawTo(imgCanvas);
}
//  Stripe Function **********************************************************//

function addStripes() {
  
  var imgS = imageUpload;
  
  var thickness = imgS.getHeight()/35;
  
  function setBlack(pix) {
    pix.setGreen(210);
    pix.setBlue(210);
    pix.setRed(200);
    return(pix);
  }
  
    for (var pixel of imgS.values()) {
      
      var yValue = pixel.getY();
      

      if (yValue <= thickness*1) {
        setBlack(pixel);
      }
      else if (yValue <= thickness*2) {
        continue;
      }

      else if (yValue <= thickness*3) {
        setBlack(pixel);
      }
      else if (yValue <= thickness*4) {
        continue;
      }

      else if (yValue <= thickness*5) {
        setBlack(pixel);
      }
      else if (yValue <= thickness*6) {
        continue;
      }

      else if (yValue <= thickness*7) {
        setBlack(pixel);
      }
      else if (yValue <= thickness*8) {
        continue;
      }

      else if (yValue <= thickness*9) {
        setBlack(pixel);
      }
      else if (yValue <= thickness*10) {
        continue;
      }

      else if (yValue <= thickness*11) {
        setBlack(pixel);
      }
      else if (yValue <= thickness*12) {
        continue;
      }

      else if (yValue <= thickness*13) {
        setBlack(pixel);
      }
      else if (yValue <= thickness*14) {
        continue;
      }

      else if (yValue <= thickness*15) {
        setBlack(pixel);
      }
      else if (yValue <= thickness*16) {
        continue;
      }

      else if (yValue <= thickness*17) {
        setBlack(pixel);
      }
       
    }  
  imgS.drawTo(imgCanvas);
}
/****************************** Make Rainbow *********************************/

function makeRainbow() {
  var imgRain = imageUpload;
  height = imgRain.getHeight();
  
  for (var pixel of imgRain.values()) {
    
    var yRain = pixel.getY();
    var avgPixel = ((pixel.getGreen()+pixel.getRed()+pixel.getBlue())/3); 
    
    //Red
    if (yRain < height/7) { 
      if (avgPixel < 128) {
        pixel.setRed(2*avgPixel);
        pixel.setGreen(0);
        pixel.setBlue(0);
      }
      else if (avgPixel >= 128) {
        pixel.setRed(255);
        pixel.setGreen(2*avgPixel - 255);
        pixel.setBlue(2*avgPixel - 255);
      }
    }
    
    //Orange 
    else if (yRain >= height/7 && yRain < (height/7)*2) { 
      if (avgPixel < 128) {
        pixel.setRed(2*avgPixel);
        pixel.setGreen(0.8*avgPixel);
        pixel.setBlue(0);
      }
      else if (avgPixel >= 128) {
        pixel.setRed(255);
        pixel.setGreen(1.2*avgPixel - 51);
        pixel.setBlue(2*avgPixel - 255);
      }
    }
    
    //Yellow
    else if (yRain >= (height/7)*2 && yRain < (height/7)*3) { 
      if (avgPixel < 128) {
        pixel.setRed(2*avgPixel);
        pixel.setGreen(2*avgPixel);
        pixel.setBlue(0);
      }
      else if (avgPixel >= 128) {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2*avgPixel - 255);
      }
    }
    
    //Green
    else if (yRain >= (height/7)*3 && yRain < (height/7)*4) { 
      if (avgPixel < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avgPixel);
        pixel.setBlue(0);
      }
      else if (avgPixel >= 128) {
        pixel.setRed(2*avgPixel - 255);
        pixel.setGreen(255);
        pixel.setBlue(2*avgPixel - 255);
      }
    }
    
    //Blue 
    else if (yRain >= (height/7)*4 && yRain < (height/7)*5) { 
      if (avgPixel < 10) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(255);
      }
      else if (avgPixel >= 10) {
        pixel.setRed(2*avgPixel - 200);
        pixel.setGreen(2*avgPixel - 200);
        pixel.setBlue(255);
      }
    }
    
    //Indigo
    else if (yRain >= (height/7)*5 && yRain < (height/7)*6) { 
      if (avgPixel < 128) {
        pixel.setRed(0.8*avgPixel);
        pixel.setGreen(0);
        pixel.setBlue(2*avgPixel);
      }
      else if (avgPixel >= 128) {
        pixel.setRed(1.2*avgPixel - 51);
        pixel.setGreen(2*avgPixel - 255);
        pixel.setBlue(255);
      }
    }
    
    //Violet
    else if (yRain >= (height/7)*6) { 
      if (avgPixel < 128) {
        pixel.setRed(1.6*avgPixel);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avgPixel);
      }
      else if (avgPixel >= 128) {
        pixel.setRed(0.4*avgPixel + 153);
        pixel.setGreen(2*avgPixel - 255);
        pixel.setBlue(0.4*avgPixel + 153);
      }
    }
    else {
      break;
    }
  }
  
  imgRain.drawTo(imgCanvas);
  
}

/******************************* Blur ****************************************/

function makeBlur() {
  
  var imgBlur = imageUpload;
  
  function chances() {
    var chance = (Math.random());
    return chance;
  }
    
  function randShift() {
    var shift = Math.floor((Math.random()* 20 - 5));
    return shift;
   }
    
    width = imgBlur.getWidth();
    height = imgBlur.getHeight();
  
    var blurredImg = new SimpleImage(width,height);
      
    for (var pix of blurredImg.values()) {
          
        var y = pix.getY();
        var x = pix.getX();
        
        var shift = randShift();
        var newX = x + shift;
        var newY = y + shift;
      
        var pixChance = chances();
      
        if (pixChance < 0.5) {
          var newPix = imageUpload.getPixel(x,y);
          blurredImg.setPixel(x,y,newPix);
        }
      
        else {
        
          if (newX >= 0 && newX < width && newY >= 0 && newY < height) {

              newPix = imageUpload.getPixel(newX,newY);
              blurredImg.setPixel(x,y,newPix);           
          }     
          else {
              newPix = imageUpload.getPixel(x,y);
              blurredImg.setPixel(x,y,newPix);
          }  
        }
    }
  blurredImg.drawTo(imgCanvas);
}
 
/******************************* Original ************************************/

function returnOrig() {
  originalUpload.drawTo(imgCanvas);
  imageUpload = originalUpload1;
  if (i === 0) {
    i++;
    imageUpload = originalUpload2;
  }
  else if (i == 1) {
    i++;
    imageUpload = originalUpload3;
  }
  else if (i == 2) {
    i++;
    imageUpload = originalUpload4;
  }
  else if (i == 3) {
    i++;
    imageUpload = originalUpload5;
  }
}
