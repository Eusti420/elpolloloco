class Statusbar extends DrawableObject {
   

    IMAGES_STATUSBAR_HEALTH = [
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_HEALTH);
        this.x = 100;
        this.y = 100;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    };

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 1;
        } else if (this.percentage > 80) {
            return 2;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 4;
        } else if (this.percentage > 20) {
            return 5;
        } else {
            return 6;
        }
    }
};