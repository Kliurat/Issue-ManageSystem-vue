export default{
    path: '/home',
    component: ()=> import('@/views/Home'),
    children: [
        {
            path: '/home',
            redirect: '/home'
        }
    ]
}