namespace microcode {
    import App = microgui.App
    import Scene = user_interface_base.Scene
    import SceneManager = user_interface_base.SceneManager
    import Screen = user_interface_base.Screen
    import KeyboardMenu = microgui.KeyboardMenu
    import Button = user_interface_base.Button
    import ButtonCollection = microgui.ButtonCollection
    import GUIComponentAlignment = microgui.GUIComponentAlignment
    import GUIComponentScene = microgui.GUIComponentScene

    control.singleSimulator();
    const app = new App();

    //     // const simpleTextComponent = new TextBox({
    //     //     alignment: GUIComponentAlignment.BOT,
    //     //     isActive: false,
    //     //     title: "Title Text :)",
    //     //     text: ["Hello there,", "I hope you are well.", "Isn't this neat?"],
    //     //     colour: 6,
    //     //     xScaling: 1.7,
    //     // })

    //     // const window = new Window({ app, components: [simpleTextComponent] })
    //     // app.pushScene(window)

    //     // const simpleBtnComponent = new ButtonCollection({
    //     //     alignment: GUIComponentAlignment.BOT_RIGHT,
    //     //     btns: [[new Button({ icon: "accelerometer", onClick: () => basic.showNumber(0)})]],
    //     //     isActive: true,
    //     // })

    //     const comp1 = new ButtonCollection({
    //         alignment: GUIComponentAlignment.TOP,
    //         btns: [
    //             [new Button({ icon: "pin_0", ariaId: "0", x: 0, y: 0, onClick: () => basic.showNumber(0) }),
    //             new Button({ icon: "pin_1", ariaId: "1", x: 20, y: 0, onClick: () => basic.showNumber(1) })],
    //             [new Button({ icon: "green_tick", ariaId: "Done", x: 20, y: 20, onClick: () => Window.makeComponentActive(1, false) })]
    //         ],
    //         isActive: true,
    //     })

    //     const comp2 = new ButtonCollection({
    //         alignment: GUIComponentAlignment.LEFT,
    //         btns: [
    //             [new Button({ icon: "thermometer", ariaId: "", x: 10, y: 0, onClick: () => basic.showNumber(0) })],
    //             [new Button({ icon: "green_tick", ariaId: "", x: 10, y: 20, onClick: () => Window.makeComponentActive(2, true) })]
    //         ],
    //         isActive: false,
    //         isHidden: true,
    //         colour: 2,
    //     })

    /**
     * Grid of buttons in the centre of the screen,
     * Press done to go somewhere else.
     */
    const comp3 = new ButtonCollection({
        alignment: GUIComponentAlignment.TOP,
        btns: [
            // [ // Row 1:
            //     new Button({ icon: "thermometer", ariaId: "0", x: 5, y: 5, onClick: () => basic.showNumber(0) }),
            //     new Button({ icon: "thermometer", ariaId: "1", x: 25, y: 5, onClick: () => basic.showNumber(1) }),
            //     new Button({ icon: "thermometer", ariaId: "2", x: 45, y: 5, onClick: () => basic.showNumber(2) }),
            //     new Button({ icon: "thermometer", ariaId: "3", x: 65, y: 5, onClick: () => basic.showNumber(3) }),
            // ],
            // [ // Row 2:
            //     new Button({ icon: "thermometer", ariaId: "4", x: 5, y: 30, onClick: () => basic.showNumber(4) }),
            //     new Button({ icon: "green_tick", ariaId: "5", x: 65, y: 30, onClick: () => { } })//GUIComponentScene.makeComponentActive(0, true) })
            // ],
            // [ // Row 3:
            //     new Button({ icon: "thermometer", ariaId: "6", x: 5, y: 55, onClick: () => basic.showNumber(6) }),
            // ],
            // [ // Row 4:
            //     new Button({ icon: "thermometer", ariaId: "7", x: 5, y: 80, onClick: () => basic.showNumber(7) }),
            //     new Button({ icon: "thermometer", ariaId: "8", x: 25, y: 80, onClick: () => basic.showNumber(8) }),
            //     new Button({ icon: "green_tick", ariaId: "9", x: 65, y: 80, onClick: () => { } })//GUIComponentScene.makeComponentActive(0, true) })
            // ],
        ],
        isActive: true,
        isHidden: false,
        xScaling: 1.1,
        yScaling: 2,
        colour: 6,
    })

    // const window = new GUIComponentScene({ app, components: [comp3] })
    // app.pushScene(window)

    screen().fill(6)

    // const comp3 = new ButtonCollection({
    //     alignment: GUIComponentAlignment.TOP,
    //     btns: [
    //         [ // Row 1:
    //             new Button({ icon: "thermometer", ariaId: "0", x: 5, y: 5, onClick: () => basic.showNumber(0) }),
    //             new Button({ icon: "thermometer", ariaId: "1", x: 25, y: 5, onClick: () => basic.showNumber(1) }),
    //             new Button({ icon: "thermometer", ariaId: "2", x: 45, y: 5, onClick: () => basic.showNumber(2) }),
    //             new Button({ icon: "thermometer", ariaId: "3", x: 65, y: 5, onClick: () => basic.showNumber(3) }),
    //         ],
    //         [ // Row 2:
    //             new Button({ icon: "thermometer", ariaId: "4", x: 5, y: 30, onClick: () => basic.showNumber(4) }),
    //             new Button({ icon: "thermometer", ariaId: "5", x: 25, y: 30, onClick: () => basic.showNumber(4) }),
    //             new Button({ icon: "thermometer", ariaId: "6", x: 45, y: 30, onClick: () => basic.showNumber(4) }),
    //             new Button({ icon: "thermometer", ariaId: "7", x: 65, y: 30, onClick: () => basic.showNumber(4) }),
    //             new Button({ icon: "thermometer", ariaId: "8", x: 85, y: 30, onClick: () => basic.showNumber(4) }),
    //         ],
    //     ],
    //     isActive: true,
    //     isHidden: false,
    //     xScaling: 1.4,
    //     yScaling: 2,
    //     colour: 6,
    // })


    //     // let count = 0;
    //     // const comp1 = new ButtonCollection({
    //     //     alignment: GUIComponentAlignment.TOP,
    //     //     btns: [
    //     //         [new Button({
    //     //             icon: "pin_0", ariaId: "+1", x: 10, y: 10, onClick: () => {
    //     //                 count += 1;
    //     //             }
    //     //         })],
    //     //     ],
    //     //     isActive: true,
    //     //     colour: 2,
    //     //     xScaling: 0.5,
    //     //     yScaling: 0.7,
    //     //     xOffset: -10
    //     // })

    //     // const comp2 = new GUIGraph({
    //     //     alignment: GUIComponentAlignment.BOT,
    //     //     graphableFns: [new GraphableFunction((_) => count)],
    //     //     isActive: false,
    //     // })

    //     // const window = new Window({ app, components: [comp1, comp2] })
    //     // app.pushScene(window)

    //     // const txtBtnComp = new TextButtonCollection({
    //     //     alignment: GUIComponentAlignment.TOP_LEFT,
    //     //     isActive: true,
    //     //     textBtns: [
    //     //         new TextButton({ text: "Text Btn 1", callback: () => basic.showString("hi") }),
    //     //         new TextButton({ text: "Text Btn 2", callback: () => basic.showString("yo") })
    //     //     ],
    //     //     xOffset: 10,
    //     //     yScaling: 1.1,
    //     //     title: ""
    //     // })
    //     // const window = new Window({ app, components: [txtBtnComp] })
    //     // app.pushScene(window)

    //     // const kbc = new KeyboardComponent({
    //     //     alignment: GUIComponentAlignment.CENTRE, 
    //     //     isActive: true,
    //     //     xScaling: 1.8,
    //     //     yScaling: 1,
    //     //     next: () => {}
    //     // });

    //     // const w = new Window({app, components: [kbc]})
    //     // app.pushScene(w)



    // const kb = new KeyboardMenu(app, () => { });
    // app.pushScene(kb)
}

