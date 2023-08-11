import "../../assets/css/button/index.css";

const Button = ({ className, children }) => {
  return (
      <button className={className}>{children}</button>
  );
};

export default Button;