import "../styles/formulaDisplay.css"

import { useAppSelector } from "../app/hooks"
import { selectFormula } from "../features/calculate/calculateSlice"

export function FormulaDisplay() {
  const formula = useAppSelector(selectFormula)

  return <div id="formula-display">{formula}</div>
}
