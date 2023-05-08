const getImagePath = (name) => {
    const glob = import.meta.glob('~/assets/src/img/*', {eager: true})
    const getImageAbsolutePath = imageName => glob[`/assets/src/img/${imageName}`]['default']
    return getImageAbsolutePath(name)
}
const getImageGlob = () => {
    return import.meta.glob('~/assets/src/img/*', {eager: true})
}
const getAudioPath = (name) => {
    const glob = import.meta.glob('~/assets/src/audio/*', {eager: true})
    const getImageAbsolutePath = imageName => glob[`/assets/src/audio/${imageName}`]['default']
    return getImageAbsolutePath(name)
}
const getVideoPath = (name) => {
    const glob = import.meta.glob('~/assets/src/video/*', {eager: true})
    const getImageAbsolutePath = imageName => glob[`/assets/src/video/${imageName}`]['default']
    return getImageAbsolutePath(name)
}

export {getImagePath, getImageGlob, getAudioPath, getVideoPath}