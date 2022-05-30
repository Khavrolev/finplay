import { FC, useContext } from "react";
import Button from "./Button";
import Context from "../../context";
import { LoaderButtonProps } from "../../utils/interfaces/components";

const LoaderButton: FC<LoaderButtonProps> = (props) => {
  const { store } = useContext(Context);

  return <Button {...props} loading={store.loading} />;
};
export default LoaderButton;
