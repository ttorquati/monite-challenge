export type Unit = {
  id?: string;
  title: string;
}

export type UnitInputValue = {
  inputValue?: string;
} & Unit 