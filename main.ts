// namespace microgui {
//     import AppInterface = user_interface_base.AppInterface
//     import Scene = user_interface_base.Scene

//     const app = new microgui.App();

//     // const simpleTextComponent = new TextBox({
//     //     alignment: GUIComponentAlignment.TOP,
//     //     isActive: false,
//     //     title: "Title Text :)",
//     //     text: ["Hello there,", "I hope you are well.", "Isn't this neat?"],
//     //     colour: 6,
//     //     xScaling: 1.7,
//     // })

//     // const simpleBtnComponent = new ButtonCollection({
//     //     alignment: GUIComponentAlignment.BOT_RIGHT,
//     //     btns: [[new Button({ icon: "accelerometer", onClick: () => basic.showNumber(0)})]],
//     //     isActive: true,
//     // })

//     // const window = new Window({ app, components: [simpleTextComponent]})
//     // app.pushScene(window)



//     // const comp1 = new ButtonCollection({
//     //     alignment: GUIComponentAlignment.TOP,
//     //     btns: [
//     //         [new Button({ icon: "pin_0", ariaId: "0", x: 0, y: 0, onClick: () => basic.showNumber(0) }),
//     //         new Button({ icon: "pin_1", ariaId: "1", x: 20, y: 0, onClick: () => basic.showNumber(1) })],
//     //         [new Button({ icon: "green_tick", ariaId: "Done", x: 20, y: 20, onClick: () => Window.makeComponentActive(1, false) })]
//     //     ],
//     //     isActive: true,
//     // })

//     // const comp2 = new ButtonCollection({
//     //     alignment: GUIComponentAlignment.LEFT,
//     //     btns: [
//     //         [new Button({ icon: "thermometer", ariaId: "", x: 10, y: 0, onClick: () => basic.showNumber(0) })],
//     //         [new Button({ icon: "green_tick", ariaId: "", x: 10, y: 20, onClick: () => Window.makeComponentActive(2, true) })]
//     //     ],
//     //     isActive: false,
//     //     isHidden: true,
//     //     colour: 2,
//     // })

//     // /**
//     //  * Grid of buttons in the centre of the screen,
//     //  * Press done to go somewhere else.
//     //  */
//     // const comp3 = new ButtonCollection({
//     //     alignment: GUIComponentAlignment.CENTRE,
//     //     btns: [
//     //         [ // Row 1:
//     //             new Button({ icon: "thermometer", ariaId: "0", x: 5, y: 5, onClick: () => basic.showNumber(0) }),
//     //             new Button({ icon: "thermometer", ariaId: "1", x: 25, y: 5, onClick: () => basic.showNumber(1) }),
//     //             new Button({ icon: "thermometer", ariaId: "2", x: 45, y: 5, onClick: () => basic.showNumber(2) }),
//     //             new Button({ icon: "thermometer", ariaId: "3", x: 65, y: 5, onClick: () => basic.showNumber(3) }),
//     //         ],
//     //         [ // Row 2:
//     //             new Button({ icon: "thermometer", ariaId: "4", x: 5, y: 30, onClick: () => basic.showNumber(4) }),
//     //             new Button({ icon: "thermometer", ariaId: "5", x: 25, y: 30, onClick: () => basic.showNumber(5) }),
//     //             new Button({ icon: "thermometer", ariaId: "6", x: 45, y: 30, onClick: () => basic.showNumber(6) }),
//     //             new Button({ icon: "green_tick",  ariaId: "", x: 65, y: 30, onClick: () => Window.makeComponentActive(0, true) })
//     //         ],
//     //     ],
//     //     isActive: false,
//     //     isHidden: true,
//     //     xScaling: 1.1,
//     //     colour: 6,
//     // })

//     // const window = new Window({app, components: [comp1, comp2, comp3] })
//     // app.pushScene(window)




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

//     class Test extends Scene {
//         private components: GUIComponentAbstract[];
//         private currentComponentID: number;

//         constructor(app: AppInterface, components: GUIComponentAbstract[]) {
//             super()
//             this.components = components
//             this.currentComponentID = 0;

//             if (this.components != null)
//                 this.focus(true)
//         }

//         public makeComponentActive(componentID: number, hideOthers: boolean) {
//             this.currentComponentID = componentID;
//             this.focus(hideOthers);
//         }

//         public updateComponentsContext(componentID: number, context: any[]) {
//             this.components[componentID].addContext(context)
//         }

//         /* override */ startup() {
//             super.startup()
//         }

//         private focus(hideOthers: boolean) {
//             if (hideOthers)
//                 this.components.forEach(component => { component.hide() })
//             this.components.forEach(component => { component.unmakeActive() })

//             this.components[this.currentComponentID].unHide()
//             this.components[this.currentComponentID].makeActive()
//         }

//         draw() {
//             screen().fillRect(
//                 0,
//                 0,
//                 screen().width,
//                 screen().height,
//                 this.backgroundColor
//             )

//             if (this.components != null) {
//                 this.components.forEach(component => {
//                     if (!component.hidden && !component.active)
//                         component.draw()
//                 })
//             }

//             // Always draw active ontop
//             this.components[this.currentComponentID].draw()
//         }
//     }


//     const txtBtnComp = new TextButtonCollection({
//         alignment: GUIComponentAlignment.CENTRE,
//         isActive: true,
//         textBtns: [
//             new TextButton({ text: "Text Btn 1", callback: () => basic.showString("hi") }),
//             new TextButton({ text: "Text Btn 2", callback: () => basic.showString("yo") })
//         ],
//         xOffset: 10,
//         title: "Title :)"
//     })

//     const txtBtnComp2 = new TextButtonCollection({
//         alignment: GUIComponentAlignment.TOP,
//         isActive: false,
//         textBtns: [
//             new TextButton({ text: "Text Btn 3", callback: () => basic.showString("A") }),
//             new TextButton({ text: "Text Btn 4", callback: () => basic.showString("b") })
//         ],
//         xOffset: 10,
//         title: "Title :("
//     })

//     const window = new Test(app, [txtBtnComp])
//     app.pushScene(window)

//     input.onButtonPressed(Button.A, function() {
//         const window2 = new Test(app, [txtBtnComp2])

//         app.popScene()
//         app.pushScene(window2)
//     })
// }
