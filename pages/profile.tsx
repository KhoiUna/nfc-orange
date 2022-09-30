import AppLayout from "../containers/AppLayout";
import { Icon } from "@iconify/react";
import { SyntheticEvent } from "react";

export default function Profile() {
  // TODO: upload to Firebase
  const handleUpload = async (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const fileArray = target.files!;
    const file = fileArray[0];

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const arrayBuffer = (event.target as FileReader).result;
      // TODO: change state
    };
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <AppLayout title="Profile">
      <button className="text-[1.8rem] bg-blue-100 rounded-lg p-3 flex drop-shadow-lg m-auto my-4 text-blue-800 active:drop-shadow-none">
        Upload your resume
        <Icon
          className="text-[2.4rem] ml-2"
          icon="ant-design:upload-outlined"
        />
        <input
          required
          className="absolute opacity-0 cursor-pointer"
          type="file"
          name="resume_upload"
          onChange={handleUpload}
        />
      </button>
    </AppLayout>
  );
}
