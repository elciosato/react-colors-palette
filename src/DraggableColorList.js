import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = SortableContainer((props) => {
  const { colors, onClickDelete } = props;
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, index) => (
        <DraggableColorBox
          index={index}
          key={color.name}
          color={color.color}
          name={color.name}
          onClickDelete={onClickDelete}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
