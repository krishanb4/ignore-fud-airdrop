import { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import Head from "next/head";
import { Web3Button } from "@web3modal/react";
import Image from "next/image";
import addresslist from "@/config/address.json";
import {
  useAccount,
  useConnect,
  useContract,
  useContractWrite,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
} from "wagmi";
import { claimAirdrop } from "@/config/constants/addresses";
import claimAirdropABI from "@/config/abi/claimcontract.json";
import { BigNumber } from "ethers";
import {
  keccak256,
  parseBytes32String,
  toUtf8Bytes,
} from "ethers/lib/utils.js";
//import ClaimButton from '@/components/ClaimButton'
import dynamic from "next/dynamic";
import Countdown from "react-countdown";
const CountdownTimer = dynamic(() => import("@/components/Countdown"), {
  ssr: false,
  suspense: true,
});
const ClaimButton = dynamic(() => import("@/components/ClaimButton"), {
  ssr: false,
});

type ClaimArgs = {
  amount: BigNumber;
  nonce: BigNumber;
  receiver: string;
  signature: any;
};

const IndexPage = () => {
  const { address, connector, isConnected } = useAccount();
  const [eligible, isEligible] = useState(false);
  const [args, setArgs] = useState({} as ClaimArgs);
  const { config, error } = usePrepareContractWrite({
    address: claimAirdrop,
    abi: eligible ? claimAirdropABI : [],
    functionName: eligible ? "claimReward" : "",
    args: Object.values(args),
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (isConnected) {
      switchNetwork?.(1116);
    }
  }, [isConnected, chain]);

  useEffect(() => {
    const filtered = addresslist.filter(
      (element) => element.address === address
    );
    if (filtered.length > 0) {
      const element = filtered[0];
      isEligible(true);
      setArgs({
        amount: BigNumber.from(element.amount),
        nonce: BigNumber.from(element.nonce),
        receiver: element.address,
        signature: element.signature,
      });
    } else {
      isEligible(false);
      setArgs({} as ClaimArgs);
    }
  }, [address]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <title>IgnoreFud Airdrop Claim</title>
      </Head>
      {/* Desktop + Large Desktop */}
      <div className="hidden lg:flex flex-col w-full h-screen bg-[url('../../public/images/body-bg.png')]">
        <Navbar />
        <div className="w-9/12 mx-auto mt-16 2xl:mt-40">
          <h1 className="text-6xl xl:text-8xl font-light w-5/12 xl:w-1/2 2xl:w-4/12">
            Claim your Airdrop Now!
          </h1>
          <p className="mt-4 xl:mt-8 text-2xl 2xl:text-4xl w-6/12 2xl:w-5/12 font-light">
            Awesome that you have participated in our Airdrop. Now is the time
            to claim your 4TOKEN by connecting your{" "}
            <span className="font-medium">Metamask wallet</span>.
          </p>
          <div>
            {/* <div>
              <CountdownTimer />
            </div> */}

            <button className=" disabled relative w-48 py-3 px-3 mt-4 z-40 mx-auto text-[#fff] flex flex-row items-center justify-center rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-700">
              Claim Starts at <br />
              4.00 PM UTC
            </button>
            {/* <Countdown
              date={new Date("2023-03-25T16:00:00Z").valueOf()}
              intervalDelay={0}
            /> */}
            {/* <ClaimButton
              isConnected={isConnected}
              eligible={eligible}
              amount={Number(args.amount) / 10 ** 18}
              isSuccess={isSuccess}
              isLoading={isLoading}
              error={error}
              write={write}
            /> */}
          </div>
        </div>
        <Image
          src="/images/airdrop.svg"
          alt="catHandsUp"
          className="absolute right-28 xl:right-40 bottom-60 xl:bottom-60 2xl:bottom-80 z-10 w-5/12"
          width={300}
          height={300}
        />
        {/* <img
          src="/images/Mint blue cat with umbrella.svg"
          alt="catUmbrella"
          className="absolute bottom-20 right-48 xl:right-60 2xl:right-112 z-10 w-4/12 2xl:w-4/12"
        /> */}
        {/* <img
          src="/images/Yellow_cat.png"
          alt="catYellow"
          className="absolute bottom-20 2xl:bottom-80 left-20 xl:left-40 z-10 w-5/12 2xl:w-4/12"
        /> */}

        <Image
          src="/images/Background_ hill.svg"
          alt="bgHill"
          width="300"
          height="300"
          className="absolute bottom-0 w-full fill-[#bce4af]"
        />
      </div>
      {/* Mobile + Tablet */}
      <div className="w-full h-screen lg:hidden bg-[url('../../public/images/body-bg.png')]">
        <Navbar />
        <div className="relative w-10/12 text-center mx-auto mt-12 md:mt-40 lg:mt-56 z-20">
          <h1 className="text-5xl font-light">Claim your Airdrop Now!</h1>
          <p className="mt-4 text-2xl font-light">
            Awesome that you have participated in our Airdrop. Now is the time
            to claim your 4TOKEN by connecting your{" "}
            <span className="font-medium">Metamask wallet</span>.
          </p>
          <div>
            <button className=" disabled relative w-48 py-3 px-3 mt-4 z-40 mx-auto text-[#fff] flex flex-row items-center justify-center rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-700">
              Claim Starts at <br />
              4.00 PM UTC
            </button>
            {/* <Countdown
              date={new Date("2023-03-25T16:00:00Z").valueOf()}
              intervalDelay={0}
            /> */}
            {/* <ClaimButton
              isConnected={isConnected}
              eligible={eligible}
              amount={Number(args.amount) / 10 ** 18}
              isSuccess={isSuccess}
              isLoading={isLoading}
              error={error}
              write={write}
            /> */}
          </div>
          {/* <button
            className="relative w-48 py-3 px-3 mt-4 z-40 mx-auto flex flex-row items-center justify-center rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-700"
            onClick={() => activate(connectors.Injected)}
          >
            <p className="text-xl font-medium text-white">Connect Wallet</p>
          </button> */}

          {/* <Web3Button /> */}
        </div>
        <Image
          src="/images/airdrop.svg"
          alt="catHandsUp"
          className="absolute right-0 bottom-5 md:bottom-20 md:right-5 lg:right-20 z-10 md:w-4/12 lg:w-3/12"
          width={300}
          height={300}
        />
        {/* <img
          src="/images/Yellow_cat.png"
          alt="catYellow"
          className="absolute bottom-16 md:bottom-36 left-0 lg:left-18 w-8/12 lg:w-6/12 z-10"
        /> */}
        <Image
          src="/images/mobileBg.svg"
          alt="bgHill"
          className="absolute bottom-0 w-full"
          width={300}
          height={300}
        />
      </div>
    </>
  );
};

export default IndexPage;
