export default function Filter({ handleFilter, filter }) {
  const types = ["Unread", "Read", "Favourites"];
  return (
    <header className="flex gap-10 items-center">
      <p className="m-0 text-[20px] text-slate-800">Filter By:</p>
      <div className="flex gap-2 items-center">
        {types.map((type) => (
          <span
            key={type}
            onClick={() => handleFilter(type)}
            className={`${
              filter === type ? "bg-[#E1E4EA]" : ""
            } text-[18px] text-[#636363] font-normal font-sans cursor-pointer px-3 py-1 rounded-full`}
          >
            {type}
          </span>
        ))}
      </div>
    </header>
  );
}
