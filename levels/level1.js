/**
 * level 1 with enemies objects, cloud objects and background objects
 */
let level1;

function initLevel() {

level1 = new Level(
    [   
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
    ],

    [
        new Coin(),
        new Coin(),
        new Coin(),
    ],
    
    [
        new Clouds(),
    ],

    [
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
    ],

   
    

)};