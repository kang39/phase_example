var game = new Phaser.Game(500, 300, Phaser.AUTO, '', {preload: preload, create: create, update: update});


function preload(){
	game.load.image('ball', 'assets/ball.png')
	game.load.image('paddle', 'assets/paddle.png')
}

var paddle;
var ball;

var ballOnPaddle = true;

var introText;


function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.load.image('ball')
	paddle = game.add.sprite(game.world.centerX, 150, 'paddle');
    paddle.anchor.setTo(0.5, 0.5);

    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;

	ball = game.add.sprite(game.world.centerX, paddle.y - 16, 'ball');
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;

    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

    introText = game.add.text(game.world.centerX, 100, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);

    game.input.onDown.add(releaseBall, this);

}

function update(){
	game.physics.arcade.collide(ball, paddle, null, this);
}

function releaseBall () {

    if (ballOnPaddle)
    {
        ballOnPaddle = false;
        ball.body.velocity.y = -300;
        ball.body.velocity.x = -75;
        introText.visible = false;
        paddle.visible = false;
    }

}