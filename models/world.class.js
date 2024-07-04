class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    ctx;
    canvas;
    cloud =[
        new Clouds(),
    ];
   
    background = new Background();

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(chicken => {
            this.ctx.drawImage(chicken.img, chicken.x, chicken.y, chicken.width, chicken.height);
        });

        this.cloud.forEach(clouds => {
            this.ctx.drawImage(clouds.img, clouds.x, clouds.y);
        });
/*         this.ctx.drawImage(this.clouds.img, this.clouds.x, this.clouds.y)
 */
       this.ctx.drawImage(this.background.img, this.background.x, this.background.y);

        requestAnimationFrame(() => {
            this.draw();
        })
    };

 
}