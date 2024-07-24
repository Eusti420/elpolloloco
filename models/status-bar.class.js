class Statusbar extends DrawableObject {
    IMAGES_STATUSBAR_HEALTH = [
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'graphics/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    ];

    IMAGES_STATUSBAR_COIN = [
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    IMAGES_STATUSBAR_BOTTLE = [
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'graphics/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    constructor(x, y, type) {
        super();
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.percentage = type === 'health' ? 100 : 0;
        this.type = type;

        if (type === 'health') {
            this.loadImages(this.IMAGES_STATUSBAR_HEALTH);
            this.setPercentage(this.percentage);
        } else if (type === 'coin') {
            this.loadImages(this.IMAGES_STATUSBAR_COIN);
            this.setPercentage(this.percentage);
        } else if (type === 'bottle') {
            this.loadImages(this.IMAGES_STATUSBAR_BOTTLE);
            this.setPercentage(this.percentage);
        }
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path;
        if (this.type === 'health') {
            path = this.IMAGES_STATUSBAR_HEALTH[this.resolveHealthImageIndex()];
        } else if (this.type === 'coin') {
            path = this.IMAGES_STATUSBAR_COIN[this.resolveCoinBottleImageIndex()];
        } else if (this.type === 'bottle') {
            path = this.IMAGES_STATUSBAR_BOTTLE[this.resolveCoinBottleImageIndex()];
        }
        this.img = this.imageCache[path];
    }

    resolveHealthImageIndex() {
        if (this.percentage === 100) {
            return 0;
        } else if (this.percentage > 80) {
            return 1;
        } else if (this.percentage > 60) {
            return 2;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 4;
        } else {
            return 5;
        }
    }

    resolveCoinBottleImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}