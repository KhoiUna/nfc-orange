import { Link } from '@/types/types'
import axios from 'axios'
import { load } from 'cheerio'

type Params = {
    firstName: string
    middleName: string | null
    lastName: string
    viewURL: string
    bio: string | null
    avatarURL: string
    links: Link[]
    phoneNumber?: string
}

export default async function generateVcardContent(params: Params) {
    const { firstName, middleName, lastName, viewURL, bio, avatarURL, phoneNumber, links } = params

    return `
BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName + ' ' + `${middleName || ''}` + lastName}
PHOTO;ENCODING=b;TYPE=JPEG:${await generateBase64FromImageUrl(avatarURL)}
TITLE:${stripBio(bio || '')}
${phoneNumber ? `TEL;type=CELL,VOICE:${phoneNumber}` : ''}

item1.URL:${viewURL}?utm_source=vcard
item1.X-ABLabel:NFC Orange Profile
END: VCARD
`
}

async function generateBase64FromImageUrl(imageUrl: string): Promise<string> {
    try {
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
        });

        const imageBuffer = Buffer.from(response.data, 'binary');
        const base64String = imageBuffer.toString('base64');

        return base64String;
    } catch (error) {
        console.error('Error generating base64 string');
        throw error;
    }
}

function stripBio(html: string): string {
    const $ = load(html);
    const string = $.text();

    const strippedBio = string.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ' '
    )

    return strippedBio;
}

function appendCustomVcardLinks(links: Link[]): string {
    let string = ''

    // Start from item2 since item1 already exists
    let counter = 2

    links.forEach(link => {
        string += `
item${counter}.URL:${link.url}
item${counter}.X-ABLabel:${link.link_title}
        `
        counter++
    })

    return string
}