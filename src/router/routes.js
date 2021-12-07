import Layout from '@/views/layout';
export default [
    {
        path: '/',
        component: Layout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/pages/amap'),
                name: 'index',
                meta: {title: '首页', icon: ''}
            },
            {
                path: 'css3D',
                component: () => import('@/views/pages/css3D'),
                name: 'css3D',
                meta: {title: 'css3D', icon: ''}
            },
        ]
    },
]