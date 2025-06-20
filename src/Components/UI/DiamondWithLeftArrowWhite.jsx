import { BiSolidLeftArrow } from "react-icons/bi";

const DiamondWithLeftArrow = () => {
  return (
       <div style={{
        width: "32px",
        height: "32px",
        transform: "rotate(90deg)", 
        border: "solid 1px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
      <BiSolidLeftArrow
        style={{
            transform: "rotate(-130deg)", 
            fontSize: "10px",
            color: "white"
        }}
        />
    </div>   
  );
};

export default DiamondWithLeftArrow;
