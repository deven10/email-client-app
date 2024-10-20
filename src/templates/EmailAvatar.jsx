export const EmailAvatar = ({ letter }) => {
  return (
    <div>
      <span className="flex items-center justify-center rounded-full h-12 w-12 text-[24px] text-white capitalize bg-[#E54065]">
        {letter}
      </span>
    </div>
  );
};
