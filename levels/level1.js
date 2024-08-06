/**
 * level 1 with enemies objects, cloud objects and background objects
 */


let background = [];
let cloud = [];
let enemies = [];
let coins = [];
let bottles = [];

class LevelInitializer {
    constructor() {
        this.initializeLevel();
    };


    generateBottleArray() {
        bottles = [
            new Bottle(300, 'graphics/6_salsa_bottle/1_salsa_bottle_on_ground.png', 30),
            new Bottle(350, 'graphics/6_salsa_bottle/1_salsa_bottle_on_ground.png', 30),
            new Bottle(250, 'graphics/6_salsa_bottle/1_salsa_bottle_on_ground.png', 30),
            new Bottle(550, 'graphics/6_salsa_bottle/2_salsa_bottle_on_ground.png', 20),
            new Bottle(400, 'graphics/6_salsa_bottle/2_salsa_bottle_on_ground.png', 20),
            new Bottle(600, 'graphics/6_salsa_bottle/1_salsa_bottle_on_ground.png', 30),
            new Bottle(700, 'graphics/6_salsa_bottle/2_salsa_bottle_on_ground.png', 20),
            new Bottle(1100, 'graphics/6_salsa_bottle/2_salsa_bottle_on_ground.png', 20),
            new Bottle(1150, 'graphics/6_salsa_bottle/1_salsa_bottle_on_ground.png', 30),
            new Bottle(1600, 'graphics/6_salsa_bottle/2_salsa_bottle_on_ground.png', 30),
        ];
    };

    generateCoinArray() {
        coins = [
            new Coin(200, 100),
            new Coin(300, 100),
            new Coin(250, 50),
            new Coin(350, 50),
            new Coin(400, 100),
            new Coin(1100, 100),
            new Coin(1100, 50),
            new Coin(1050, 100),
            new Coin(1050, 50),
            new Coin(1500, 200),
            new Coin(1550, 200),
            new Coin(1600, 200),
        ];
    };

    generateBackgroundArray() {
        background = [
            new BackgroundObject('graphics/5_background/layers/air.png', -719),
            new BackgroundObject('graphics/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('graphics/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('graphics/5_background/layers/1_first_layer/2.png', -719),
    
            new BackgroundObject('graphics/5_background/layers/air.png', 0),
            new BackgroundObject('graphics/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('graphics/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('graphics/5_background/layers/1_first_layer/1.png', 0),
    
            new BackgroundObject('graphics/5_background/layers/air.png', 719),
            new BackgroundObject('graphics/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('graphics/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('graphics/5_background/layers/1_first_layer/2.png', 719),
    
            new BackgroundObject('graphics/5_background/layers/air.png', 1438),
            new BackgroundObject('graphics/5_background/layers/3_third_layer/1.png', 1438),
            new BackgroundObject('graphics/5_background/layers/2_second_layer/1.png', 1438),
            new BackgroundObject('graphics/5_background/layers/1_first_layer/1.png', 1438),
    
            new BackgroundObject('graphics/5_background/layers/air.png', 2157),
            new BackgroundObject('graphics/5_background/layers/3_third_layer/2.png', 2157),
            new BackgroundObject('graphics/5_background/layers/2_second_layer/2.png', 2157),
            new BackgroundObject('graphics/5_background/layers/1_first_layer/2.png', 2157),
        ]
    };

    generateCloudArray() {
        for (let i = 0; i < 6; i++) {
            cloud.push(new Clouds(Math.random() * (700) + (i * 720), Math.random() * 100, 0.3, 'graphics/5_background/layers/4_clouds/1.png'));
            cloud.push(new Clouds(Math.random() * (700) + (i * 720), Math.random() * 100, 0.3, 'graphics/5_background/layers/4_clouds/1.png'));
            cloud.push(new Clouds(Math.random() * (700) + (i * 720), Math.random() * 100, 0.2, 'graphics/5_background/layers/4_clouds/2.png'));
            cloud.push(new Clouds(Math.random() * (700) + (i * 720), Math.random() * 100, 0.2, 'graphics/5_background/layers/4_clouds/2.png'));
        }
        return cloud;
    };

    generateEnemyArray() {
        new Chicken();
        new Chicken();
        new Chicken();
        new Chicken();
        new Chicken();
    };

    initializeLevel() {
        this.generateCoinArray();
        this.generateBackgroundArray();
        this.generateCloudArray();
        this.generateEnemyArray();
        this.generateBottleArray();
    };

};

const levelInitializer = new LevelInitializer();

function resetLevel(enemies, background, cloud, coins, bottles) {
    level1 = new Level(
       
        background,
        enemies,
        cloud,
        coins,
        bottles
    );
};




let level1 = new Level(
   
    background,
    enemies,
    cloud,
    coins,
    bottles
);