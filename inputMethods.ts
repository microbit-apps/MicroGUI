
namespace microgui {
    import AppInterface = user_interface_base.AppInterface
    import Scene = user_interface_base.Scene
    import CursorScene = user_interface_base.CursorScene
    import GridNavigator = user_interface_base.GridNavigator
    import ButtonStyles = user_interface_base.ButtonStyles
    import Screen = user_interface_base.Screen
    import Button = user_interface_base.Button
    import font = user_interface_base.font


    abstract class AbstractInputMethod extends Scene {
        protected titleText: string;

        upBtnPressed() { }
        downBtnPressed() { }
        leftBtnPressed() { }
        rightBtnPressed() { }
        aBtnPressed() { }
        bBtnPressed() { }

        draw() {
            screen().fillRect(0, 0, screen().width, screen().height, this.backgroundColor)

            screen().printCenter(this.titleText, 4)
        }
    }


    export class TickerMenu extends AbstractInputMethod {
        private tickerValues: number[];
        private tickerIncrements: number[];
        private currentTickerIndex: number;

        private next: (arg0: number[]) => void;
        private back: () => void;

        constructor(
            app: AppInterface,
            titleText: string,
            defaultTickerValues: number[],
            backgroundColor?: number,
            next?: (arg0: number[]) => void,
            back?: () => void,
        ) {
            super(app, "TickerMenu")

            this.backgroundColor = (backgroundColor != null) ? backgroundColor : 3;

            this.titleText = titleText;

            this.tickerValues = defaultTickerValues;
            this.tickerIncrements = this.tickerValues.map(_ => 1)
            this.currentTickerIndex = 0;

            this.next = next;
            this.back = back;

            context.onEvent(
                ControllerButtonEvent.Pressed,
                controller.left.id,
                () => this.leftBtnPressed()
            )

            context.onEvent(
                ControllerButtonEvent.Pressed,
                controller.right.id,
                () => this.rightBtnPressed()
            )

            context.onEvent(
                ControllerButtonEvent.Pressed,
                controller.up.id,
                () => this.upBtnPressed()
            )

            context.onEvent(
                ControllerButtonEvent.Pressed,
                controller.down.id,
                () => this.downBtnPressed()
            )

            context.onEvent(
                ControllerButtonEvent.Pressed,
                controller.A.id,
                () => this.aBtnPressed()
            )

            context.onEvent(
                ControllerButtonEvent.Pressed,
                controller.B.id,
                () => this.bBtnPressed()
            )
        }

        upBtnPressed() {
            let tick = true;
            context.onEvent(
                ControllerButtonEvent.Released,
                controller.up.id,
                () => tick = false
            )
            while (tick) {
                this.tickerValues[this.currentTickerIndex] += 1
                basic.pause(100)
            }
            context.onEvent(ControllerButtonEvent.Released, controller.up.id, () => { })
        }

        downBtnPressed() {
            let tick = true;
            context.onEvent(
                ControllerButtonEvent.Released,
                controller.down.id,
                () => tick = false
            )
            while (tick) {
                this.tickerValues[this.currentTickerIndex] -= 1
                basic.pause(100)
            }
            context.onEvent(ControllerButtonEvent.Released, controller.down.id, () => { })
        }

        leftBtnPressed() {
            this.currentTickerIndex = (((this.currentTickerIndex - 1) % this.tickerIncrements.length) + this.tickerIncrements.length) % this.tickerIncrements.length
        }

        rightBtnPressed() {
            this.currentTickerIndex = (this.currentTickerIndex + 1) % this.tickerIncrements.length;
        }

        aBtnPressed() {
            if (this.next != null)
                this.next(this.tickerValues)
        }

        bBtnPressed() {
            if (this.back != null)
                this.back()
        }

        draw() {
            super.draw()

            const xDiff = screen().width / (this.tickerValues.length + 1)

            for (let i = 0; i < this.tickerValues.length; i++) {
                const value: string = "" + this.tickerValues[i];
                screen().print(
                    value,
                    ((i + 1) * xDiff) - 3,
                    screen().height / 2,
                    0
                )

                screen().fillTriangle(
                    ((i + 1) * xDiff) - 4,
                    (screen().height / 2) - 2,
                    ((i + 1) * xDiff) - 4 + (font.charWidth * value.length + 1) + 1,
                    (screen().height / 2) - 2,
                    ((i + 1) * xDiff) - 4 + ((font.charWidth * value.length + 1) / 2) + 1,
                    (screen().height / 2) - 7,
                    5
                )

                screen().fillTriangle(
                    ((i + 1) * xDiff) - 4,
                    (screen().height / 2) + 9,
                    ((i + 1) * xDiff) - 4 + (font.charWidth * value.length + 1) + 1,
                    (screen().height / 2) + 9,
                    ((i + 1) * xDiff) - 4 + ((font.charWidth * value.length + 1) / 2) + 1,
                    (screen().height / 2) + 14,
                    5
                )
            }
        }
    }

    /**
     * This is from microcode-v2/assets.ts
     * TODO: Move this asset into user-interface-base/coreAssets.ts 
     *      and make both microgui and microcode-v2 reference that instead.
     */
    const btn_delete: Bitmap = bmp`
        . . . . . . . . . . . . . . . .
        . . . . . . c f f . . . . . . .
        . . . . . c . . . f . . . . . .
        . . . . c c c f f f f . . . . .
        . . . c 1 1 d d d b b f . . . .
        . . c c c c c f f f f f f . . .
        . . . c b c b c b c c f . . . .
        . . . c 1 c d c d c b f d . . .
        . . . c 1 c d c d c b f d . . .
        . . . c 1 c d c d c b f d . . .
        . . . c 1 c d c d c b f d . . .
        . . . c 1 1 d d d b b f d . . .
        . . . c 1 1 d d d b b f d . . .
        . . . . c c c f f f f d . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `

    export enum KeyboardLayouts {
        QWERTY,
        NUMERIC
    }

    interface IKeyboard {
        appendText(txt: string): void;
        deletePriorCharacters(n: number): void;
        swapCase(): void;
        nextScene(): void;
        textLen(): number;
        getText(): string;
        shakeText(): void;
        deleteFn(): void;
    }

    type KeyboardBtnFn = (btn: Button, kb: IKeyboard) => void;
    type SpecialBtnData = { btnRow: number, btnCol: number, behaviour: (btn: Button, kb: IKeyboard) => void };
    type KeyboardLayoutData = { 
        [id: number]: { 
            btnTexts: (string | Bitmap)[][], 
            defaultBtnBehaviour: KeyboardBtnFn, 
            specialBtnBehaviours: SpecialBtnData[]
        }
    };

    const __keyboardLayout: KeyboardLayoutData = {
        [KeyboardLayouts.QWERTY]: {
            btnTexts: [
                ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
                ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
                ["<-", "^", " _______ ", "ENTER"]
            ],
            defaultBtnBehaviour: (btn: Button, kb: IKeyboard) => {
                kb.appendText(btn.state[0])
            },
            specialBtnBehaviours: [
                { btnRow: 4, btnCol: 0, behaviour: (btn: Button, kb: IKeyboard) => kb.deletePriorCharacters(1) }, // Backspace
                { btnRow: 4, btnCol: 1, behaviour: (btn: Button, kb: IKeyboard) => kb.swapCase() }, // Change case
                { btnRow: 4, btnCol: 2, behaviour: (btn: Button, kb: IKeyboard) => kb.appendText(" ") }, // Spacebar
                { btnRow: 4, btnCol: 3, behaviour: (btn: Button, kb: IKeyboard) => kb.nextScene() } // ENTER
            ]
        },

        /**
         * Ensures that the user inputs result in a valid number.
         * E.g: prevents two decimal places, - only at start, etc
         */
        [KeyboardLayouts.NUMERIC]: {
            btnTexts: [
                ["0", "1", "2", "3", "4"],
                ["5", "6", "7", "8", "9"],
                [btn_delete, "<-", "-", ".", "ENTER"]
            ],
            defaultBtnBehaviour: (btn: Button, kb: IKeyboard) => { // Default Behaviour: Prevent leading zeroes
                const btnChar = btn.state[0];
                const txt = kb.getText();
                const txtLen = txt.length;

                if (txtLen == 0) {
                    kb.appendText(btnChar)
                    return;
                }

                // Illegal cases: where there's a "0" or a "-0" and you want to add anything except a '.'
                // The decimal point '.' is allowed via the specialBtnBehaviour.
                const leadingZeroCase1 = txtLen == 1 && txt[0] == "0";
                const leadingZeroCase2 = txtLen == 2 && txt[0] == "-" && txt[1] == "0";
                if (leadingZeroCase1 || leadingZeroCase2)
                    kb.shakeText()
                else
                    kb.appendText(btnChar)

            }, // End of: default behaviour: Prevent leading zeroes
            specialBtnBehaviours: [
                { btnRow: 2, btnCol: 0, behaviour: (btn: Button, kb: IKeyboard) => { // btn_delete
                        kb.deleteFn();
                    }
                }, // END OF: btn_delete
                { btnRow: 2, btnCol: 1, behaviour: (btn: Button, kb: IKeyboard) => kb.deletePriorCharacters(1) }, // Backspace
                { btnRow: 2, btnCol: 2, behaviour: (btn: Button, kb: IKeyboard) => { // Minus symbol: Add a "-", but only if first symbol,
                        if (kb.textLen() == 0)
                            kb.appendText(btn.state[0])
                        else
                            kb.shakeText()
                    }
                }, // END OF: Minus symbol: Add a "-", but only if first symbol,
                { btnRow: 2, btnCol: 3, behaviour: (btn: Button, kb: IKeyboard) => { // Decimal point
                        const txt = kb.getText();
                        const len = txt.length;
                        const decimalAlreadyPresent = txt.includes(".")
                        if (len == 0 || txt[len - 1] == "-" || decimalAlreadyPresent)
                            kb.shakeText()
                        else
                            kb.appendText(".") 
                    }
                }, // END OF: Decimal point
                { btnRow: 2, btnCol: 4, behaviour: (btn: Button, kb: IKeyboard) => { // Enter
                        const txt = kb.getText();
                        const len = txt.length;
                        if (len > 0 && txt[len - 1] != "-" && txt[len - 1] != ".") // Last rule could be removed, casting "1." to number is valid.
                            kb.nextScene()
                        else
                            kb.shakeText()
                    }
                } // END OF: ENTER
            ]
        }
    };

    const KEYBOARD_FRAME_COUNTER_CURSOR_ON = 20;

    export class Keyboard extends CursorScene implements IKeyboard {
        private btns: Button[][]
        private text: string;
        private isUpperCase: boolean;
        private nextBtnFn: (keyboardText: string) => void
        private keyboardLayout: KeyboardLayouts;
        private maxTxtLength: number;

        /** This is just the region with buttons; this Keyboard Scene takes up the entire screen. This keyboardBounds doesn't include the text display. */
        private keyboardBounds: user_interface_base.Bounds;

        // Special effects:
        private frameCounter: number;
        private shakingText: boolean;
        private shakeTextCounter: number;
        private shakeStrength: number = 5
        private txtColor: number;
    
        private readonly FRAME_COUNTER_CURSOR_ON = 20;
        private readonly FRAME_COUNTER_CURSOR_OFF = 60;
        private readonly MAX_TEXT_LENGTH = 22;

        private foregroundColor: number;
        private passedDeleteFn: (str?: string) => void;
        /** The passed Back Btn function is needed since its given to the constructor, but used by startup()  */
        private passedBackBtn: (str?: string) => void;

        constructor(opts: {
            app: AppInterface, 
            layout: KeyboardLayouts,
            cb: (keyboardText: string) => void,
            foregroundColor?: number,
            backgroundColor?: number,
            defaultTxt?: string,
            maxTxtLength?: number,
            txtColor?: number,
            deleteFn?: (str?: string) => void,
            backBtn?: (str?: string) => void
        }) {
            super(opts.app, new GridNavigator([[]])) // GridNavigator setup in startup()
            this.text = (opts.defaultTxt) ? opts.defaultTxt : ""
            this.isUpperCase = true
            this.maxTxtLength = (opts.maxTxtLength) ? Math.min(opts.maxTxtLength, this.MAX_TEXT_LENGTH) : this.MAX_TEXT_LENGTH

            this.nextBtnFn = opts.cb;
            this.frameCounter = 0;
            this.shakingText = false;
            this.shakeTextCounter = 0;

            this.keyboardLayout = opts.layout;

            this.keyboardBounds = new user_interface_base.Bounds({
                width: Screen.WIDTH - 8,
                height: 72,
                top: Screen.TOP_EDGE + 44,
                left: Screen.LEFT_EDGE + 4,
            })

            this.foregroundColor = (opts.foregroundColor) ? opts.foregroundColor : 4; // Default to orange
            this.backgroundColor = (opts.backgroundColor) ? opts.backgroundColor : 6; // Default to blue

            this.txtColor = (opts.txtColor) ? opts.txtColor : 1;
            this.passedDeleteFn = (opts.deleteFn) ? opts.deleteFn : () => { };
            this.passedBackBtn = (opts.backBtn) ? opts.backBtn : () => { };
        }


        startup() {
            super.startup()

            const data = __keyboardLayout[this.keyboardLayout];
            this.btns = data.btnTexts.map(_ => []);

            const charWidth = bitmaps.font8.charWidth
            const charHeight = bitmaps.font8.charHeight

            const ySpacing = (this.keyboardBounds.height - charHeight) / (data.btnTexts.length);

            for (let row = 0; row < data.btnTexts.length; row++) {
                const bitmapWidths = data.btnTexts[row].map((txtOrBitmap: string | Bitmap) => {
                    if (typeof (txtOrBitmap) == "string")
                        return charWidth * (txtOrBitmap.length + 1) - 4;
                    else
                        return txtOrBitmap.width + 3;
                });

                const totalWidth: number = bitmapWidths.reduce((total: number, w: number) => total + w, 0);
                const xSpacing = (this.keyboardBounds.width - totalWidth) / (bitmapWidths.length + 2);

                let x = -Screen.HALF_WIDTH + xSpacing;
                for (let col = 0; col < data.btnTexts[row].length; col++) {
                    const btnState: (string | Bitmap) = data.btnTexts[row][col];
                    const bitmapWidth = bitmapWidths[col]
                    
                    x += (bitmapWidths[col] + xSpacing) >> 1
                    this.btns[row][col] =
                        new Button({
                            parent: null,
                            style: ButtonStyles.Transparent,
                            icon: (typeof (btnState) == "string") ? bitmaps.create(bitmapWidth, charHeight) : btnState,
                            ariaId: "",
                            x,
                            y: -(charHeight >> 1) + (ySpacing * row),
                            onClick: (btn: Button) => data.defaultBtnBehaviour(btn, this),
                            state: (typeof (btnState) == "string") ? [btnState] : []
                        })
                    x += (bitmapWidths[col] + xSpacing) >> 1
                }
            }

            // Setup special btn behaviours:
            data.specialBtnBehaviours.forEach(
                (data: SpecialBtnData, i) => {
                    this.btns[data.btnRow][data.btnCol].onClick =
                        (btn: Button) => data.behaviour(btn, this);
                }
            )

            context.onEvent(ControllerButtonEvent.Pressed, controller.B.id, () => this.passedBackBtn())
            this.navigator.setBtns(this.btns);
        }

        //-------------------
        // Interface Methods:
        //-------------------

        public appendText(str: string) {
            if (this.textLen() < this.maxTxtLength) {
                this.frameCounter = KEYBOARD_FRAME_COUNTER_CURSOR_ON
                this.text += str;
            } else {
                this.shakingText = true
            }
        }

        public deletePriorCharacters(n: number) {
            this.text =
                (this.text.length > 0)
                    ? this.text.substr(0, this.text.length - n)
                    : this.text
            this.frameCounter = KEYBOARD_FRAME_COUNTER_CURSOR_ON
        }

        public swapCase(): void {
            this.isUpperCase = !this.isUpperCase;

            const swapCaseFn = (this.isUpperCase)
                ? (t: string) => {return t.toUpperCase()}
                : (t: string) => {return t.toLowerCase()}


            const specialBtnData: SpecialBtnData[] = __keyboardLayout[this.keyboardLayout].specialBtnBehaviours;
            const specialBtnRows: number[] = specialBtnData.map((sbd: SpecialBtnData) => sbd.btnRow);
            const specialBtnCols: number[] = specialBtnData.map((sbd: SpecialBtnData) => sbd.btnCol);

            const isSpecialBtn = (row: number, col: number): boolean => {
                return (specialBtnRows.indexOf(row) != -1) && (specialBtnRows.indexOf(col) != -1);
            }

            // Skip special char row:
            for (let i = 0; i < this.btns.length - 1; i++) {
                for (let j = 0; j < this.btns[i].length; j++) {
                    if (!isSpecialBtn)
                        continue

                    const btnText: string = (this.btns[i][j].state[0] as string)
                    this.btns[i][j].state[0] = swapCaseFn(btnText);
                }
            }
        }

        public deleteFn(): void {
            this.passedDeleteFn();
        }

        public getText() {
            return this.text
        }

        public textLen() {
            return this.text.length;
        }

        public nextScene(): void {
            this.nextBtnFn(this.text)
        }

        public shakeText(): void {
            this.shakingText = true
        }


        draw() {
            this.frameCounter += 1;

            const charWidth = bitmaps.font8.charWidth
            const charHeight = bitmaps.font8.charHeight

            const white = 1;
            const black = 15;

            // Blue base colour:
            Screen.fillRect(
                Screen.LEFT_EDGE,
                Screen.TOP_EDGE,
                Screen.WIDTH,
                Screen.HEIGHT,
                this.backgroundColor
            )

            // Black border around the text window for depth
            Screen.fillRect(
                Screen.LEFT_EDGE + 3,
                Screen.TOP_EDGE + 4,
                Screen.WIDTH - 7,
                34,
                black
            )

            // White text window, slightly smaller than the black
            Screen.fillRect(
                Screen.LEFT_EDGE + 6,
                Screen.TOP_EDGE + 6,
                Screen.WIDTH - 12,
                32,
                white
            )

            const txtXpos = (this.text.length * charWidth) >> 1;
            const txtYPos = 17;

            // Don't draw the cursor if beyond the max length, shake the text a bit:
            if (this.shakingText) {
                if (this.shakeTextCounter % 5 == 0) {
                    screen().print(
                        this.text,
                        Screen.HALF_WIDTH - txtXpos - this.shakeStrength,
                        txtYPos,
                        black
                    )
                } else {
                    screen().print(
                        this.text,
                        Screen.HALF_WIDTH - txtXpos,
                        txtYPos,
                        black
                    )
                }

                if (this.shakeTextCounter >= 5) {
                    this.shakingText = false;
                    this.shakeTextCounter = 0;
                } else {
                    this.shakeTextCounter += 1
                }
            } else { // At max-length, done shaking the text
                screen().printCenter(
                    this.text, 
                    txtYPos, 
                    black
                )

                if (this.frameCounter >= this.FRAME_COUNTER_CURSOR_ON) {
                    screen().print(
                        "_",
                        Screen.HALF_WIDTH + txtXpos,
                        txtYPos,
                        black
                    )

                    if (this.frameCounter >= this.FRAME_COUNTER_CURSOR_OFF)
                        this.frameCounter = 0
                }
            }

            // Orange Keyboard with a black shadow on the bot & right edge (depth effect):

            // Black border around right & bot edge:
            Screen.fillRect(
                this.keyboardBounds.left,
                this.keyboardBounds.top,
                this.keyboardBounds.width + 2,
                this.keyboardBounds.height + 2,
                black
            )

            // Orange keyboard that the white text will be ontop of:
            Screen.fillRect(
                this.keyboardBounds.left,
                this.keyboardBounds.top,
                this.keyboardBounds.width,
                this.keyboardBounds.height,
                this.foregroundColor
            )

            for (let i = 0; i < this.btns.length; i++) {
                for (let j = 0; j < this.btns[i].length; j++) {
                    const btn = this.btns[i][j];
                    const btnText = (btn.state.length > 0) ? btn.state[0] : null;

                    const x = (screen().width / 2) + btn.xfrm.localPos.x - (btn.icon.width / 2) + 1
                    const y = (screen().height / 2) + btn.xfrm.localPos.y + charHeight - 12

                    btn.draw()

                    if (btnText)
                        screen().print(
                            btnText, 
                            x, 
                            y, 
                            this.txtColor
                        )
                }
            }

            super.draw()
        }
    }
}
