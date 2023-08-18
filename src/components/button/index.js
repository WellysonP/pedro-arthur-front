import "../../assets/css/button/index.css";

const Button = ({ className, onClick, children }) => {
  return (
    <button style={{ color: "black" }} className={className} onClick={onClick} >{children}</button>
  );
};

export default Button;