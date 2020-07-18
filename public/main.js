class Perspective {
  constructor(options) {
    this.container = options.container || window;
    this.items = options.items;
    this.item = options.item;
    this.dropshadow = options.dropshadow;
    this.isRaf = options.isRaf;
    this.counter = 0;
    this.refreshRate = 10;
    this.mouse = {
      x: 0,
      y: 0,
      _x: 0,
      _y: 0,
      updatePosition: function (event) {
        const e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
      },
      setCenter: function (element) {
        // set center to container mid
        this._x = element.offsetLeft + (element.offsetWidth / 2);
        this._y = element.offsetTop + (element.offsetHeight / 2);
      }
    };
  }

  transform(item, x, y) {
    const style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    item.style.transform = style;
    item.style.webkitTransform = style;
    item.style.mozTranform = style;
    item.style.msTransform = style;
    item.style.oTransform = style;
    // box-shadow
    if (!this.dropshadow) return;
    const shadowX = x * 100;
    const shadowY = y * 100;
    const boxShadow = `${shadowX}px ${shadowY}px 50px rgba(0, 0, 0, 0.3)`;
    item.style.boxShadow = boxShadow;
  }

  update(event) {
    // animate single item
    this.mouse.updatePosition(event);
  
    function move(item, timestamp) {
      const currentMouseX = (this.mouse.y / item.offsetHeight / 2).toFixed(2);
      const currentMouseY = (this.mouse.x / item.offsetWidth / 2).toFixed(2);
      this.transform(item, currentMouseX, currentMouseY);
      requestAnimationFrame(move.bind(this, item));
    };

    // animate single item
    if (this.item) {
      requestAnimationFrame(move.bind(this, this.item));
    }
    // animate multiple items
    else if (this.items) {
      this.items.forEach(item => {
        requestAnimationFrame(move.bind(this, item));
      });
    }
  }

  timeout() {
    this.counter++;
    if (this.counter === this.refreshRate) {
      this.counter = 0;
      return true
    }
    return false;
  }

  mouseMoveHandler(event) {
    if (this.isRaf) {
      this.update(event); 
      return;
    }
    else {
      if (this.timeout()) {
        console.log('timeout()');
        this.update();
      }   
    }
  }
    
  mouseLeaveHandler(event) {
    // reset single item
    if (this.item) {
      this.item.style = ""; 
      return
    }
    // reset mutliple items
    this.items.forEach(item => {
      item.style = "";
    });
  }

  mouseEnterHandler(event) {
    this.update(event);
  }

  init() {
    this.mouse.setCenter(this.container);
    this.container.onmousemove = this.mouseMoveHandler.bind(this);
    this.container.onmouseleave = this.mouseLeaveHandler.bind(this);
    this.container.onmouseenter = this.mouseEnterHandler.bind(this);
  }
}

