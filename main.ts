namespace microcode {
    const app = new App();

    /**
     * Make it easier to create microbit-apps,
     * Learn to program more complex applications,
     * Students creating their own applications for the Arcade Shield,
     * 
     * Re-usable and easily modifiable components
     * 
     * Hetrogenous components that are easy to setup, that work together on the screen.
     */


    // const simpleTextComponent = new TextBox({
    //     alignment: GUIComponentAlignment.TOP_RIGHT,
    //     isActive: false,
    //     title: "Title Text",
    //     text: ["Hello there,", "I hope you are well.", "Isn't this neat?"],
    //     colour: 7,
    //     xScaling: 1.7,
    //     yScaling: 0.9,
    //     xOffset: - 10
    // })

    // const simpleBtnComponent = new ButtonCollection({
    //     alignment: GUIComponentAlignment.BOT_RIGHT,
    //     btns: [[new Button({ icon: "accelerometer", ariaId: "Accel", x: 10, onClick: () => basic.showNumber(0)})]],
    //     isActive: true
    // })

    // const window = new Window({ app, components: [simpleBtnComponent, simpleTextComponent]})
    // app.pushScene(window)



    const comp1 = new ButtonCollection({
        alignment: GUIComponentAlignment.TOP,
        btns: [
            [new Button({ icon: "pin_0", ariaId: "0", x: 0, y: 0, onClick: () => basic.showNumber(0) }),
            new Button({ icon: "pin_1", ariaId: "1", x: 20, y: 0, onClick: () => basic.showNumber(1) })],
            [new Button({ icon: "green_tick", ariaId: "Done", x: 20, y: 20, onClick: () => Window.makeComponentActive(1, true) })]
        ],
        isActive: true,
    })

    /**
     * Grid of buttons in the centre of the screen,
     * Press done to go somewhere else.
     */
    const comp2 = new ButtonCollection({
        alignment: GUIComponentAlignment.CENTRE,
        btns: [
            [ // Row 1:
                new Button({ icon: "thermometer", ariaId: "0", x: 5, y: 5, onClick: () => basic.showNumber(0) }),
                new Button({ icon: "thermometer", ariaId: "1", x: 25, y: 5, onClick: () => basic.showNumber(1) }),
                new Button({ icon: "thermometer", ariaId: "2", x: 45, y: 5, onClick: () => basic.showNumber(2) }),
                new Button({ icon: "thermometer", ariaId: "3", x: 65, y: 5, onClick: () => basic.showNumber(3) }),
            ],
            [ // Row 2:
                new Button({ icon: "thermometer", ariaId: "4", x: 5, y: 30, onClick: () => basic.showNumber(4) }),
                // new Button({ icon: "thermometer", ariaId: "5", x: 25, y: 30, onClick: () => basic.showNumber(5) }),
                // new Button({ icon: "thermometer", ariaId: "6", x: 45, y: 30, onClick: () => basic.showNumber(6) }),
                new Button({ icon: "green_tick",  ariaId: "", x: 65, y: 30, onClick: () => Window.makeComponentActive(0, true) })
            ],
        ],
        isActive: false,
        isHidden: true,
        xScaling: 1.1,
        colour: 6,
    })

    const window = new Window({app, components: [comp1, comp2] })
    app.pushScene(window)



    // let count = 0;
    // const comp1 = new ButtonCollection({
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

    // const comp2 = new GUIGraph({
    //     alignment: GUIComponentAlignment.CENTRE,
    //     graphableFns: [new GraphableFunction((_) => count)],
    //     isActive: false,
    // })

    // const window = new Window({ app, components: [comp1, comp2] })
    // app.pushScene(window)


    // const kb = new microcode.KeyboardMenu(app, (x: string) => basic.showString(x))
    // app.pushScene(kb)
}