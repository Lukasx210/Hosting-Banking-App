
export default function Loading({ isLoading, children }) {

  return (
    <div className={`relative ${isLoading ? 'flex justify-center items-center' : ''}`}>
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-white border-solid border-t-sky-500 rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </div>
  );
}
