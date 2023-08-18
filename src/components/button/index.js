import "../../assets/css/button/index.css";

const Button = ({ className, onClick, children }) => {
  return (
    <button style={{ color: "black", fontFamily:"Gluten, cursive"}} className={className} onClick={onClick} >{children}</button>
  );
};

export default Button;