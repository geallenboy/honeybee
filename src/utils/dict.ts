import { useState } from 'react';
import { getDicts } from '@/api/system/dict/data';

/**
 * 获取字典数据
 */
export function useDict(...args: any[]) {
  const [res, setRes] = useState<any>({});
  return (() => {
    args.forEach((d: string) => {
      getDicts(d).then((resp) => {
        setRes(
          resp.data.map((p: any) => ({
            label: p.dictLabel,
            value: p.dictValue,
            elTagType: p.listClass,
            elTagClass: p.cssClass
          }))
        );
      });
    });
    return res;
  })();
}
