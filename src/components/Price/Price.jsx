import { useStore } from '../../store';

const Price = () => {
  const variantOption = useStore((state) => state.variantOption);
  const { price, salePrice } = variantOption;
  return (
    <div className="flex gap-2">
      <h2 className="text-xl ">{`S/. ${salePrice || price}`}</h2>
      <h2 className="text-base text-gray-500 line-through"> {salePrice ? `S/. ${price}` : ''}</h2>{' '}
    </div>
  );
};

export default Price;
