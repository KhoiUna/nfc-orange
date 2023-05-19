const TRANSFORM_CONFIG = '?tr=w-120,r-max'

export default function imagekitTransform(imageURL: string | null) {
    return imageURL ? imageURL + TRANSFORM_CONFIG : ''
}