import React, { useState, useRef } from "react";
import "./styles.css";
import ArrowIcon from "../../assets/img/arrow.png";
import CheckIcon from "../../assets/img/check.png";

export type SelectDataType = {
  id?: number;
  text: string;
};

interface SelectSearchBoxPropos {
  data: SelectDataType[];
  label?: string;
  name?: string;
  placeholder?: string;
  value?: SelectDataType | null;
  onChange: (value: SelectDataType) => void;
  onSearch: (text: string) => void;
  onAddNew?: (text: string) => void;
  labelStyle?: object;
  newTagText?: string;
}

const SelectSearchBox: React.FC<SelectSearchBoxPropos> = (props) => {
  const {
    label,
    placeholder,
    data,
    value,
    onChange,
    onSearch,
    onAddNew,
    labelStyle,
    newTagText,
  } = props;

  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState(value?.text || "");
  const ref = useRef([] as any);
  const inputRef = useRef(null);

  function hideOptions() {
    setTimeout(() => {
      let hasActiveItem = false;
      ref.current.forEach((item: HTMLElement) => {
        if (item === document.activeElement) {
          hasActiveItem = true;
        }
      });
      if (!hasActiveItem) setShowOptions(false);
    }, 200);
  }

  function hardCloseOptions() {
    setShowOptions(false);
  }

  function handleClickButton() {
    if (showOptions) {
      //@ts-ignore
      inputRef.current.blur();
    } else {
      //@ts-ignore
      inputRef.current.focus();
    }
  }

  function openOptions() {
    setShowOptions(true);
  }

  function onInputTextChange(text: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(text.target.value);
    onSearch(text.target.value);
  }

  function selectItem(item: SelectDataType) {
    setInputValue(item.text);
    onChange(item);
    hardCloseOptions();
  }

  function selectAddNew() {
    hardCloseOptions();
    onAddNew && onAddNew(inputValue);
    onChange({ id: undefined, text: inputValue });
  }

  return (
    <div id="select-block" className="select-block">
      <input
        role="searchbox"
        ref={inputRef}
        className="select-input"
        onFocus={openOptions}
        onBlur={hideOptions}
        placeholder={placeholder || ""}
        value={inputValue}
        onChange={onInputTextChange}
      ></input>
      <img
        className={showOptions ? "spin" : ""}
        src={ArrowIcon}
        unselectable="on"
        alt="ArrowIcon"
        onClick={handleClickButton}
      />

      <div className={label ? "above-text" : "above-text-hidden"}>
        <span style={{ ...labelStyle }}>{label}</span>
      </div>

      <ul
        role="list"
        className="select-options"
        style={{ display: showOptions ? "flex" : "none" }}
      >
        {data.length > 0 ? (
          data.map((item: SelectDataType, index: number) => (
            <li
              role="listitem"
              ref={(element) => (ref.current[index] = element)}
              onKeyDown={(e) => {
                if (e.key == "Enter" || e.key == " ") selectItem(item);
              }}
              key={index}
              tabIndex={0}
              onBlur={hideOptions}
              className="op"
              onClick={() => selectItem(item)}
            >
              <p>{item.text}</p>
              <div className={inputValue === item.text ? "checked" : "hidden"}>
                <img src={CheckIcon} alt="Check Icon" />
              </div>
            </li>
          ))
        ) : (
          <li
            role="listitem"
            ref={(element) => (ref.current[0] = element)}
            tabIndex={0}
            onBlur={hideOptions}
            className="op"
            onClick={selectAddNew}
            onKeyDown={(e) => {
              if (e.key == "Enter" || e.key == " ") selectAddNew();
            }}
          >
            <p>{inputValue}</p>
            <div className="add-new-tag">
              <span>{newTagText || "Adicionar novo"}</span>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SelectSearchBox;
