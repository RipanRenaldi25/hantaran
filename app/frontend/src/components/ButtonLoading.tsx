const ButtonLoading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {isLoading && (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
        </div>
      )}
    </>
  );
};

export default ButtonLoading;
