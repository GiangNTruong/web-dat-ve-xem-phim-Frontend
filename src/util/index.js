//abc

const convertMoney = (money) => {
  return money.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

 const formatDate = (date) => {
   let changeDate = new Date(date);
   return `${changeDate.getDate()}-${
     changeDate.getMonth() + 1
   }-${changeDate.getFullYear()}`;
 };

export {convertMoney, formatDate}