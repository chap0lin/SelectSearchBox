import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SelectSearchBox, { SelectDataType } from "./index";
/**
 * Check se os dados estão sendo listados
 * Checar se ao clicar num item ele é selecionado
 * Checar se ao clicar em adicionar novo, a funcao é chamada
 */

const mockedData = [
  { id: 1, text: "Maria Rita", value: 1 },
  { id: 2, text: "Joao Costa", value: 2 },
  { id: 3, text: "Felipe Estumano", value: 3 },
];

test("should list data as options", async () => {
  render(
    <SelectSearchBox
      label="Teste"
      data={mockedData}
      onAddNew={(text) => null}
      onSearch={(text) => null}
      onChange={(value: SelectDataType) => null}
    />
  );
  fireEvent.focus(screen.getByRole("searchbox"));
  expect(await screen.findByText("Maria Rita")).toBeVisible();
  expect(await screen.findByText("Joao Costa")).toBeVisible();
  expect(await screen.findByText("Felipe Estumano")).toBeVisible();
});

test("should select an item when clicked", async () => {
  render(
    <SelectSearchBox
      label="Teste"
      data={mockedData}
      onAddNew={(text) => null}
      onSearch={(text) => null}
      onChange={(value: SelectDataType) => null}
    />
  );
  fireEvent.focus(screen.getByRole("searchbox"));
  fireEvent.click(screen.getByText("Maria Rita"));

  //@ts-ignore
  expect(screen.getByRole("searchbox").value).toBe("Maria Rita");
});

test("should call onAddNew when clicking in Adicionar novo", async () => {
  const mockedAddNew = jest.fn();
  render(
    <SelectSearchBox
      label="Teste"
      data={[]}
      onAddNew={mockedAddNew}
      onSearch={(text) => null}
      onChange={(value: SelectDataType) => null}
    />
  );
  await fireEvent.focus(screen.getByRole("searchbox"));
  await fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "Ricardo Freitas" },
  });
  await fireEvent.click(screen.getByText("Ricardo Freitas"));
  expect(mockedAddNew).toBeCalledWith("Ricardo Freitas");
});
