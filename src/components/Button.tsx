import "../styles/button.css"

interface ButtonProps {
  buttonType: string
  buttonId: string
  buttonIcon: string
  handleClick: (type: string, input: string) => void
}

export function Button(props: ButtonProps) {
  return (
    <button
      className={"calculator-button " + props.buttonType}
      id={props.buttonId}
      onClick={() => {
        props.handleClick(props.buttonType, props.buttonIcon)
      }}
    >
      {props.buttonIcon}
    </button>
  )
}
