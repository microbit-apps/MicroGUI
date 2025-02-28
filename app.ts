namespace microgui {
    import Scene = user_interface_base.Scene
    import SceneManager = user_interface_base.SceneManager

    // Auto-save slot
    export const SAVESLOT_AUTO = "sa"

    export interface SavedState {
        progdef: any
        version?: string
    }

    // application configuration
    user_interface_base.getIcon = (id) => user_interface_base.icons.get(id)
    user_interface_base.resolveTooltip = (ariaId: string) => ariaId

    export class App {
        private sceneManager: SceneManager

        constructor() {
            // One interval delay to ensure all static constructors have executed.
            basic.pause(10)

            this.sceneManager = new SceneManager()
        }

        public pushScene(scene: Scene) {
            this.sceneManager.pushScene(scene)
        }

        public popScene() {
            this.sceneManager.popScene()
        }

        public save(slot: string, buffer: Buffer): boolean {
            return true;
        }

        public load(slot: string): Buffer {
            return Buffer.create(0)
        }
    }
}
