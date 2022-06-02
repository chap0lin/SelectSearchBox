import { useState } from "react";
import SelectSearchBox, { SelectDataType } from "./components/SelectSearchBox";
import "./assets/styles/global.css";
// import axios from 'axios';

function App() {
  const [rawData, setRawData] = useState<SelectDataType[]>([
    { id: 1, text: "Maria Rita" },
    { id: 2, text: "Joao Costa" },
    { id: 3, text: "Felipe Estumano" },
    { id: 4, text: "Joana Farias" },
    { id: 5, text: "Jorge Venancio" },
    { id: 6, text: "Olivia Rhye" },
    { id: 7, text: "Phoenix Baker" },
    { id: 8, text: "Lana Steiner" },
    { id: 9, text: "Demi Wilkinson" },
    { id: 10, text: "Candice Wu" },
    { id: 11, text: "Natali Craig" },
    { id: 12, text: "Drew Cano" },
  ]);
  const [data, setData] = useState<SelectDataType[]>(rawData);
  // useEffect(()=>{
  //   axios.get('http://localhost:3030/').then(response => {
  //     setData(response.data)
  //   })
  // },[])
  // function search(text: string){
  //   axios.get(`http://localhost:3030/search?search_field=${text}`).then(response =>{
  //     setData(response.data)
  //   })
  // }
  // function addNewItem(text: string){
  //   axios.post(`http://localhost:3030/new`, {text}).then(response => {
  //     setData(response.data)
  //   })
  // }

  function search(search_field: string) {
    const responseData = rawData.filter((item) => {
      return item.text.toLowerCase().search(search_field.toLowerCase()) != -1;
    });
    setData(responseData);
  }

  async function addNewItem(text: string) {
    let newData = rawData;
    await newData.push({
      id: rawData.length + 1,
      text,
    });
    setRawData(newData);
    setData(newData);
  }

  function onChange(value: SelectDataType) {
    console.log(value);
    /// Se você quiser o ID na hora que selecionar precisa adicionar o item antes!
    /// Basta descomentar o código abaixo: (e tirar a prop onAddNew do componente)
    // if(value.id === undefined){
    //   addNewItem(value.text)
    //   console.log(rawData.find((item: SelectDataType)=>item.text === value.text))
    // }
  }

  return (
    <div id="select-container">
      <h1>Caixa de entrada/seleção customizada</h1>
      <SelectSearchBox
        onSearch={search}
        data={data}
        label="Fornecedor"
        onAddNew={addNewItem}
        placeholder="Selecione um fornecedor"
        onChange={onChange}
        value={{ id: 10, text: "Candice Wu" }}
      />
    </div>
  );
}

export default App;
