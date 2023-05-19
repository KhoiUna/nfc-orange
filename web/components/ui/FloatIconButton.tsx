type Props = {
    children: React.ReactNode
    onClick: (event: React.SyntheticEvent) => void
}

export default function FloatIconButton(props: Props) {
    const { children, onClick } = props

    return (
        <>
            <button
                className="bg-primary rounded-[100%] w-14 h-14 fixed right-2 bottom-2 drop-shadow-lg flex justify-center items-center"
                onClick={(event) => onClick(event)}
            >
                {children}
            </button>

            <div className="pb-14" />
        </>
    )
}