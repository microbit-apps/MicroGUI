namespace microcode {
    /**
     * Passed to the constructor of a GUIComponent to quickly align it.
     * Alignment may be further adjusted by an xOffset & yOffset.
     * These alignments are used to calculate left & top values for a Bounds object.
     * This Bounds object is the extent of the component.
     * See getLeftAndTop in GUIComponentAbstract for how this is calculated.
     */
    export const enum GUIComponentAlignment {
        TOP,
        LEFT,
        RIGHT,
        BOT,
        CENTRE,
        TOP_RIGHT,
        TOP_LEFT,
        BOT_RIGHT,
        BOT_LEFT
    }

    /**
     * Greatly simplifies the creation & alignment of GUI components.
     * A GUI Component has a .context for storage of hidden component state.
     */
    abstract class GUIComponentAbstract extends Scene {
        public static DEFAULT_WIDTH: number = screen().width / 2;
        public static DEFAULT_HEIGHT: number = screen().height / 2;

        private hidden: boolean;
        protected context: any[];
        private alignment: GUIComponentAlignment

        protected bounds: Bounds;
        protected backgroundColour: number = 3;

        private xScaling: number = 1.0;
        private yScaling: number = 1.0;

        private xOffset: number;
        private yOffset: number;
        private unscaledComponentWidth: number;
        private unscaledComponentHeight: number;
        private hasBorder: boolean

        public nav: INavigator;

        constructor(opts: {
            alignment: GUIComponentAlignment,
            width: number,
            height: number,
            xOffset?: number,
            yOffset?: number,
            xScaling?: number,
            yScaling?: number,
            colour?: number,
            border?: boolean
        }) {
            super()

            this.alignment = opts.alignment

            this.xScaling = (opts.xScaling) ? opts.xScaling : this.xScaling
            this.yScaling = (opts.yScaling) ? opts.yScaling : this.yScaling

            this.backgroundColour = (opts.colour) ? opts.colour : this.backgroundColour

            this.xOffset = (opts.xOffset != null) ? opts.xOffset : 0
            this.yOffset = (opts.yOffset != null) ? opts.yOffset : 0
            this.unscaledComponentWidth = opts.width
            this.unscaledComponentHeight = opts.height
            this.hasBorder = (opts.border != null) ? opts.border : false

            const pos = this.getLeftAndTop()
            const left = pos[0];
            const top = pos[1];

            this.bounds = new microcode.Bounds({
                width: this.unscaledComponentWidth * this.xScaling,
                height: this.unscaledComponentHeight * this.yScaling,
                left,
                top
            })
        }

        hide(): void { this.hidden = true }
        unHide(): void { this.hidden = false }

        getAlignment(): number { return this.alignment }
        isHidden(): boolean { return this.hidden }


        printCenter(text: string) {
            const textOffset = (font.charWidth * text.length) / 2
            screen().print(
                text,
                (screen().width / 2) + this.bounds.left + ((this.unscaledComponentWidth * this.xScaling) / 2) - textOffset,
                (screen().height / 2) + this.bounds.top + 1
            )
        }

        /**
         * This should be overriden.
         * Other components should use this to get this components state.
         * @returns pertinent component state information, in appropriate format; at child components discretion.
         */
        getContext(): any[] {return this.context}

        clearContext(): void { this.context = [] }
        setBounds(bounds: Bounds): void { this.bounds = bounds }

        getLeftAndTop(): number[] {
            let left = 0
            let top = 0

            switch (this.alignment) {
                case (GUIComponentAlignment.TOP): {
                    left = -((this.unscaledComponentWidth * this.xScaling) / 2) + this.xOffset;
                    top = -(screen().height / 2) + this.yOffset;
                    break;
                }
                case (GUIComponentAlignment.LEFT): {
                    left = -(screen().width / 2) + this.xOffset;
                    top = -((this.unscaledComponentHeight * this.yScaling) / 2) + this.yOffset
                    break;
                }
                case (GUIComponentAlignment.RIGHT): {
                    left = (screen().width / 2) - (this.unscaledComponentWidth * this.xScaling) + this.xOffset;
                    top = -((this.unscaledComponentHeight * this.yScaling) / 2) + this.yOffset
                    break;
                }
                case (GUIComponentAlignment.BOT): {
                    left = -((this.unscaledComponentWidth * this.xScaling) / 2) + this.xOffset;
                    top = (screen().height / 2) - (this.unscaledComponentHeight * this.yScaling) - this.yOffset;
                    break;
                }
                case (GUIComponentAlignment.CENTRE): {
                    left = -((this.unscaledComponentWidth * this.xScaling) / 2) + this.xOffset
                    top = -((this.unscaledComponentHeight * this.yScaling) / 2) + this.yOffset
                    break;
                }
                case (GUIComponentAlignment.TOP_RIGHT): {
                    left = ((screen().width / 2) - (this.unscaledComponentWidth * this.xScaling)) + this.xOffset;
                    top = -(screen().height / 2) + this.yOffset;
                    break;
                }
                case (GUIComponentAlignment.TOP_LEFT): {
                    left = (-(screen().width / 2)) + this.xOffset;
                    top = -(screen().height / 2) + this.yOffset;
                    break;
                }
                case (GUIComponentAlignment.BOT_RIGHT): {
                    left = ((screen().width / 2) - (this.unscaledComponentWidth * this.xScaling)) + this.xOffset;
                    top = (screen().height / 2) - (this.unscaledComponentHeight * this.yScaling) - this.yOffset;
                    break;
                }
                case (GUIComponentAlignment.BOT_LEFT): {
                    left = (-(screen().width / 2)) + this.xOffset;
                    top = (screen().height / 2) - (this.unscaledComponentHeight * this.yScaling) - this.yOffset;
                    break;
                }
            }

            return [left, top]
        }

        rescale(xScaling: number, yScaling: number): void {
            if (this.bounds != null) {
                this.xScaling = xScaling
                this.yScaling = yScaling
                this.bounds = new microcode.Bounds({
                    width: this.unscaledComponentWidth * this.xScaling,
                    height: this.unscaledComponentHeight * this.yScaling,
                    left: this.bounds.left,
                    top: this.bounds.top
                })
            }
        }

        draw(): void {
            screen().fillRect(
                this.bounds.left + (screen().width / 2),
                this.bounds.top + (screen().height / 2) + 2,
                this.bounds.width + 2,
                this.bounds.height,
                15
            )

            this.bounds.fillRect(this.backgroundColour)
        }
    }


    export class B extends GUIComponentAbstract {
        public cursor: Cursor
        public picker: Picker
        public navigator: INavigator
        private btns: Button[];
        private title: string;

        constructor(opts: {
            alignment: GUIComponentAlignment,
            width: number,
            height: number,
            xOffset?: number,
            yOffset?: number,
            scaling?: number,
            colour?: number,
            title?: string,
        }) {
            super(opts)

            this.btns = [];
            this.title = (opts.title != null) ? opts.title : ""
            this.navigator = new microcode.GridNavigator(3, 4)

            this.startup()
        }

        /* override */ startup() {
            super.startup()

            let x = (screen().width / 5) - (screen().width / 2);
            let y = -30;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 4; j++) {
                    this.btns.push(new Button({
                        parent: null,
                        style: ButtonStyles.Transparent,
                        icon: "" + ((i * 4) + j + 1),
                        x,
                        y,
                        onClick: (button: Button) => { }
                    }))
                    x += screen().width / 5
                }
                y += screen().height / 4
                x = (screen().width / 5) - (screen().width / 2);
            }

            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.right.id,
                () => this.moveCursor(CursorDir.Right)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.up.id,
                () => this.moveCursor(CursorDir.Up)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.down.id,
                () => this.moveCursor(CursorDir.Down)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.left.id,
                () => this.moveCursor(CursorDir.Left)
            )

            // click
            const click = () => this.cursor.click()
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.A.id,
                click
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.A.id + keymap.PLAYER_OFFSET,
                click
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.B.id,
                () => this.back()
            )

            this.cursor.navigator = this.navigator
            this.navigator.addButtons(this.btns)

            this.cursor = new Cursor()
            this.picker = new Picker(this.cursor)

            if (this.navigator == null)
                this.navigator = new RowNavigator()
            this.cursor.navigator = this.navigator
        }

        draw() {
            Screen.fillRect(
                Screen.LEFT_EDGE,
                Screen.TOP_EDGE,
                Screen.WIDTH,
                Screen.HEIGHT,
                0xc
            )

            this.printCenter(this.title)

            // if (this.picker == null || this.cursor == null) {
            //     basic.showString("Y")
            // }

            // this.picker.draw()
            // this.cursor.draw()

            // for (let i = 0; i < this.btns.length; i++)
            //     this.btns[i].draw()

            super.draw()
        }

        protected moveCursor(dir: CursorDir) {
            try {
                this.moveTo(this.cursor.move(dir))
            } catch (e) {
                if (dir === CursorDir.Up && e.kind === BACK_BUTTON_ERROR_KIND)
                    this.back()
                else if (
                    dir === CursorDir.Down &&
                    e.kind === FORWARD_BUTTON_ERROR_KIND
                )
                    return
                else throw e
            }
        }

        protected moveTo(target: Button) {
            if (!target) return
            this.cursor.moveTo(
                target.xfrm.worldPos,
                target.ariaId,
                target.bounds
            )
        }

        back() {
            if (!this.cursor.cancel()) this.moveCursor(CursorDir.Back)
        }

        protected handleClick(x: number, y: number) {
            const target = this.cursor.navigator.screenToButton(
                x - Screen.HALF_WIDTH,
                y - Screen.HALF_HEIGHT
            )
            if (target) {
                this.moveTo(target)
                target.click()
            } else if (this.picker.visible) {
                this.picker.hide()
            }
        }

        protected handleMove(x: number, y: number) {
            const btn = this.cursor.navigator.screenToButton(
                x - Screen.HALF_WIDTH,
                y - Screen.HALF_HEIGHT
            )
            if (btn) {
                const w = btn.xfrm.worldPos
                this.cursor.snapTo(w.x, w.y, btn.ariaId, btn.bounds)
                btn.reportAria(true)
            }
        }

        /* override */ shutdown() {
            this.navigator.clear()
        }

        /* override */ activate() {
            super.activate()
            const btn = this.navigator.initialCursor(0, 0)
            if (btn) {
                const w = btn.xfrm.worldPos
                this.cursor.snapTo(w.x, w.y, btn.ariaId, btn.bounds)
                btn.reportAria(true)
            }
        }

        /* override */ update() {
            this.cursor.update()
        }
    }

    export class GUIBox extends GUIComponentAbstract {
        // private btns: Button[]
        private title: string

        constructor(opts: {
            alignment: GUIComponentAlignment,
            xOffset?: number,
            yOffset?: number,
            xScaling?: number,
            yScaling?: number,
            colour?: number,
            border?: boolean,
            title?: string
        }) {
            super({
                alignment: opts.alignment,
                xOffset: (opts.xOffset != null) ? opts.xOffset : 0,
                yOffset: (opts.yOffset != null) ? opts.yOffset : 0,
                width: GUIBox.DEFAULT_WIDTH,
                height: GUIBox.DEFAULT_HEIGHT,
                xScaling: opts.xScaling,
                yScaling: opts.yScaling,
                colour: opts.colour,
                border: opts.border
            })

            // this.btns = [
            //     new microcode.Button({
            //         icon: "",
            //         x: -(10 * ((opts.xOffset != null) ? opts.xOffset : 1)),
            //         y: -30
            //     })
            // ]

            this.title = (opts.title != null) ? opts.title : ""

            // this.nav = new microcode.GridNavigator(3, 4)
            // this.nav.addButtons(this.btns)
        }

        draw() {
            super.draw()
            this.printCenter(this.title)


        }
    }

    export class GUISlider extends GUIBox {
        private maximum: number;
        private minimum: number;

        constructor(opts: {
            alignment: GUIComponentAlignment,
            xOffset?: number,
            yOffset?: number,
            xScaling?: number,
            yScaling?: number,
            colour?: number,
            border?: boolean,
            title?: string,
            sliderMax?: number,
            sliderMin?: number
        }) {
            super({
                alignment: opts.alignment,
                xOffset: (opts.xOffset != null) ? opts.xOffset : 0,
                yOffset: (opts.yOffset != null) ? opts.yOffset : 0,
                xScaling: opts.xScaling,
                yScaling: opts.yScaling,
                colour: opts.colour,
                border: opts.border
            })

            this.maximum = (opts.sliderMax != null) ? opts.sliderMax : 100
            this.minimum = (opts.sliderMin != null) ? opts.sliderMin : 0

            this.context = [this.maximum - this.minimum]

            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.up.id,
                () => this.context[0] = Math.min(this.context[0] + 10, this.maximum)
            )

            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.down.id,
                () => this.context[0] = Math.max(this.context[0] - 10, this.minimum)
            )
        }

        draw() {
            super.draw()

            // screen().fillRect(
            //     // this.bounds.left + (this.bounds.width / 2) - (this.bounds.width / 10),
            //     this.bounds.left + (this.bounds.width / 2) + (screen().width / 2) - 10,
            //     this.bounds.top + this.bounds.height + (this.bounds.height * (this.getContext()[0] / this.maximum)),// + (screen().height / 2),
            //     20,
            //     10,
            //     15
            // )

            screen().fillRect(
                // this.bounds.left + (this.bounds.width / 2) - (this.bounds.width / 10),
                this.bounds.left + (this.bounds.width / 2) + (screen().width / 2) - 10,
                // this.bounds.top - 10 + (this.bounds.height / (this.getContext()[0] / this.maximum)) + (screen().height / 2),
                this.bounds.top + (this.bounds.height * (this.maximum / this.getContext()[0])) + 15,
                20,
                10,
                15
            )

            screen().fillRect(
                this.bounds.left + (this.bounds.width / 2) - 3 + (screen().width / 2),
                this.bounds.top + (screen().height / 2),
                6,
                this.bounds.height - 4,
                15
            )
        }
    }

    export class GUIGraph extends GUIBox {
        private graphableFns: GraphableFunction[]

        constructor(opts: {
            alignment: GUIComponentAlignment,
            graphableFns: GraphableFunction[],
            xOffset?: number,
            yOffset?: number,
            xScaling?: number,
            yScaling?: number,
            colour?: number,
            border?: boolean,
            title?: string
        }) {
            super({
                alignment: opts.alignment,
                xOffset: (opts.xOffset != null) ? opts.xOffset : 0,
                yOffset: (opts.yOffset != null) ? opts.yOffset : 0,
                xScaling: opts.xScaling,
                yScaling: opts.yScaling,
                colour: opts.colour,
                border: opts.border
            })

            this.graphableFns = opts.graphableFns
        }

        draw() {
            super.draw()

            const left = this.bounds.left
            const top = this.bounds.top

            this.bounds.fillRect(15)

            //-------------------------------
            // Load the buffer with new data:
            //-------------------------------

            for (let i = 0; i < this.graphableFns.length; i++) {
                const hasSpace = this.graphableFns[i].getBufferLength() < this.graphableFns[i].getMaxBufferSize()
                this.graphableFns[i].readIntoBufferOnce((screen().height / 2) + top, this.bounds.height) // 8
            }

            //----------------------------
            // Draw sensor lines & ticker:
            //----------------------------
            for (let i = 0; i < this.graphableFns.length; i++) {
                const sensor = this.graphableFns[i]
                const color: number = 3

                // Draw lines:
                sensor.draw(
                    (screen().width / 2) + left + 3,
                    color,
                )

                // Draw the latest reading on the right-hand side as a Ticker if at no-zoom:
                if (sensor.getHeightNormalisedBufferLength() > 0) {
                    const reading = sensor.getReading()
                    const range = Math.abs(sensor.getMinimum()) + sensor.getMaximum()
                    const y = Math.round(this.bounds.height - (this.bounds.height * ((reading - sensor.getMinimum()) / range)))

                    // Make sure the ticker won't be cut-off by other UI elements
                    // if (y > sensor.getMinimum() + 5) {
                        screen().print(
                            sensor.getNthReading(sensor.getBufferLength() - 1).toString().slice(0, 5),
                            this.bounds.left + this.bounds.width + (screen().width / 2) - 4,
                            y + top + this.bounds.height - 7,
                            color,
                            bitmaps.font5,
                        )
                    // }
                }
            }

            //---------------------------------
            // Draw the axis and their markers:
            //---------------------------------


            //------
            // Axes:
            //------
            for (let i = 0; i < 2; i++) {
                // X-Axis:
                screen().drawLine(
                    left + (screen().width / 2),
                    (screen().height / 2) + top + this.bounds.height + i,
                    left + this.bounds.width + (screen().width / 2),
                    (screen().height / 2) + top + this.bounds.height + i,
                    5
                );

                // Y-Axis:
                screen().drawLine(
                    left + (screen().width / 2) + i,
                    (screen().height / 2) + top,
                    left + (screen().width / 2) + i, 
                    (screen().height / 2) + this.bounds.height + top,
                    5
                );
            }

            //----------
            // Ordinate:
            //----------
            // if (this.globalSensorMinimum != null && this.globalSensorMaximum != null) {
            //     // Bot:
            //     screen().print(
            //         this.globalSensorMinimum.toString(),
            //         (6 * font.charWidth) - (this.globalSensorMinimum.toString().length * font.charWidth),
            //         this.bounds.height - this.windowBotBuffer + this.yScrollOffset + this.yScrollOffset - (Screen.HEIGHT * 0.03125), // 4 
            //         15
            //     )

            //     // Top:
            //     screen().print(
            //         this.globalSensorMaximum.toString(),
            //         (6 * font.charWidth) - (this.globalSensorMaximum.toString().length * font.charWidth),
            //         Screen.HEIGHT - this.bounds.height + this.windowTopBuffer - Math.floor(0.1 * this.yScrollOffset),
            //         15
            //     )
            // }

            //----------
            // Abscissa:
            //----------

            // Start
            screen().print(
                this.graphableFns[0].numberOfReadings.toString(),
                (screen().width / 2) + this.bounds.left,
                this.bounds.top + this.bounds.height + (screen().height / 2) + 3,
                1
            )

            // End:
            const end: string = (this.graphableFns[0].numberOfReadings + this.graphableFns[0].getHeightNormalisedBufferLength()).toString()
            screen().print(
                end,
                (screen().width / 2) + this.bounds.left + this.bounds.width - (end.length * font.charWidth) + 2,
                this.bounds.top + this.bounds.height + (screen().height / 2) + 3,
                1
            )
            basic.pause(100);
        }
    }


    export class GUISceneAbstract extends GUIComponentAbstract {
        navigator: INavigator
        public cursor: Cursor
        public picker: Picker

        constructor(opts: {
            alignment: GUIComponentAlignment,
            xOffset?: number,
            yOffset?: number,
            width: number,
            height: number,
            xScaling?: number,
            yScaling?: number,
            colour?: number,
            navigator?: INavigator
        }) {
            super({
                alignment: opts.alignment,
                xOffset: (opts.xOffset != null) ? opts.xOffset : 0,
                yOffset: (opts.yOffset != null) ? opts.yOffset : 0,
                width: GUIBox.DEFAULT_WIDTH,
                height: GUIBox.DEFAULT_HEIGHT,
                xScaling: opts.xScaling,
                yScaling: opts.yScaling,
                colour: opts.colour
            })

            this.navigator = opts.navigator

            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.right.id,
                () => this.moveCursor(CursorDir.Right)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.up.id,
                () => this.moveCursor(CursorDir.Up)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.down.id,
                () => this.moveCursor(CursorDir.Down)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.left.id,
                () => this.moveCursor(CursorDir.Left)
            )

            // click
            const click = () => this.cursor.click()
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.A.id,
                click
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.A.id + keymap.PLAYER_OFFSET,
                click
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.B.id,
                () => this.back()
            )

            // this.cursor = new Cursor()
            // this.picker = new Picker(this.cursor)
            // this.navigator = new RowNavigator()
            // this.cursor.navigator = this.navigator
        }

        protected moveCursor(dir: CursorDir) {
            try {
                this.moveTo(this.cursor.move(dir))
            } catch (e) {
                if (dir === CursorDir.Up && e.kind === BACK_BUTTON_ERROR_KIND)
                    this.back()
                else if (
                    dir === CursorDir.Down &&
                    e.kind === FORWARD_BUTTON_ERROR_KIND
                )
                    return
                else throw e 
            }
        }

        protected moveTo(target: Button) {
            if (!target) return
            this.cursor.moveTo(
                target.xfrm.worldPos,
                target.ariaId,
                target.bounds
            )
        }

        back() {
            if (!this.cursor.cancel()) this.moveCursor(CursorDir.Back)
        }

        protected handleClick(x: number, y: number) {
            const target = this.cursor.navigator.screenToButton(
                x - Screen.HALF_WIDTH,
                y - Screen.HALF_HEIGHT
            )
            if (target) {
                this.moveTo(target)
                target.click()
            } else if (this.picker.visible) {
                this.picker.hide()
            }
        }

        protected handleMove(x: number, y: number) {
            const btn = this.cursor.navigator.screenToButton(
                x - Screen.HALF_WIDTH,
                y - Screen.HALF_HEIGHT
            )
            if (btn) {
                const w = btn.xfrm.worldPos
                this.cursor.snapTo(w.x, w.y, btn.ariaId, btn.bounds)
                btn.reportAria(true)
            }
        }

        /* override */ shutdown() {
            this.navigator.clear()
        }

        /* override */ activate() {
            // super.activate()
            const btn = this.navigator.initialCursor(0, 0)
            if (btn) {
                const w = btn.xfrm.worldPos
                this.cursor.snapTo(w.x, w.y, btn.ariaId, btn.bounds)
                btn.reportAria(true)
            }
        }

        /* override */ update() {
            this.cursor.update()
        }

        /* override */ draw() {
            this.picker.draw()
            this.cursor.draw()
        }
    }


    const KEYBOARD_FRAME_COUNTER_CURSOR_ON = 20;
    const KEYBOARD_FRAME_COUNTER_CURSOR_OFF = 40;
    const KEYBOARD_MAX_TEXT_LENGTH = 20;

    export class KeyboardComponent extends GUISceneAbstract {
        public static DEFAULT_WIDTH: number = screen().width
        public static DEFAULT_HEIGHT: number = 80
        private static WIDTHS: number[] = [10, 10, 10, 10, 4]
        private btns: Button[]
        private btnText: string[]

        private text: string;
        private upperCase: boolean;
        private next: (arg0: string) => void;
        private frameCounter: number;
        private shakeText: boolean
        private shakeTextCounter: number

        constructor(opts: {
            next: (arg0: string) => void,
            alignment: GUIComponentAlignment,
            xOffset?: number,
            yOffset?: number,
            xScaling?: number,
            yScaling?: number,
            colour?: number,
        }) {
        // constructor(app: App, next: (arg0: string) => void) {
            // super(app, new GridNavigator(5, 5, KeyboardComponent.WIDTHS))

            super({
                alignment: opts.alignment,
                xOffset: (opts.xOffset != null) ? opts.xOffset : 0,
                yOffset: (opts.yOffset != null) ? opts.yOffset : 0,
                width: KeyboardComponent.DEFAULT_WIDTH,
                height: KeyboardComponent.DEFAULT_HEIGHT,
                xScaling: opts.xScaling,
                yScaling: opts.yScaling,
                colour: opts.colour
            })

            this.text = ""
            this.upperCase = true

            this.btns = []
            this.btnText = [
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
                "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
                "U", "V", "W", "X", "Y", "Z", ",", ".", "?", "!",
                "<-", "^", " _______ ", "ENTER"
            ];

            this.next = opts.next
            this.frameCounter = 0;
            this.shakeText = false;
            this.shakeTextCounter = 0;

            const defaultBehaviour = (btn: Button) => {
                if (this.text.length < KEYBOARD_MAX_TEXT_LENGTH) {
                    this.text += this.btnText[btn.state[0]]
                    this.frameCounter = KEYBOARD_FRAME_COUNTER_CURSOR_ON
                }
                else {
                    this.shakeText = true
                }
            }

            for (let i = 0; i < 4; i++) {
                const xDiff = screen().width / (KeyboardComponent.WIDTHS[i] + 1);
                for (let j = 0; j < 10; j++) {
                    this.btns.push(
                        new Button({
                            parent: null,
                            style: ButtonStyles.Transparent,
                            icon: bitmaps.create(10, 10),
                            ariaId: "",
                            x: (xDiff * (j + 1)) - (screen().width / 2),
                            y: (13 * (i + 1)) - 18,
                            onClick: defaultBehaviour,
                            state: [(i * 10) + j]
                        })
                    )
                }
            }

            const botRowBehaviours = [
                () => {
                    this.text =
                        (this.text.length > 0)
                            ? this.text.substr(0, this.text.length - 1)
                            : this.text
                    this.frameCounter = KEYBOARD_FRAME_COUNTER_CURSOR_ON
                },
                () => { this.changeCase() },
                () => {
                    if (this.text.length < KEYBOARD_MAX_TEXT_LENGTH) {
                        this.text += " ";
                        this.frameCounter = KEYBOARD_FRAME_COUNTER_CURSOR_ON;
                    }
                    else {
                        this.shakeText = true
                    }
                },
                () => { this.next(this.text) }
            ]

            const icons = [bitmaps.create(16, 10), bitmaps.create(10, 10), bitmaps.create(55, 10), bitmaps.create(33, 10)]
            const x = [22, 38, 74, 124]
            for (let i = 0; i < 4; i++) {
                this.btns.push(
                    new Button({
                        parent: null,
                        style: ButtonStyles.Transparent,
                        icon: icons[i],
                        ariaId: "",
                        x: x[i] - (screen().width / 2),
                        y: (13 * 5) - 18,
                        onClick: botRowBehaviours[i]
                    })
                )
            }

            this.changeCase()
            this.navigator.addButtons(this.btns)
        }

        private changeCase() {
            this.upperCase = !this.upperCase;

            if (this.upperCase)
                this.btnText = this.btnText.map((btn, i) =>
                    btn = (i < 40) ? btn.toUpperCase() : btn
                )
            else
                this.btnText = this.btnText.map((btn, i) =>
                    btn = (i < 40) ? btn.toLowerCase() : btn
                )
        }

        draw() {
            this.frameCounter += 1

            // Blue base colour:
            Screen.fillRect(
                Screen.LEFT_EDGE,
                Screen.TOP_EDGE,
                Screen.WIDTH,
                Screen.HEIGHT,
                6 // Blue
            )

            // Orange Keyboard with a black shadow on the bot & right edge (depth effect):

            // Black border around right & bot edge:
            Screen.fillRect(
                Screen.LEFT_EDGE + 4,
                Screen.TOP_EDGE + 47,
                Screen.WIDTH - 6,
                71,
                15 // Black
            )

            // Orange keyboard that the white text will be ontop of:
            Screen.fillRect(
                Screen.LEFT_EDGE + 4,
                Screen.TOP_EDGE + 44,
                Screen.WIDTH - 8,
                72,
                4 // Orange
            )

            for (let i = 0; i < this.btns.length; i++) {
                this.btns[i].draw()

                const x = (screen().width / 2) + this.btns[i].xfrm.localPos.x - (this.btns[i].icon.width / 2) + 2
                const y = (screen().height / 2) + this.btns[i].xfrm.localPos.y + font.charHeight - 12
                screen().print(this.btnText[i], x, y, 1) // White text
            }

            super.draw()
        }
    }



    /**
     * Holds other components,
     * One component is active at a time
     */
    export class Window extends Scene {
        private components: GUIComponentAbstract[];
        private currentComponentID: number;

        constructor(opts: {
            app: App,
            colour?: number,
            next?: (arg0: any[]) => void,
            back?: (arg0: any[]) => void,
            components?: GUIComponentAbstract[],
            hideByDefault?: boolean
        }) {
            super(app)

            if (opts.colour != null)
                this.backgroundColor = opts.colour

            this.components = opts.components
            this.currentComponentID = 0

            if (this.components != null && opts.hideByDefault)
                this.focus(this.currentComponentID)
        }

        /* override */ startup() {
            super.startup()
        }

        focus(componentID: number, hideOthers: boolean = true) {
            if (hideOthers)
                this.components.forEach(component => component.hide())
            this.components[componentID].unHide()

            this.currentComponentID = componentID
        }

        showAllComponents() {
            this.components.forEach(component => component.unHide())
        }


        draw() {
            super.draw()

            screen().fillRect(
                0,
                0,
                screen().width,
                screen().height,
                this.backgroundColor
            )

            this.components.forEach(component => {
                if (!component.isHidden())
                    component.draw()
            })

            // this.cursor.draw()
        }
    }
}