function birth () {
    condition = 0
    health = 10
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(100)
    basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        . . # . .
        . . . . .
        `)
    basic.pause(100)
    basic.showLeds(`
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        . . . . .
        `)
    basic.pause(100)
    basic.showLeds(`
        . . . . .
        # # # # #
        # # # # #
        # # # # #
        . . . . .
        `)
    basic.pause(500)
    basic.showLeds(`
        . . . . .
        # # # # #
        # . # . #
        # # # # #
        . . . . .
        `)
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.hello), SoundExpressionPlayMode.UntilDone)
}
function exercise (speed: number) {
    basic.clearScreen()
    condition = 2
    exercise_creature = game.createSprite(0, 4)
    for (let index = 0; index < 4; index++) {
        enemy = game.createSprite(4, randint(0, 4))
        while (enemy.get(LedSpriteProperty.X) != 0 && !(enemy.isTouching(exercise_creature))) {
            basic.pause(1000)
            enemy.change(LedSpriteProperty.X, -1)
        }
        if (enemy.isTouching(exercise_creature)) {
        	
        } else {
            joy += 1
            basic.pause(1000)
            enemy.change(LedSpriteProperty.X, -1)
        }
        enemy.delete()
    }
}
function death () {
    condition = 1
    basic.showLeds(`
        . . . . .
        # # # # #
        # # # # #
        # # # # #
        . . . . .
        `)
    basic.pause(500)
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.sad), SoundExpressionPlayMode.UntilDone)
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
}
input.onButtonPressed(Button.A, function () {
    if (condition == 0) {
        exercise(1)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (condition == 1) {
        birth()
    }
})
input.onButtonPressed(Button.B, function () {
    health += -1
})
let joy = 0
let enemy: game.LedSprite = null
let exercise_creature: game.LedSprite = null
let health = 0
let condition = 0
birth()
basic.forever(function () {
    if (condition == 0) {
        if (health > 7) {
            pins.digitalWritePin(DigitalPin.P1, 0)
            pins.digitalWritePin(DigitalPin.P2, 0)
            pins.digitalWritePin(DigitalPin.P0, 1)
        } else if (health > 4) {
            pins.digitalWritePin(DigitalPin.P0, 0)
            pins.digitalWritePin(DigitalPin.P2, 0)
            pins.digitalWritePin(DigitalPin.P1, 1)
        } else if (health > 0) {
            pins.digitalWritePin(DigitalPin.P0, 0)
            pins.digitalWritePin(DigitalPin.P1, 0)
            pins.digitalWritePin(DigitalPin.P2, 1)
        } else {
            death()
        }
    }
})
basic.forever(function () {
    if (condition == 2) {
        if (pins.digitalReadPin(DigitalPin.P9) == 1 && exercise_creature.get(LedSpriteProperty.Y) <= 4) {
            exercise_creature.change(LedSpriteProperty.Y, 1)
            basic.pause(100)
        }
        if (pins.digitalReadPin(DigitalPin.P9) == 0 && exercise_creature.get(LedSpriteProperty.Y) >= 0) {
            exercise_creature.change(LedSpriteProperty.Y, -1)
            basic.pause(100)
        }
    }
})
