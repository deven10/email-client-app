import { EmailAvatar } from "../templates/EmailAvatar";
import { formattedDate } from "../utils";

export const EmailCard = ({ email, selectedEmailId }) => {
  return (
    <div
      className={`flex gap-5 justify-start border-[1px] ${
        selectedEmailId === email.id ? "border-[#E54065]" : "border-[#CFD2DC]"
      }  px-5 py-3 w-100 rounded-lg cursor-pointer ${
        email.isRead ? "bg-[#F2F2F2]" : "bg-white"
      }`}
    >
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
          {email.favourite ? (
            <span className="text-[#E54065] font-semibold text-[16px]">
              Favourite
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
