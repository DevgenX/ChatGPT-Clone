const FeedBox = ({ title, filteredTitles }) => {
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
