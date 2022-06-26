# Functional Requirements

## Gameplay

1) 6 tries to guess a 5-letter word

### Making a guess

Detect any key presses
    - if keypress is a letter:
        - update "letters" attribute 
            - update tile markup based on letters value
    - if keypress is backspace:
        - delete last letter in "letters"
            - update tile markup based on "letters"

2) Typing in the letter will display the letter in the tile
3) Backspace will delete letters
4) Enter will submit guess

**Guesses must be a real word, "in word list"

Guess colors (data-state):
- gray: "absent", letter not in word
- yellow: "present", letter in word but in wrong position
- green: "correct", letter in word and in right position

Hard Mode: present or correct letters must be used in subsequent guesses

## Design

1) Tiles 5x6
2) Virtual Keyboard

## Interactions

1) When typing a letter:
    - the border of the tile changes to light gray
    - blinking in animation with letter
    - backspace will delete letters

2) When submitting a guess:
    - tiles will flip up
    - background color will change based on guess