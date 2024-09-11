import { IColor } from '@/states/interface';
import { Button } from './ui/button';

export interface IColorPicker {
  colors: IColor[];
  setColors: any;
  availableColors: IColor[];
  setAvailableColors: any;
  setDeletedColors?: any;
  deletedColors?: IColor[];
}

const ColorPicker = ({
  colors,
  setColors,
  availableColors,
  setDeletedColors,
  deletedColors = [],
}: IColorPicker) => {
  // const [selectedColor, setSelectedColors] = useState<IColor[]>([]);
  const handleColorChange = (color: IColor) => {
    setColors((prevColors: IColor[]) => {
      const isColorExists = prevColors.some((col) => col.name === color.name);
      if (isColorExists) {
        if (!!setDeletedColors) {
          setDeletedColors((prevColors: IColor[]) => {
            if (prevColors.some((col) => col.name === color.name)) {
              return prevColors;
            }
            return [...prevColors, { ...color }];
          });
        }

        return prevColors.filter((col) => col.name !== color.name);
      }
      if (deletedColors.length > 0) {
        const isSelectedColorIsExistsOnDeletedColors = deletedColors.some(
          (col) => col.name === color.name
        );
        if (isSelectedColorIsExistsOnDeletedColors) {
          setDeletedColors((prevColors: IColor[]) => {
            return prevColors.filter((col) => col.name !== color.name);
          });
        }
      }
      return [...prevColors, { ...color }];
    });
  };

  return (
    <div className="mb-4 flex flex-col gap-1">
      <header className="flex justify-between items-center relative">
        <h1 className="block text-sm font-medium text-gray-600">
          Select Colors
        </h1>
      </header>

      {availableColors.length > 0 ? (
        <div className="grid grid-cols-5 gap-2">
          {availableColors?.map((color: IColor) => (
            <Button
              key={color.id}
              onClick={() => handleColorChange(color)}
              className={`px-4 py-2 rounded-lg text-sm border ${
                colors.some((col) => col.name === color.name)
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-teal-500 border-teal-500'
              } hover:bg-teal-600 hover:text-white`}
              type="button"
            >
              {color.name}
            </Button>
          ))}
        </div>
      ) : (
        <h1>Warna tidak tersedia / box sudah memiliki seluruh warna</h1>
      )}
    </div>
  );
};

export default ColorPicker;
