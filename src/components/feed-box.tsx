import { FC } from "react";

interface FeedBoxProps {
  title: string;
  filteredTitles: { role: string; content: string }[];
}

const FeedBox: FC<FeedBoxProps> = ({ title, filteredTitles }) => {
  return (
    <>
      {!title && <h1>Idiot GPT</h1>}
      <ul className="feed">
        {filteredTitles?.map((chats, index) => (
          <li key={index}>
            <p className="role">{chats.role}: </p>
            <p className="message">{chats.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
export default FeedBox;
