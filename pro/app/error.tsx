'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'

type Props = {
    error: Error
    reset: () => void
}

export default function Error({ error, reset }: Props) {
    return <ErrorMessage />
}