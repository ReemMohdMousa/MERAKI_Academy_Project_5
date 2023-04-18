import "./style.css";


const Widget = ({ type }) => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">"data.title"</span>
        <span className="counter">
         "data.isMoney && amount"
        </span>
        <span className="link">"data.link"</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          "diff" %
        </div>
        "data.icon"
      </div>
    </div>
  );
};

export default Widget;
