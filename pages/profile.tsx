import AppLayout from "../containers/AppLayout";
import { Icon } from "@iconify/react";

export default function Profile() {
  // TODO: upload to Firebase

  return (
    <AppLayout title="Profile">
      <button className="text-[1.8rem] bg-blue-100 rounded-lg p-3 flex drop-shadow-lg m-auto my-4 text-blue-800 active:drop-shadow-none">
        Upload your resume
        <Icon
          className="text-[2.4rem] ml-2"
          icon="ant-design:upload-outlined"
        />
      </button>
    </AppLayout>
  );
}
