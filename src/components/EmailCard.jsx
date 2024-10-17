import { EmailAvatar } from "../templates/emailAvatar";
import { formattedDate } from "../utils";

export const EmailCard = ({ email }) => {
  return (
    <div className="flex gap-5 justify-start border-2 px-5 py-3 w-100 rounded-lg bg-white cursor-pointer">
      {email?.from?.name && (
        <EmailAvatar letter={email?.from?.name?.slice(0, 1)} />
      )}

      <div className="flex flex-col gap-2 justify-start">
        <p className="m-0 text-[16px]">
          From:{" "}
          <span className="font-semibold">
            <span className="capitalize">{email?.from?.name}</span>{" "}
            {`<${email?.from?.email}>`}
          </span>
        </p>
        <p className="m-0 text-[16px]">
          Subject: <span className="font-semibold">{email?.subject}</span>
        </p>
        <p className="m-0 text-[16px]">{email?.short_description}</p>
        <div className="flex gap-10 items-center">
          <p className="m-0 text-[16px]">{formattedDate(email?.date)}</p>{" "}
          <span className="text-red-600 font-semibold text-[16px]">
            Favourite
          </span>
        </div>
      </div>
    </div>
  );
};
