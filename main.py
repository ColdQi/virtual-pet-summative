def birth():
    global life, health
    life = True
    health = 10
    basic.show_leds("""
        . . . . .
                . . . . .
                . . # . .
                . . . . .
                . . . . .
    """)
    basic.pause(100)
    basic.show_leds("""
        . . . . .
                . . # . .
                . # # # .
                . . # . .
                . . . . .
    """)
    basic.pause(100)
    basic.show_leds("""
        . . . . .
                . # # # .
                . # # # .
                . # # # .
                . . . . .
    """)
    basic.pause(100)
    basic.show_leds("""
        . . . . .
                # # # # #
                # # # # #
                # # # # #
                . . . . .
    """)
    basic.pause(500)
    basic.show_leds("""
        . . . . .
                # # # # #
                # . # . #
                # # # # #
                . . . . .
    """)
    music.play_sound_effect(music.builtin_sound_effect(soundExpression.hello),
        SoundExpressionPlayMode.UNTIL_DONE)
def death():
    global life
    life = False
    led.set_display_mode(DisplayMode.BLACK_AND_WHITE)
    basic.show_leds("""
        . . . . .
                # # # # #
                # # # # #
                # # # # #
                . . . . .
    """)
    basic.pause(500)
    basic.show_leds("""
        # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
    """)

def on_button_pressed_b():
    global health
    health += -1
input.on_button_pressed(Button.B, on_button_pressed_b)

health = 0
life = False
life = True
birth()

def on_forever():
    while life == True:
        if health > 7:
            pins.digital_write_pin(DigitalPin.P1, 0)
            pins.digital_write_pin(DigitalPin.P2, 0)
            pins.digital_write_pin(DigitalPin.P0, 1)
        elif health > 4:
            pins.digital_write_pin(DigitalPin.P0, 0)
            pins.digital_write_pin(DigitalPin.P2, 0)
            pins.digital_write_pin(DigitalPin.P1, 1)
        elif health > 0:
            pins.digital_write_pin(DigitalPin.P0, 0)
            pins.digital_write_pin(DigitalPin.P1, 0)
            pins.digital_write_pin(DigitalPin.P2, 1)
        else:
            death()
basic.forever(on_forever)
