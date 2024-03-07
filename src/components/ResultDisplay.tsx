import "../styles/resultDisplay.css"

import { useAppSelector } from "../app/hooks"
import { selectResult } from "../features/calculate/calculateSlice"

export function ResultDisplay() {
  const result = useAppSelector(selectResult)

  return <div id="display">{result}</div>
}
