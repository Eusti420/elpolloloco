/**
 * level class, which can be used inside world class
 */
class Level {
    enemies;
    cloud;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, cloud, backgroundObjects) {
        this.enemies = enemies;
        this.cloud = cloud;
        this.backgroundObjects = backgroundObjects;
    }
}