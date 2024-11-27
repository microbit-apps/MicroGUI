
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
            super(app, "window")

            if (opts.colour != null)
                this.backgroundColor = opts.colour

            this.components = opts.components
            this.currentComponentID = 0

            if (this.components != null && opts.hideByDefault)
                this.focus(this.currentComponentID)
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

        startup() {
            super.startup()
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
        }
    }