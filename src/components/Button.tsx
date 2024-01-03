import React from "react";

export const Button = (props: any) => {
  const onclickButton = (e: any) => {
    props.onclickButton(e);
  }

  return (
    <button
      onClick={onclickButton}
      id="button"
      data-testid="button"
      className={props.className}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};
