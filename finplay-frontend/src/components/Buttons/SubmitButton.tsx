import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import Context from "../../context";
import { FormButtonType } from "../../utils/enums/components";
import { IDiv } from "../../utils/interfaces/components";
import classes from "./SubmitButton.module.css";

interface SubmitButtonProps extends IDiv {
  name: string;
  type: FormButtonType;
}

const SubmitButton: FC<SubmitButtonProps> = ({ name, type, divClass }) => {
  const { store } = useContext(Context);

  return (
    <button
      className={classNames(
        divClass,
        classes.submit,
        classes[`submit_${type}`],
      )}
      type="submit"
    >
      <div className={classes.submit__text}>
        {store.loading ? <div className={classes.submit__loader}></div> : name}
      </div>
    </button>
  );
};

export default observer(SubmitButton);
