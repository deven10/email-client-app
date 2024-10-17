import { EmailAvatar } from "../templates/EmailAvatar";
import { formattedDate } from "../utils";

export const EmailBody = ({ email }) => {
  return (
    <div className="flex gap-5 justify-start border-2 px-8 py-10 rounded-lg bg-white sticky top-7">
      {email?.name && <EmailAvatar letter={email?.name?.slice(0, 1)} />}

      <div className="flex flex-col gap-2 justify-start">
        <div className="flex justify-between items-center mb-4">
          <p className="m-0 text-[24px] text-black font-bold">{email?.name}</p>
          <button className="border-0 rounded-lg text-white bg-red-500 px-2 py-1">
            Mark as favourite
          </button>
        </div>
        <p className="m-0 text-[16px]">{formattedDate(email?.date)}</p>
        {/* <p className="m-0 text-[16px]">{email?.body}</p> */}
        <div dangerouslySetInnerHTML={{ __html: email?.body }} />
      </div>
    </div>
  );
};
