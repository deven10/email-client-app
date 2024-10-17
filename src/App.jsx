import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import { EmailCard } from "./components/EmailCard";
import { EmailBody } from "./components/EmailBody";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmails } from "./store/features/allEmailsSlice";
import axios from "axios";
import DOMPurify from "dompurify";

function App() {
  const [filter, setFilter] = useState("Unread");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [allEmails, setAllEmails] = useState([]);

  const handleFilter = (type) => {
    setFilter(type);
  };

  const dispatch = useDispatch();
  const defaultAllEmails = useSelector((state) => state.allEmails);

  useEffect(() => {
    console.log("defaultAllEmails: ", defaultAllEmails);
    if (defaultAllEmails.allEmails.length > 0) {
      setAllEmails(defaultAllEmails.allEmails);
    } else {
      setAllEmails([]);
    }
  }, [defaultAllEmails]);

  useEffect(() => {
    console.log("selectedEmail: ", selectedEmail);
  }, [selectedEmail]);

  useEffect(() => {
    dispatch(fetchAllEmails());
  }, []);

  const handleEmailClick = async (email) => {
    try {
      const url = `https://flipkart-email-mock.now.sh/?id=${email.id}`;
      const result = await axios.get(url, {
        "Content-Type": "application/json",
      });

      console.log("hehe: ", result);
      if (result.status === 200) {
        const data = {
          id: email.id,
          date: email.date,
          name: email.from.name,
          body: DOMPurify.sanitize(result.data.body),
        };
        setSelectedEmail(data);
      }
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <main className="my-10 mx-20 flex flex-col gap-8">
      <Filter handleFilter={handleFilter} filter={filter} />
      <div className="flex gap-5">
        <div
          className={`flex flex-col gap-5 ${
            selectedEmail ? "w-1/3" : "w-full"
          }`}
        >
          {allEmails.length > 0 ? (
            allEmails.map((email) => (
              <div key={email.id} onClick={() => handleEmailClick(email)}>
                <EmailCard email={email} />
              </div>
            ))
          ) : (
            <p className="m-0 text-[16px]">No Emails Found!</p>
          )}
        </div>
        {selectedEmail ? (
          <div className="w-2/3">
            <EmailBody email={selectedEmail} />
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default App;
