import { IDecoration } from '@/states/interface';
import { Button } from './ui/button';

export interface IColorPicker {
  decorations: IDecoration[];
  setDecorations: any;
  availableDecorations: IDecoration[];
  setAvailableDecorations: any;
  deletedDecoration?: IDecoration[];
  setDeletedDecoration?: any;
}

const DecorationSelector = ({
  decorations,
  setDecorations,
  availableDecorations,
  setDeletedDecoration,
  deletedDecoration = [],
}: IColorPicker) => {
  const handleDecorationChange = (decoration: IDecoration) => {
    console.log({ decoration });
    const isDecorationExists = decorations.some(
      (decor: IDecoration) => decor.name === decoration.name
    );
    if (!isDecorationExists) {
      if (deletedDecoration.length > 0 || setDeletedDecoration) {
        const isPickedColorExistsOnDeletedDecoration = deletedDecoration.some(
          (decor: IDecoration) => decor.name === decoration.name
        );
        if (isPickedColorExistsOnDeletedDecoration) {
          setDeletedDecoration((prevDecor: IDecoration[]) =>
            prevDecor.filter(
              (decor: IDecoration) => decor.name !== decoration.name
            )
          );
        }
      }
      setDecorations((prevDecoration: IDecoration[]) => [
        ...prevDecoration,
        { ...decoration },
      ]);
      return;
    }
    if (deletedDecoration.length > 0 || setDeletedDecoration) {
      setDeletedDecoration((prevDecor: IDecoration[]) => [
        ...prevDecor,
        decoration,
      ]);
    }
    setDecorations((prevDecoration: IDecoration[]) =>
      prevDecoration.filter((decor) => decor.name !== decoration.name)
    );
    // setDecorations((prevColors: IDecoration[]) =>
    //   prevColors.some((decor) => decor.name === decoration.name)
    //     ? prevColors.filter((decor) => decor.name !== decoration.name)
    //     : [...prevColors, { ...decoration }]
    // );
  };

  return (
    <div className="mb-4 flex flex-col gap-1">
      <header className="flex justify-between items-center relative">
        <h1 className="block text-sm font-medium text-gray-600">
          Select Decoration
        </h1>
        {/* <Button
          variant={'ghost'}
          className="border-2"
          type="button"
          onClick={() => setIsDecorationAdd(true)}
        >
          Tambah Dekorasi
        </Button> */}
      </header>
      {/* <div
        className={`${
          isDecorationAdd ? 'visible flex' : 'hidden'
        } flex flex-col gap-3`}
      >
        <div className="flex gap-2">
          <Input
            type="text"
            value={newDecorationToAdd?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewDecorationToAdd({ id: '1', name: e.target.value })
            }
            placeholder="Masukkan dekorasi"
          />
          <Button variant={'outline'} onClick={onAddDecoration} type="button">
            Tambah
          </Button>
        </div>
      </div> */}
      {availableDecorations.length > 0 ? (
        <div className="grid grid-cols-5 gap-2">
          {availableDecorations?.map((decoration: IDecoration) => (
            <Button
              type="button"
              key={decoration.id}
              onClick={() => handleDecorationChange(decoration)}
              className={`px-4 py-2 rounded-lg text-sm border ${
                decorations.some((decor) => decor.name === decoration.name)
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-teal-500 border-teal-500'
              } hover:bg-teal-600 hover:text-white`}
            >
              {decoration.name}
            </Button>
          ))}
        </div>
      ) : (
        <h1>Dekorasi tidak tersedia / box sudah memiliki seluruh dekorasi</h1>
      )}
    </div>
  );
};

export default DecorationSelector;
