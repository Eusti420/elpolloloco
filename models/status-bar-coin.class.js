class StatusBarCoin extends Statusbar {
    percentage = 100;

    IMAGES = [
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'graphics/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES[0])
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 84;
        this.setPercentage(100);
    }

}