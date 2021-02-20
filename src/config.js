const animals = [
    'https://images.unsplash.com/photo-1584389839701-ddcd904f0546?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Njl8fGdvYXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1493916665398-143bdeabe500?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWFsc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1517423738875-5ce310acd3da?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGZ1bm55JTIwZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGZ1bm55JTIwZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1552944150-6dd1180e5999?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGZ1bm55JTIwY2F0c3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
]


// available test users  username: "dev-user-1" || 'dev-user-2' || "dev-user-3", 
// BRANDON_ADMIN has all the friends
// dev-user-2
const config = {
    environment: process.env.NODE_ENV,
    devUser: {
        photoURL:
          "https://images.unsplash.com/photo-1584389839701-ddcd904f0546?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Njl8fGdvYXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        username: "dev-user-1",
        status: "Online",
    },
    node_api_base_url: "http://localhost:3003/api",
    node_api_root: "http://localhost:3003"

}
export default config;