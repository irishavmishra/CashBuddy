const Balance = ({ value }) => {
  return (
    <div className="flex w-11/12 m-auto mt-10">
      <div className="font-bold text-lg"> Your balance </div>
      <div className="font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  );
};

export default Balance;
