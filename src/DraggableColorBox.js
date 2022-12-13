import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableElement } from "react-sortable-hoc";
import styles from "./styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement((props) => {
  const { classes, color, name, onClickDelete } = props;

  function clickDeleteHandler() {
    onClickDelete(name);
  }
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={clickDeleteHandler}
        />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
