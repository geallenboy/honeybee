import { defineModel } from 'foca';

interface tagsViewProps {
  visitedViews: any[];
  cachedViews: any[];
}

const initialState: tagsViewProps = {
  visitedViews: [],
  cachedViews: []
};

export const tagsViewModel = defineModel('tagsView', {
  initialState,
  actions: {
    addVisitedView(state, view: any) {
      if (state.visitedViews.some((v: any) => v.path === view.path)) return;
      state.visitedViews.push({ ...view, title: view.meta.title || 'no-name' });
    },
    addCachedView(state, view: any) {
      if (state.cachedViews.includes(view.name)) return;
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    }
  },
  effects: {
    delView(view: any) {
      return new Promise((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        resolve({
          visitedViews: [...this.state.visitedViews],
          cachedViews: [...this.state.cachedViews]
        });
      });
    },
    delVisitedView(view: any) {
      return new Promise((resolve) => {
        for (const [i, v] of this.state.visitedViews.entries()) {
          if (v.path === view.path) {
            this.state.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...this.state.visitedViews]);
      });
    },
    delCachedView(view: any) {
      return new Promise((resolve) => {
        const index = this.state.cachedViews.indexOf(view.name);
        index > -1 && this.state.cachedViews.splice(index, 1);
        resolve([...this.state.cachedViews]);
      });
    },
    delOthersViews(view: any) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view);
        this.delOthersCachedViews(view);
        resolve({
          visitedViews: [...this.state.visitedViews],
          cachedViews: [...this.state.cachedViews]
        });
      });
    },
    delOthersVisitedViews(view: any) {
      return new Promise((resolve) => {
        this.state.visitedViews = this.state.visitedViews.filter((v: any) => {
          return v.meta.affix || v.path === view.path;
        });
        resolve([...this.state.visitedViews]);
      });
    },
    delOthersCachedViews(view: any) {
      return new Promise((resolve) => {
        const index = this.state.cachedViews.indexOf(view.name);
        if (index > -1) {
          this.state.cachedViews = this.state.cachedViews.slice(index, index + 1);
        } else {
          this.state.cachedViews = [];
        }
        resolve([...this.state.cachedViews]);
      });
    },
    delAllViews(view: any) {
      return new Promise((resolve) => {
        this.delAllVisitedViews(view);
        this.delAllCachedViews(view);
        resolve({
          visitedViews: [...this.state.visitedViews],
          cachedViews: [...this.state.cachedViews]
        });
      });
    },
    delAllVisitedViews(view: any) {
      return new Promise((resolve) => {
        const affixTags = this.state.visitedViews.filter((tag: any) => tag.meta.affix);
        this.state.visitedViews = affixTags;
        resolve([...this.state.visitedViews]);
      });
    },
    delAllCachedViews(view: any) {
      return new Promise((resolve) => {
        this.state.cachedViews = [];
        resolve([...this.state.cachedViews]);
      });
    },
    updateVisitedView(view: any) {
      for (let v of this.state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
    delRightTags(view: any) {
      return new Promise((resolve) => {
        const index = this.state.visitedViews.findIndex((v: any) => v.path === view.path);
        if (index === -1) {
          return;
        }
        this.state.visitedViews = this.state.visitedViews.filter(
          (item: { meta: { affix: any }; name: any }, idx: number) => {
            if (idx <= index || (item.meta && item.meta.affix)) {
              return true;
            }
            const i = this.state.cachedViews.indexOf(item.name);
            if (i > -1) {
              this.state.cachedViews.splice(i, 1);
            }
            return false;
          }
        );
        resolve([...this.state.visitedViews]);
      });
    },
    delLeftTags(view: any) {
      return new Promise((resolve) => {
        const index = this.state.visitedViews.findIndex((v: any) => v.path === view.path);
        if (index === -1) {
          return;
        }
        this.state.visitedViews = this.state.visitedViews.filter(
          (item: { meta: { affix: any }; name: any }, idx: number) => {
            if (idx >= index || (item.meta && item.meta.affix)) {
              return true;
            }
            const i = this.state.cachedViews.indexOf(item.name);
            if (i > -1) {
              this.state.cachedViews.splice(i, 1);
            }
            return false;
          }
        );
        resolve([...this.state.visitedViews]);
      });
    }
  }
});
