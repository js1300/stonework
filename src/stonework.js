class Stonework {
  // TODO: add minimum frame width, frame border width and transition time properties
  constructor() {
    this.minimumFrameWidth = 250;
    this.frameBorderWidth = 16;
    this.galleryElement = document.getElementsByClassName("gallery")[0];
    this.loadedFrameElements = [];

    this.applyStyling();
    window.onload = this.gatherAndPositionFrames(true);
    window.addEventListener("resize", this.positionFrames);
  }

  applyStyling() {
    var frameElements;
    var i;
    var frameElement;
    var photoElement;
  
    this.galleryElement.style.position = "relative";
    frameElements = this.galleryElement.children;
  
    for (i = 0; i < frameElements.length; i+= 1) {
      frameElement = frameElements[i];
      frameElement.style.position = "absolute";
  
      photoElement = frameElement.firstElementChild;
      photoElement.style.width = "100%";
      photoElement.style.height = "100%";
      photoElement.style.objectFit = "fill";
    }
  }

  gatherAndPositionFrames(primaryExecution) {
    var frameElements;
    var i;
    var frameElement;
    var photoElement;
  
    while (this.loadedFrameElements.length > 0) {
      this.loadedFrameElements.pop();
    }
  
    frameElements = this.galleryElement.children;
  
    for (i = 0; i < frameElements.length; i+= 1) {
      frameElement = frameElements[i];
      if (frameElement.dataset.width && frameElement.dataset.height) {
        this.loadedFrameElements.push(frameElement);
  
        if (frameElement.dataset.hex_colour) {
          frameElement.style.backgroundColor = frameElement.dataset.hex_colour;
          photoElement = frameElement.firstElementChild;
          if (!photoElement.complete) {
            photoElement.style.visibility = "hidden";
            photoElement.style.opacity = "0";
            photoElement.onload = function () {
              this.style.visibility = "visible";
              this.style.opacity = "1";
              this.style.transition = "opacity 0.5s linear";
            };
          }
        }
      } else if (frameElement.firstElementChild.complete) {
        frameElement.dataset.width = frameElement.firstElementChild.naturalWidth;
        frameElement.dataset.height = frameElement.firstElementChild.naturalHeight;
        this.loadedFrameElements.push(frameElement);
      } else if (primaryExecution) {
        frameElements[i].firstElementChild.onload = function () {
          this.gatherAndPositionFrames(false);
        };
      }
    }
  
    this.positionFrames();
  }

  positionFrames() {
    var nextFrameIndex = 0;
    var rowOffsetY = 0;
    var maxRows = this.loadedFrameElements.length;
    var lastIndex = this.loadedFrameElements.length - 1;
    var i;
    var rowFrameElements;
    var minimumRequiredWidth;
    var ratioArray;
    var j;
    var placementInformation;
  
    for (i = 0; i < maxRows; i+= 1) {
      rowFrameElements = [];
      minimumRequiredWidth = 0;
      ratioArray = [];
  
      if (nextFrameIndex > lastIndex) {
        break;
      } else if (nextFrameIndex == lastIndex) {
        rowFrameElements.push(this.loadedFrameElements[nextFrameIndex]);
        ratioArray = [1];
        nextFrameIndex = lastIndex + 1;
      } else {
        for (j = nextFrameIndex; j < this.loadedFrameElements.length; j+= 1) {
          rowFrameElements.push(this.loadedFrameElements[j]);
  
          placementInformation = this.calculatePlacementInformation(rowFrameElements);
          minimumRequiredWidth = placementInformation.minimumRequiredWidth;
  
          if (minimumRequiredWidth > this.galleryElement.clientWidth) {
            rowFrameElements.pop();
            placementInformation.ratioArray.pop();
            ratioArray = placementInformation.ratioArray;
            nextFrameIndex = j;
            break;
          } else if (j == lastIndex) {
            ratioArray = placementInformation.ratioArray;
            nextFrameIndex = lastIndex + 1;
          }
        }
      }
  
      rowOffsetY += this.positionFramesInRow(this.galleryElement.clientWidth, rowOffsetY, rowFrameElements, ratioArray);
    }
  
    this.galleryElement.style.height = rowOffsetY + this.frameBorderWidth + "px";
  }

  calculatePlacementInformation(rowFrameElements) {
    var dimensionsArray = [];
    var i;
    var maximumHeight;
    var scaleFactor;
    var minimumWidth;
    var ratioArray;
    var ratioSum;
  
    for (i = 0; i < rowFrameElements.length; i+= 1) {
      dimensionsArray.push({"height": rowFrameElements[i].dataset.height, "width": rowFrameElements[i].dataset.width});
    }
  
    maximumHeight = Math.max(...dimensionsArray.map((d) => d.height));
  
    for (i = 0; i < dimensionsArray.length; i+= 1) {
      if (dimensionsArray[i].height != maximumHeight) {
        scaleFactor = maximumHeight / dimensionsArray[i].height;
        dimensionsArray[i].width = dimensionsArray[i].width * scaleFactor;
        dimensionsArray[i].height = dimensionsArray[i].height * scaleFactor;
      }
    }
  
    minimumWidth = Math.min(...dimensionsArray.map((d) => d.width));
  
    ratioArray = [];
    for (i = 0; i < dimensionsArray.length; i+= 1) {
      ratioArray.push(dimensionsArray[i].width / minimumWidth);
    }
  
    ratioSum = ratioArray.reduce((a, b) => a + b, 0);
  
    return {"minimumRequiredWidth": (ratioSum * this.minimumFrameWidth) + ((rowFrameElements.length + 1) * this.frameBorderWidth), "ratioArray": ratioArray};
  }

  positionFramesInRow(galleryWidth, rowOffsetY, rowFrameElements, ratioArray) {
    var availableWidth = galleryWidth - ((rowFrameElements.length + 1) * this.frameBorderWidth);
    var ratioSum = ratioArray.reduce((a, b) => a + b, 0);
    var maxFrameHeight = 0;
    var frameWidthArray = [];
    var i;
    var frameWidth;
    var frameHeight;
    var frameWidthSum;
    var rowOffsetX;
  
    for (i = 0; i < rowFrameElements.length; i+= 1) {
      frameWidth = Math.round(availableWidth * (ratioArray[i] / ratioSum));
      frameHeight = Math.round((rowFrameElements[i].dataset.height / rowFrameElements[i].dataset.width) * frameWidth);
  
      frameWidthArray.push(frameWidth);
      maxFrameHeight = Math.max(frameHeight, maxFrameHeight);
    }
  
    frameWidthSum = frameWidthArray.reduce((a, b) => a + b, 0);
    if (frameWidthSum != availableWidth) {
      // TODO: double check the output of this
      frameWidthArray[frameWidthArray.length * Math.random | 0] += availableWidth - frameWidthSum;
    }
  
    rowOffsetX = 0;
    for (i = 0; i < rowFrameElements.length; i+= 1) {
      frameWidth = frameWidthArray[i];
  
      rowFrameElements[i].style.left = rowOffsetX + this.frameBorderWidth + "px";
      rowFrameElements[i].style.top = rowOffsetY + this.frameBorderWidth + "px";
      rowFrameElements[i].style.width = frameWidth + "px";
      rowFrameElements[i].style.height = maxFrameHeight + "px";
  
      rowOffsetX += frameWidth + this.frameBorderWidth;
    }
  
    return maxFrameHeight + this.frameBorderWidth;
  }
}

if (typeof module !== "undefined") {
  module.exports = Stonework;
}
