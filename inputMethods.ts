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
        . . . c 1 c d c d c b f . . . .
        . . . c 1 c d c d c b f . . . .
        . . . c 1 c d c d c b f . . . .
        . . . c 1 c d c d c b f . . . .
        . . . c 1 1 d d d b b f . . . .
        . . . c 1 1 d d d b b f . . . .
        . . . . c c c f f f f . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `

  export enum KeyboardLayouts {
    QWERTY,
    NUMERIC,
    NUMERIC_POSITIVE_INTEGER,
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
    setText(text: string): void;
  }

  type KeyboardBtnFn = (btn: Button, kb: IKeyboard) => void;
  type SpecialBtnData = { btnRow: number, btnCol: number, behaviour: KeyboardBtnFn };
  type KeyboardLayoutData = {
      btnTexts: (string | Bitmap)[][],
      defaultBtnBehaviour: KeyboardBtnFn,
      specialBtnBehaviours: SpecialBtnData[]
  };

  const __kbBehaviourNumericDefault: KeyboardBtnFn = (btn: Button, kb: IKeyboard) => { // Default Behaviour: Prevent leading zeroes
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

  } // End of: default behaviour: Prevent leading zeroes

  const __kbBehaviourNumericMinus: KeyboardBtnFn = (btn: Button, kb: IKeyboard) => { // Minus symbol: Toggle "-" at the start.
    const txt = kb.getText();

    // Remove "-" if its already there:
    if (txt[0] == btn.state[0])
      if (txt.length == 1)
        kb.setText("")
      else
        kb.setText(txt.slice(1))
    else // Add in "-":
      kb.setText("-" + txt)
  } // END OF: Minus symbol: Toggle "-" at the start.


  const __kbBehaviourNumericDecimal: KeyboardBtnFn = (btn: Button, kb: IKeyboard) => { // Decimal point
    const txt = kb.getText();
    const len = txt.length;
    const decimalAlreadyPresent = txt.includes(".")
    if (len == 0 || txt[len - 1] == "-" || decimalAlreadyPresent)
      kb.shakeText()
    else
      kb.appendText(".")
  } // END OF: Decimal point

  const __kbBehaviourNumericEnter: KeyboardBtnFn = (btn: Button, kb: IKeyboard) => { // Enter
    const txt = kb.getText();
    const len = txt.length;
    const lenRule = txt[len - 1] != "-";
    const noDecimalEnding = txt[len - 1] != "."; // Illegal: 0. , -0. , -10. Okay: -0.00.. and 0.000 (becomes 0 later)

    if (len > 0 && lenRule && noDecimalEnding) { // Last rule could be removed, casting "1." to number is valid.
      // Turn -0 and -0.000... into 0 before returning
      const txtAsNum: number = +txt;
      if (txtAsNum == 0 || txtAsNum == -0)
        kb.setText("0")
      kb.nextScene()
    } else {
      kb.shakeText()
    }
  } // END OF: ENTER

  function __keyboardLayout(layout: KeyboardLayouts, del = false): KeyboardLayoutData  {
    switch (layout) {
      case KeyboardLayouts.QWERTY: {
        const ret: KeyboardLayoutData = {
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
        }
        if (del) {
          ret.btnTexts[4].insertAt(0,btn_delete)
          ret.specialBtnBehaviours.push({ btnRow: 4, btnCol: 0, behaviour: (b: Button, kb: IKeyboard) => kb.deleteFn() }) 
        }
        return ret
      }

      /**
       * Ensures that the user inputs result in a valid number.
       * E.g: prevents two decimal places, - only at start, etc
       */
      case KeyboardLayouts.NUMERIC_POSITIVE_INTEGER:
      case KeyboardLayouts.NUMERIC:  {
        const ret: KeyboardLayoutData = {
          btnTexts: [
            ["1", "2", "3", "<-"],
            ["4", "5", "6" ],
            ["7", "8", "9", "0", "ENTER"]
          ],
          defaultBtnBehaviour: __kbBehaviourNumericDefault,
          specialBtnBehaviours: [
            { btnRow: 0, btnCol: 3, behaviour: (btn: Button, kb: IKeyboard) => kb.deletePriorCharacters(1) }, // Backspace
            { btnRow: 2, btnCol: 4, behaviour: (b: Button, kb: IKeyboard) => __kbBehaviourNumericEnter(b, kb) }
          ]
        }
        if (layout == KeyboardLayouts.NUMERIC) {
          ret.btnTexts[1].push(".")
          ret.btnTexts[1].push("-")
          ret.specialBtnBehaviours.push(
            { btnRow: 1, btnCol: 4, behaviour: (b: Button, kb: IKeyboard) => __kbBehaviourNumericMinus(b, kb) })
          ret.specialBtnBehaviours.push(
            { btnRow: 1, btnCol: 3, behaviour: (b: Button, kb: IKeyboard) => __kbBehaviourNumericDecimal(b, kb) })
        }
        if (del) {
          ret.btnTexts[0].push(btn_delete)
          ret.specialBtnBehaviours.push({ btnRow: 0, btnCol: 4, behaviour: (b: Button, kb: IKeyboard) => kb.deleteFn() }) 
        }
        return ret
      }
    }
  }

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

      const data = __keyboardLayout(this.keyboardLayout);
      this.btns = data.btnTexts.map(_ => []);

      const charWidth = bitmaps.font8.charWidth
      const charHeight = bitmaps.font8.charHeight

      const ySpacing = (this.keyboardBounds.height - charHeight) / (data.btnTexts.length);

      const btnXPositions: number[][] =
        data.btnTexts.map(row =>
          row.map((txtOrBitmap: string | Bitmap) => {
            if (typeof (txtOrBitmap) == "string")
              // return (charWidth * (txtOrBitmap.length + 1) >> 1);
              return charWidth * (txtOrBitmap.length + 1);
            else
              // return txtOrBitmap.width - (txtOrBitmap.width >> 1);
              return txtOrBitmap.width - txtOrBitmap.width;
          })
        );

      const btnBitmapWidths: number[][] =
        data.btnTexts.map(row =>
          row.map((txtOrBitmap: (string | Bitmap)) => {
            if (typeof (txtOrBitmap) == "string")
              return (charWidth * txtOrBitmap.length) + (charWidth >> 1);
            else
              return txtOrBitmap.width;
          })
        );

      const btnXPositionAnchor: number =
        btnXPositions.map(rowWidth =>
          rowWidth.reduce((sum: number, current: number) => sum + current, 0)
        )
          .reduce((widest: number, current: number) => Math.max(widest, current), 0);

      const longestRowLen = data.btnTexts.map(btnTexts => btnTexts.length).reduce((longest, current) => Math.max(longest, current), 0);
      // const xSpacing = (this.keyboardBounds.width - btnXPositionAnchor) / (longestRowLen + 1);

      for (let row = 0; row < data.btnTexts.length; row++) {
        // const xSpacing = ((this.keyboardBounds.width - btnXPositionAnchor) / (data.btnTexts[row].length + 1));
        const xSpacing = ((this.keyboardBounds.width - btnXPositionAnchor) / (longestRowLen + 1));
        // const xSpacing = (this.keyboardBounds.width - btnXPositions[row].reduce((sum, current) => sum + current, 0)) / (data.btnTexts[row].length + 1);

        let x = -Screen.HALF_WIDTH + xSpacing + (data.btnTexts[row].length >> 1);

        for (let col = 0; col < data.btnTexts[row].length; col++) {
          const btnState: (string | Bitmap) = data.btnTexts[row][col];
          const bitmapWidth = btnBitmapWidths[row][col];

          x += (btnXPositions[row][col] + xSpacing) >> 1
          this.btns[row][col] =
            new Button({
              parent: null,
              style: ButtonStyles.Transparent,
              icon: (typeof (btnState) == "string") ? bitmaps.create(bitmapWidth, charHeight) : btnState,
              ariaId: "",
              x: x,
              y: -(charHeight >> 1) + (ySpacing * row),
              onClick: (btn: Button) => data.defaultBtnBehaviour(btn, this),
              state: (typeof (btnState) == "string") ? [btnState] : [] // String only btnStates; for default QWERTY and NUMERIC behaviours.
            })
          x += (btnXPositions[row][col] + xSpacing) >> 1;
        }
      }

      // Setup special btn behaviours:
      data.specialBtnBehaviours.forEach(
        (data: SpecialBtnData, i) => {
          this.btns[data.btnRow][data.btnCol].onClick =
            (btn: Button) => data.behaviour(btn, this);
        }
      )

      context.onEvent(ControllerButtonEvent.Pressed, controller.B.id, () => this.passedBackBtn(this.text));
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

    public setText(text: string): void {
      this.text = text;
    }

    public swapCase(): void {
      this.isUpperCase = !this.isUpperCase;

      const swapCaseFn = (this.isUpperCase)
        ? (t: string) => { return t.toUpperCase() }
        : (t: string) => { return t.toLowerCase() }


      const specialBtnData: SpecialBtnData[] = __keyboardLayout(this.keyboardLayout).specialBtnBehaviours;
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
      this.passedDeleteFn(this.text);
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

          const X_SHIFT = 3; // small adjustment to get the btnText to line up with the cursor
          const x = (screen().width / 2) + btn.xfrm.localPos.x - (btn.icon.width / 2) + X_SHIFT
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
