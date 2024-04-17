import { FC } from "react";
import { Select, SelectProps } from "../Select";

interface SelectWithSearchProps extends SelectProps {}
 
export const SelectWithSearch: FC<SelectWithSearchProps> = (props) => {
  const { ...rest } = props;

	return (
		<Select {...rest} value={undefined}/>
	);
};