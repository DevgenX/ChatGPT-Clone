const Sidebar = ({ handleCreateChat, uniqueTitles, handleClick }) => {
  return (
    <div>
      <section className="side-bar">
        <button onClick={handleCreateChat}>+ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((titles, index) => (
            <li onClick={() => handleClick(titles)} key={index}>
              {titles}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made by DevGenX</p>
        </nav>
      </section>
    </div>
  );
};
export default Sidebar;
