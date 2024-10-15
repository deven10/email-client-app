import { useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import { EmailCard } from "./components/EmailCard";
import { EmailBody } from "./components/EmailBody";

function App() {
  const [filter, setFilter] = useState("Unread");
  const handleFilter = (type) => {
    setFilter(type);
  };

  return (
    <main className="my-10 mx-20 flex flex-col gap-8">
      <Filter handleFilter={handleFilter} filter={filter} />
      <div className="flex gap-5">
        <div className="flex flex-col gap-5 w-1/3">
          <EmailCard />
          <EmailCard />
          <EmailCard />
          <EmailCard />
          <EmailCard />
        </div>
        <div className="w-2/3">
          <EmailBody />
        </div>
      </div>
    </main>
  );
}

export default App;
