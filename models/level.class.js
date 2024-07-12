/**
 * level class, which can be used inside world class
 */
class Level {
    enemies;
    cloud;
    backgroundObjects;
    coin;
    level_end_x = 2200;

    constructor(enemies, cloud, backgroundObjects, coin) {
        this.enemies = enemies;
        this.coin = coin;
        this.cloud = cloud;
        this.backgroundObjects = backgroundObjects;

    }
}