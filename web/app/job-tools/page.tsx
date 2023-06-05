import jobTools from "./jobTools"
import JobToolCard from "./components/JobToolCard"
import Popup from "./components/Popup";

export default function Page() {
    return (
        <>
            <h1 className="pt-7 pb-3 mx-3 text-3xl text-center font-bold">Job tools that power ⚡ your job search</h1>

            <div className="pb-8 flex flex-wrap justify-center items-center">
                {/* @ts-ignore*/}
                {jobTools.map((item, index) => <JobToolCard key={index} jobItem={item} />)}
            </div>

            <Popup />
        </>
    )
}

