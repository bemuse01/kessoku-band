const getImagePath = (name) => {
    const glob = import.meta.glob('~/assets/src/img/*', {eager: true})
    const getImageAbsolutePath = imageName => glob[`/assets/src/img/${imageName}`]['default']
    return getImageAbsolutePath(name)
}
const getImageGlob = () => {
    return import.meta.glob('~/assets/src/img/*', {eager: true})
}

export {getImagePath, getImageGlob}