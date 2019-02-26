/**
 * powered by 波比小金刚 at 2018-05-07 16:41:38
 * last modified by 波比小金刚 at 2018-05-07 16:41:38
 * @Description: 侧边栏菜单数据
 */
export const menuData = [
    {
        name: '数据看板',
        icon: 'appstore',
        path: '/',
        authority: 'map',
        hideInMenu: false,
        children: [],
    },
  {
    name: '实时访问地图',
    icon: 'dot-chart',
    path: '/map',
    authority: 'admin',
    hideInMenu: false,
    outter:true,
  }
]
