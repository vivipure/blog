import { App, AppContext } from 'vue'
import loading from './loading'

export default {
    install(app: App) {
        app.directive('loading', loading)
    }
}