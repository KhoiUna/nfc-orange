import jobTools from "./jobTools"
import JobToolCard from "./components/JobToolCard"
import Popup from "./components/Popup";

export default function Page() {
    return (
        <>
            <div className="py-8 flex flex-wrap justify-center items-center">
                {/* @ts-ignore*/}
                {jobTools.map((item, index) => <JobToolCard key={index} jobItem={item} />)}
            </div>

            <Popup />
        </>
    )
}

