
import { createApp } from 'vue'
import Cookies from 'js-cookie'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn' 
import '@/assets/styles/index.scss' 
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import directive from '@/directive' 
import plugins from './plugins'
import { download } from '@/utils/request'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import elementIcons from '@/components/SvgIcon/svgicon'
import './permission' 
import { useDict } from '@/utils/dict'
import { addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/main'

import Pagination from '@/components/Pagination/index.vue'
import RightToolbar from '@/components/RightToolbar/index.vue'
import FileUpload from "@/components/FileUpload/index.vue"
import ImageUpload from "@/components/ImageUpload/index.vue"
import ImagePreview from "@/components/ImagePreview/index.vue"
import TreeSelect from '@/components/TreeSelect/index.vue'
import DictTag from '@/components/DictTag/index.vue'

const app = createApp(App)


// 全局方法挂载
app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

// 全局组件挂载
app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('TreeSelect', TreeSelect)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('ImagePreview', ImagePreview)
app.component('RightToolbar', RightToolbar)

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)

directive(app)

app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default'
})

app.mount('#app')
