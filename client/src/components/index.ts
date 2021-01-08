import NonContent from './non-content.vue'
import AlertMessage from './alert-message.vue'

const components = [
  {key: 'NonContent', component: NonContent},
  {key: 'AlertMessage', component: AlertMessage}
]

export default (vue: any) => {
  components.forEach((component) => {
    vue.component(component.key, component.component)
  })
}