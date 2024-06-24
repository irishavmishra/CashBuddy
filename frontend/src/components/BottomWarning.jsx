import { Link } from "react-router-dom";

function BottomWarning({ lable, buttonText, to }) {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>{lable}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}

export default BottomWarning;
