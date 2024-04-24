"use client";

import classNames from "classnames";
import {
  ChangeEventHandler,
  FC,
  HTMLAttributes,
  forwardRef,
  useState,
} from "react";
import cls from "./Select.module.scss";
import { DropDown, DropdownItem } from "../DropDown/DropDown";
import { Input, InputProps } from "../Input/Input";

export interface SelectOption {
  label: string;
  key: string | number;
  value: string | number;
}

export interface SelectProps extends InputProps {
  options: SelectOption[];
  onSelectChange?: (option: SelectOption) => void;
}

export const Select = forwardRef<
  HTMLInputElement,
  SelectProps
>(function Select(props, ref) {
  const { className, options, onSelectChange, ...rest } = props;
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SelectOption["value"]>("");

  const onSelect = (option: SelectOption) => {
    setSelectedValue(option.label);
    onSelectChange?.(option);
  };

  const items: DropdownItem[] = options.map((option) => ({
    item: (
      <div
        key={option.key}
        className={classNames(cls.select_item, {
          [cls.selected_item]: selectedValue === option.label,
        })}
        onClick={() => onSelect(option)}
      >
        {option.label}
      </div>
    ),
    key: option.key,
  }));

  return (
    <DropDown
      items={items}
      mode="click"
      setShowItems={setShowOptions}
      showItems={showOptions}
    >
      <Input className={className} value={selectedValue} {...rest} ref={ref} />
    </DropDown>
  );
});
