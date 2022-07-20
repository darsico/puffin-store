import { useStore } from '../../store';

const Options = ({ variants }) => {
  const setVariantOption = useStore((state) => state.setVariantOption);

  return (
    <div className="flex h-fit w-fit gap-2">
      <h5>Opciones:</h5>
      {variants.map((item, index) => {
        const { id } = item;
        return (
          <button key={index} onClick={() => setVariantOption(id)} title={id}>
            <figure className="w-7 h-7">
              <img src={item.textureImage} className="object-cover object-center w-full h-full rounded-full" />
            </figure>
          </button>
        );
      })}
    </div>
  );
};

export default Options;
