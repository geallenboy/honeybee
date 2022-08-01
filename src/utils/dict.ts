import { getDicts } from '@/api/system/dict/data'
import { ref,toRefs } from 'vue';

/**
 * 获取字典数据
 */
export function useDict(...args: any[]) {
  const res:any = ref({});
  return (() => {
    args.forEach((d:string) => {
      res.value[d] = [];
      getDicts(d).then(resp => {
        res.value[d] = resp.data.map((p:any) => ({ label: p.dictLabel, value: p.dictValue, elTagType: p.listClass, elTagClass: p.cssClass }))
      })
    })
    return toRefs(res.value);
  })()
}
