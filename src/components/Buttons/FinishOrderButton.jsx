const FinishOrderButton = ({ typeOfPayment }) => {
  // typeOfPayment : typeOfPayment.id

  const handleFinishOrder = () => {
    console.log(typeOfPayment.id);
  };
  return (
    <button className="p-3 text-white bg-black mt-4 w-full" onClick={handleFinishOrder}>
      Finalizar Pedido
    </button>
  );
};

export default FinishOrderButton;
