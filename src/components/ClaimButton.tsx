export default function ClaimButton({
  isConnected,
  eligible,
  amount,
  error,
  isLoading,
  isSuccess,
  write,
}: any) {
  if (isConnected) {
    if (eligible && !error) {
      return (
        <button
          onClick={() => {
            write?.();
          }}
          className="relative w-48 py-3 px-3 mt-4 z-40 mx-auto text-[#fff] flex flex-row items-center justify-center rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-700"
        >
          {(isLoading && "Loading...") || (isSuccess && "Success!") || (
            <>
              Claim Airdrop <br />
              {amount} 4TOKEN
            </>
          )}
        </button>
      );
    } else if (eligible && error) {
      return (
        <button className="relative w-48 py-3 px-3 mt-4 z-40 mx-auto text-[#fff] flex flex-row items-center justify-center rounded-xl cursor-pointer bg-[#02af01] hover:bg-[#1a821a]">
          {error?.message?.includes("Already") ? (
            <>
              Already Claimed!
              <br /> {amount} 4TOKEN
            </>
          ) : (
            "Something went wrong"
          )}
        </button>
      );
    } else {
      return (
        <button className="relative w-48 py-3 px-3 mt-4 z-40 mx-auto text-[#fff] flex flex-row items-center justify-center rounded-xl cursor-pointer bg-red-600 hover:bg-red-700">
          You are not eligible
        </button>
      );
    }
  }
  return <></>;
}
