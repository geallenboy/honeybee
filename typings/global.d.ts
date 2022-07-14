
// export {}
// import 'vue'
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Math {
  easeInOutQuad: any
}
interface Document{

}
interface Window {
  webkitRequestAnimationFrame:any,
  mozRequestAnimationFrame:any
}
// declare module '@vue/runtime-core' {

//   export interface ComponentCustomProperties {
//     $axios: any;
//   }
// }

