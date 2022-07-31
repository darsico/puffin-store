import Image from 'next/image';

const ProductSingleImage = ({ item }) => {
  return (
    <div className="h-96 hover:cursor-pointer">
      <figure style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Image src={item} alt={`Foto de producto`} className="object-cover object-center w-full h-full rounded-lg " layout="fill" objectFit="contain" priority />
      </figure>
    </div>
  );
};

export default ProductSingleImage;
