import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

import { create, all } from "mathjs"

const math = create(all)

interface CalculatorStates {
  formula: string
  result: string
  prevDigitType: string
  operatorCount: number
}

const initialState: CalculatorStates = {
  formula: "",
  result: "0",
  prevDigitType: "",
  operatorCount: 0,
}

export const calculateSlice = createSlice({
  name: "calculateOperations",
  initialState,
  reducers: {
    clear: state => {
      state.formula = ""
      state.operatorCount = 0
      state.prevDigitType = ""
      state.result = "0"
    },
    calculate: {
      reducer(state, action: PayloadAction<CalculatorStates>) {
        state.result = action.payload.result
        state.formula = action.payload.formula
        state.operatorCount = action.payload.operatorCount
        state.prevDigitType = action.payload.prevDigitType
      },
      prepare(formula: string, prevDigitType: string) {
        const regex = /x/g
        const ajustedFormula = formula.replace(regex, "*")

        const result = String(
          parseFloat(math.evaluate(ajustedFormula).toFixed(4)),
        )

        return {
          payload: {
            result: result,
            formula: formula + "=" + result,
            prevDigitType,
            operatorCount: 0,
          },
        }
      },
    },
    decimal: {
      reducer(
        state,
        action: PayloadAction<{
          result: string
          formula: string
          prevDigitType: string
        }>,
      ) {
        state.result = state.result + action.payload.result
        state.formula = state.formula + action.payload.formula
        state.prevDigitType = action.payload.prevDigitType
      },
      prepare(result: string, formula: string, prevDigitType: string) {
        return {
          payload: {
            result,
            formula,
            prevDigitType,
          },
        }
      },
    },
    operator: {
      reducer(state, action: PayloadAction<CalculatorStates>) {
        state.result = action.payload.result
        state.formula = state.formula + action.payload.formula
        state.prevDigitType = action.payload.prevDigitType
        state.operatorCount = state.operatorCount + action.payload.operatorCount
      },
      prepare(
        result: string,
        formula: string,
        prevDigitType: string,
        operatorCount: number,
      ) {
        return {
          payload: {
            result,
            formula,
            prevDigitType,
            operatorCount,
          },
        }
      },
    },
    operatorConditions: {
      reducer(state, action: PayloadAction<CalculatorStates>) {
        state.result = action.payload.result
        state.formula = action.payload.formula
        state.prevDigitType = action.payload.prevDigitType
        state.operatorCount = action.payload.operatorCount
      },
      prepare(
        result: string,
        formula: string,
        prevDigitType: string,
        operatorCount: number,
      ) {
        return {
          payload: {
            result,
            formula,
            prevDigitType,
            operatorCount,
          },
        }
      },
    },
    numberInput: {
      reducer(state, action: PayloadAction<CalculatorStates>) {
        state.formula = action.payload.formula
        state.operatorCount = action.payload.operatorCount
        state.prevDigitType = action.payload.prevDigitType
        state.result = action.payload.result
      },
      prepare(
        formula: string,
        operatorCount: number,
        result: string,
        prevDigitType: string,
      ) {
        return {
          payload: {
            formula,
            operatorCount,
            result,
            prevDigitType,
          },
        }
      },
    },
  },
})

export const {
  clear,
  calculate,
  decimal,
  operator,
  operatorConditions,
  numberInput,
} = calculateSlice.actions

export const selectFormula = (state: RootState) => {
  return state.calculations.formula
}
export const selectResult = (state: RootState) => {
  return state.calculations.result
}

export const selectPrevDigitType = (state: RootState) => {
  return state.calculations.prevDigitType
}

export const selectOperatorCount = (state: RootState) => {
  return state.calculations.operatorCount
}

export default calculateSlice.reducer
