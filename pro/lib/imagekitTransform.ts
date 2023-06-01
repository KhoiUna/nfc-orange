const TRANSFORM_CONFIG = '?tr=r-max'

export default function imagekitTransform(imageURL: string | null) {
    return imageURL ? imageURL + TRANSFORM_CONFIG : ''
}