export const EmailCard = () => {
  return (
    <div className="flex gap-5 justify-start border-2 px-5 py-3 rounded-lg bg-white cursor-pointer">
      <span className="bg-red-500 h-12 w-12 flex items-center justify-center rounded-full text-[24px] text-white">
        D
      </span>
      <div className="flex flex-col gap-2 justify-start">
        <p className="m-0 text-[16px]">
          From:{" "}
          <span className="font-semibold">
            Deven Umrania {`<deven@gmail.com>`}
          </span>
        </p>
        <p className="m-0 text-[16px]">
          Subject: <span className="font-semibold">Lorem Ipsum</span>
        </p>
        <p className="m-0 text-[16px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam ex
          nobis pariatur iusto eveniet porro voluptatem illum molestias,
          suscipit hic?
        </p>
        <div className="flex gap-10 items-center">
          <p className="m-0 text-[16px]">12/10/2024 10:30am</p>{" "}
          <span className="text-red-600 font-semibold text-[16px]">
            Favourite
          </span>
        </div>
      </div>
    </div>
  );
};
