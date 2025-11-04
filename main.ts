namespace microcode {
    import Scene = user_interface_base.Scene
    import SceneManager = user_interface_base.SceneManager
    import Screen = user_interface_base.Screen
    import Button = user_interface_base.Button

    import App = microgui.App
    import ButtonCollection = microgui.ButtonCollection
    import GUIComponentAlignment = microgui.GUIComponentAlignment
    import TextBox = microgui.TextBox
    import GUIComponentScene = microgui.GUIComponentScene
    import TextButtonCollection = microgui.TextButtonCollection
    import TextButton = microgui.TextButton
    import GraphableFunction = microgui.GraphableFunction
    import GUIGraph = microgui.GUIGraph
    import RadioButtonCollection = microgui.RadioButtonCollection
    import RadioButton = microgui.RadioButton


    control.singleSimulator();
    const app = new App();

    // Comment out the examples you aren't using:


    // Example 1a:

    // const simpleTextComponent = new TextBox({
    //     alignment: GUIComponentAlignment.BOT,
    //     isActive: false,
    //     title: "Title Text :)", // optional arg
    //     text: ["Hello there,", "I hope you are well.", "Isn't this neat?"], // optional arg
    //     colour: 6, // optional arg
    //     xScaling: 1.7, // optional arg
    // })

    // const gcs = new GUIComponentScene({ app, components: [simpleTextComponent] })
    // app.pushScene(gcs)



    // Example 1b:

    // const simpleBtnComponent = new ButtonCollection({
    //     alignment: GUIComponentAlignment.BOT_RIGHT,
    //     btns: [
    //         // Row 1:
    //         [new Button({ icon: "accelerometer", onClick: () => basic.showNumber(0) })]
    //     ],
    //     isActive: true,
    //     colour: 4 // optional arg
    // })

    // const gcs = new GUIComponentScene({ app, components: [simpleBtnComponent], colour: 6 })
    // app.pushScene(gcs)



    // Example 2: Multiple interacting components + dynamically adding components

    // let gcs = new GUIComponentScene({ app, components: [] })
    // const comp1 = new ButtonCollection({
    //     alignment: GUIComponentAlignment.TOP,
    //     btns: [
    //         [new Button({ icon: "pin_0", ariaId: "0", x: 0, y: 0, onClick: () => basic.showNumber(0) }),
    //         new Button({ icon: "pin_1", ariaId: "1", x: 20, y: 0, onClick: () => basic.showNumber(1) })],
    //         [new Button({ icon: "green_tick", ariaId: "Done", x: 20, y: 20, onClick: () => gcs.makeComponentActive(1, false) })]
    //     ],
    //     isActive: true,
    // })

    // const comp2 = new ButtonCollection({
    //     alignment: GUIComponentAlignment.LEFT,
    //     btns: [
    //         [new Button({ icon: "thermometer", ariaId: "", x: 10, y: 0, onClick: () => basic.showNumber(0) })],
    //         [new Button({ icon: "green_tick", ariaId: "", x: 10, y: 20, onClick: () => gcs.makeComponentActive(0, true) })]
    //     ],
    //     isActive: false,
    //     isHidden: true,
    //     colour: 2,
    // })

    // gcs.addComponents([comp1, comp2])
    // app.pushScene(gcs)



    // Example 3: Hetrogenous rows:
    // You can also dynamically add rows

    // const buttonCollection = new ButtonCollection({
    //     alignment: GUIComponentAlignment.TOP,
    //     btns: [
    //         [ // Row 1:
    //             new Button({ icon: "accelerometer", ariaId: "0", x: 5, y: 5, onClick: () => basic.showNumber(0) }),
    //             new Button({ icon: "pin_0", ariaId: "1", x: 25, y: 5, onClick: () => basic.showNumber(1) }),
    //             new Button({ icon: "pin_1", ariaId: "2", x: 45, y: 5, onClick: () => basic.showNumber(2) }),
    //             new Button({ icon: "pin_2", ariaId: "3", x: 65, y: 5, onClick: () => basic.showNumber(3) }),
    //         ],
    //         [ // Row 2:
    //             new Button({ icon: "thermometer", ariaId: "4", x: 5, y: 30, onClick: () => basic.showNumber(4) }),
    //             new Button({ icon: "microphone", ariaId: "5", x: 65, y: 30, onClick: () => basic.showNumber(5) })
    //         ],
    //         [ // Row 3:
    //             new Button({ icon: "compass", ariaId: "6", x: 5, y: 55, onClick: () => basic.showNumber(6) }),
    //         ],
    //         [ // Row 4:
    //             new Button({ icon: "right_spin", ariaId: "7", x: 5, y: 80, onClick: () => basic.showNumber(7) }),
    //             new Button({ icon: "right_turn", ariaId: "8", x: 25, y: 80, onClick: () => basic.showNumber(8) }),
    //             new Button({ icon: "green_tick", ariaId: "9", x: 65, y: 80, onClick: () => basic.showNumber(9)})
    //         ],
    //     ],
    //     isActive: true,
    //     isHidden: false,
    //     xScaling: 1.1,
    //     yScaling: 1.9,
    //     colour: 3,
    // })

    // const gcs = new GUIComponentScene({ app, components: [buttonCollection] })
    // app.pushScene(gcs)


    const buttonCollection = new ButtonCollection({
        alignment: GUIComponentAlignment.TOP,
        btns: [
            [ // Row 1:
                new Button({ icon: "accelerometer", ariaId: "0", onClick: () => basic.showNumber(0) }),
                new Button({ icon: "pin_0", ariaId: "1", onClick: () => basic.showNumber(1) }),
                new Button({ icon: "pin_1", ariaId: "2", onClick: () => basic.showNumber(2) }),
                new Button({ icon: "pin_2", ariaId: "3", onClick: () => basic.showNumber(3) }),
            ],
            [ // Row 2:
                new Button({ icon: "thermometer", ariaId: "4", onClick: () => basic.showNumber(4) }),
                new Button({ icon: "microphone", ariaId: "5", onClick: () => basic.showNumber(5) })
            ],
            [ // Row 3:
                new Button({ icon: "compass", ariaId: "6", onClick: () => basic.showNumber(6) }),
                new Button({ icon: "compass", ariaId: "6", onClick: () => basic.showNumber(6) }),
                new Button({ icon: "compass", ariaId: "6", onClick: () => basic.showNumber(6) }),
                new Button({ icon: "compass", ariaId: "6", onClick: () => basic.showNumber(6) }),
                new Button({ icon: "compass", ariaId: "6", onClick: () => basic.showNumber(6) }),

            ],
            [ // Row 4:
                new Button({ icon: "right_spin", ariaId: "7", onClick: () => basic.showNumber(7) }),
                new Button({ icon: "right_turn", ariaId: "8", onClick: () => basic.showNumber(8) }),
                new Button({ icon: "green_tick", ariaId: "9", onClick: () => basic.showNumber(9) })
            ],
        ],
        isActive: true,
        isHidden: false,
        xScaling: 1.1,
        yScaling: 1.7,
        colour: 3,
    })

    const gcs = new GUIComponentScene({ app, components: [buttonCollection] })
    app.pushScene(gcs)



    // Example 4: Component context: Linking a graph with a button:

    // let count = 0;
    // const btnComponent = new ButtonCollection({
    //     alignment: GUIComponentAlignment.TOP,
    //     btns: [
    //         [new Button({
    //             icon: "pin_0", ariaId: "+1", x: 10, y: 10, onClick: () => {
    //                 count += 1;
    //             }
    //         })],
    //     ],
    //     isActive: true,
    //     colour: 2,
    //     xScaling: 0.5,
    //     yScaling: 0.7,
    //     xOffset: -10
    // })

    // const graphComponent = new GUIGraph({
    //     alignment: GUIComponentAlignment.BOT,
    //     graphableFns: [new GraphableFunction((_) => count)],
    //     isActive: false,
    //     isHidden: false
    // })

    // const gcs = new GUIComponentScene({ app, components: [btnComponent, graphComponent], colour: 11 })
    // app.pushScene(gcs)




    // Example 5: Text Buttons

    // const txtBtnComp = new TextButtonCollection({
    //     alignment: GUIComponentAlignment.TOP_LEFT,
    //     isActive: true,
    //     textBtns: [
    //         new TextButton({ text: "Text Btn 1", callback: () => basic.showString("hi") }),
    //         new TextButton({ text: "Text Btn 2", callback: () => basic.showString("yo") })
    //     ],
    //     xOffset: 10,
    //     yOffset: 10,
    //     yScaling: 1.1,
    //     colour: 13,
    //     title: "My title" // Try commenting this out.
    // })
    // const gcs = new GUIComponentScene({ app, components: [txtBtnComp], colour: 3 })
    // app.pushScene(gcs)



    // Example 6: RadioButtons

    // const rbc = new RadioButtonCollection({
    //     alignment: GUIComponentAlignment.CENTRE,
    //     btns: [
    //         new RadioButton({ text: "hi", onClick: () => { basic.showString("a") } }),
    //         new RadioButton({ text: "hiyaaaaaaaaaa", onClick: () => { basic.showString("b") } }),
    //         new RadioButton({ text: "hello", onClick: () => { basic.showString("c") } }),
    //         new RadioButton({ text: "a", onClick: () => { basic.showString("d") } }),
    //         new RadioButton({ text: "b", onClick: () => { basic.showString("e") } })
    //     ],
    //     isActive: true,
    //     title: "The title",
    //     colour: 3
    // });

    // const gcs = new GUIComponentScene({ app, components: [rbc] });
    // app.pushScene(gcs);
}

