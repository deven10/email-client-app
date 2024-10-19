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
  const [filteredEmails, setFilteredEmails] = useState([]);

  const dispatch = useDispatch();
  const defaultAllEmails = useSelector((state) => state.allEmails);

  useEffect(() => {
    if (defaultAllEmails.allEmails.length > 0) {
      setAllEmails(defaultAllEmails.allEmails);
    } else {
      setAllEmails([]);
    }
  }, [defaultAllEmails]);

  const filterEmails = (emails, type) => {
    return emails.filter((email) => {
      if (type === "Read" && email.isRead) return true;
      if (type === "Unread" && !email.isRead) return true;
      if (type === "Favourites" && email.favourite) return true;

      return false;
    });
  };

  useEffect(() => {
    if (allEmails.length > 0) {
      const data = filterEmails(allEmails, filter);
      setFilteredEmails(data);
    }
  }, [allEmails, filter]);

  useEffect(() => {
    dispatch(fetchAllEmails());
  }, []);

  const handleFilter = (type) => {
    setFilter(type);
  };

  const handleEmailClick = async (email) => {
    try {
      const emailId = email.id;
      const url = `https://flipkart-email-mock.now.sh/?id=${emailId}`;
      const result = await axios.get(url, {
        "Content-Type": "application/json",
      });

      console.log("hehe: ", result);
      if (result.status === 200) {
        const emailSelected = allEmails.find((email) => email.id === emailId);
        const data = {
          id: emailId,
          date: email.date,
          name: email.from.name,
          body: DOMPurify.sanitize(result.data.body),
          favourite: Boolean(emailSelected.favourite),
        };
        setSelectedEmail(data);
        setAllEmails((prev) =>
          prev.map((email) =>
            email.id === emailId
              ? {
                  ...email,
                  isRead: true,
                }
              : email
          )
        );
      }
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const handleFavourite = (emailId) => {
    const updatedEmails = allEmails.map((email) =>
      email.id === emailId ? { ...email, favourite: !email.favourite } : email
    );
    setAllEmails(updatedEmails);
    setSelectedEmail({
      ...selectedEmail,
      favourite: !selectedEmail.favourite,
    });
  };

  return (
    <main className="py-10 px-20 flex flex-col gap-8 bg-[#F4F5F9] min-h-screen">
      <Filter handleFilter={handleFilter} filter={filter} />
      <div className="flex gap-5">
        <div
          className={`flex flex-col gap-5 ${
            selectedEmail ? "w-1/3" : "w-full"
          }`}
        >
          {filteredEmails.length > 0 ? (
            filteredEmails.map((email) => (
              <div key={email.id} onClick={() => handleEmailClick(email)}>
                <EmailCard email={email} selectedEmailId={selectedEmail?.id} />
              </div>
            ))
          ) : (
            <p className="m-0 text-[16px]">No Emails Found!</p>
          )}
        </div>
        {selectedEmail ? (
          <div className="w-2/3">
            <EmailBody
              email={selectedEmail}
              handleFavourite={handleFavourite}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default App;
