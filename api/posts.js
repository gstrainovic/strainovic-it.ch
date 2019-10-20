import GhostContentAPI from '@tryghost/content-api'

// Create API instance with site credentials
const api = new GhostContentAPI({
    url: 'http://localhost:2368',
    key: '954917b23654aaf7b162523821',
    version: 'v2'
})

export async function getPosts() {
    return await api.posts
        .browse({
            limit: 'all'
        })
        .catch(err => {
            console.error(err)
        })
}