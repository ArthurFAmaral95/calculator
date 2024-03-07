import { Button } from "./components/Button"
import { FormulaDisplay } from "./components/FormulaDisplay"
import { ResultDisplay } from "./components/ResultDisplay"

import "./styles/globals.css"

import { useAppDispatch, useAppSelector } from "./app/hooks"
import {
  calculate,
  clear,
  decimal,
  numberInput,
  operator,
  operatorConditions,
  selectFormula,
  selectOperatorCount,
  selectPrevDigitType,
  selectResult,
} from "./features/calculate/calculateSlice"

const App = () => {
  const calculatorButtons = [
    {
      buttonId: "clear",
      buttonIcon: "AC",
      buttonType: "clear",
    },
    {
      buttonId: "divide",
      buttonIcon: "/",
      buttonType: "operator",
    },
    {
      buttonId: "multiply",
      buttonIcon: "x",
      buttonType: "operator",
    },
    {
      buttonId: "seven",
      buttonIcon: "7",
      buttonType: "number",
    },
    {
      buttonId: "eight",
      buttonIcon: "8",
      buttonType: "number",
    },
    {
      buttonId: "nine",
      buttonIcon: "9",
      buttonType: "number",
    },
    {
      buttonId: "subtract",
      buttonIcon: "-",
      buttonType: "operator",
    },
    {
      buttonId: "four",
      buttonIcon: "4",
      buttonType: "number",
    },
    {
      buttonId: "five",
      buttonIcon: "5",
      buttonType: "number",
    },
    {
      buttonId: "six",
      buttonIcon: "6",
      buttonType: "number",
    },
    {
      buttonId: "add",
      buttonIcon: "+",
      buttonType: "operator",
    },
    {
      buttonId: "one",
      buttonIcon: "1",
      buttonType: "number",
    },
    {
      buttonId: "two",
      buttonIcon: "2",
      buttonType: "number",
    },
    {
      buttonId: "three",
      buttonIcon: "3",
      buttonType: "number",
    },
    {
      buttonId: "equals",
      buttonIcon: "=",
      buttonType: "equal",
    },
    {
      buttonId: "zero",
      buttonIcon: "0",
      buttonType: "number",
    },
    {
      buttonId: "decimal",
      buttonIcon: ".",
      buttonType: "decimal",
    },
  ]

  const formula = useAppSelector(selectFormula)
  const result = useAppSelector(selectResult)
  const operatorCount = useAppSelector(selectOperatorCount)
  const prevDigitType = useAppSelector(selectPrevDigitType)

  const dispatch = useAppDispatch()

  function handleClick(type: string, input: string) {
    switch (type) {
      case "clear":
        dispatch(clear())
        break
      case "operator":
        if (prevDigitType === "equal") {
          dispatch(operatorConditions(input, result + input, type, 1))
        } else if (operatorCount === 2) {
          const ajustedFormula =
            formula
              .split("")
              .splice(0, formula.length - 2)
              .join("") + input

          dispatch(operatorConditions(input, ajustedFormula, type, 1))
        } else {
          dispatch(operator(input, input, type, 1))
        }
        break
      case "equal":
        dispatch(calculate(formula, type))
        break

      case "decimal":
        if (result.includes(".")) {
          return
        } else {
          dispatch(decimal(input, input, type))
        }
        break
      default:
        if (result === "0") {
          dispatch(numberInput(input, 0, input, type))
        } else if (prevDigitType === "operator") {
          dispatch(numberInput(formula + input, 0, input, type))
        } else {
          dispatch(numberInput(formula + input, 0, result + input, type))
        }
    }
  }

  return (
    <div id="calculator">
      <div id="display-container">
        <FormulaDisplay />
        <ResultDisplay />
      </div>
      <div id="buttons-container">
        {calculatorButtons.map(button => {
          return (
            <Button
              buttonIcon={button.buttonIcon}
              buttonId={button.buttonId}
              buttonType={button.buttonType}
              key={button.buttonId}
              handleClick={handleClick}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
