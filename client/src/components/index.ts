import NonContent from './non-content.vue'

const components = [
  {key: 'NonContent', component: NonContent}
]

export default (vue: any) => {
  components.forEach((component) => {
    vue.component(component.key, component.component)
  })
}