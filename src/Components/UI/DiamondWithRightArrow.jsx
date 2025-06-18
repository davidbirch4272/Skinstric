import { BiSolidRightArrow } from "react-icons/bi";

const DiamondWithRightArrow = () => {
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
      <BiSolidRightArrow
        style={{
            transform: "rotate(-130deg)", 
            fontSize: "10px",
            color: "black"
        }}
        />
    </div>   
  );
};

export default DiamondWithRightArrow;
