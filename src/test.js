import axios from "axios";
import { useEffect, useState } from "react";
function Test() {
  const [data, setData] = useState([]);
  const sheetID = "17WmAumFfDfk7PGuipE5KJiYmVEBs8MarhrRfSaTUc0Y";
  const tabName = "Database";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://opensheet.elk.sh/" + sheetID + "/" + tabName
      );
      //   setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

export default Test;
