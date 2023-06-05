import Script from "next/script";

export default function ServiceWorker() {
    return <Script
        id="service-worker"
        dangerouslySetInnerHTML={{
            __html: `if (typeof navigator.serviceWorker !== 'undefined') {
                navigator.serviceWorker.register('sw.js')
            }`
        }} />

}