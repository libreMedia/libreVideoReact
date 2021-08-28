const fetchy = async (address:string) => {
    let res = await fetch(address);
    let data = await res.json();
    return data;
  };

  export default fetchy