class DrawableObject {
    x;
    y;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    offset = {
        width: 0,
        height: 0,
        x: 0,
        y: 0
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.log('Error loading img', error);
        }
    };
    
  

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        }); 
    };

    
}